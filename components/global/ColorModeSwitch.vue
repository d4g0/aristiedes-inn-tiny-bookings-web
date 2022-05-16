<template>
  <div class="flex items-center justify-start space-x-2">
    <!-- label -->
    <div class="font-medium">
      <span class=""> {{ $t("colorSelector.btnLabel") }} : </span>
    </div>

    <!-- btn n options -->
    <div class="relative" id="color-switch-focus-trap-container">
      <!-- color value btn -->
      <button
        id="color-selector-btn"
        ref="controlBtn"
        :aria-label="$t('colorSelector.label')"
        aria-haspopup="true"
        aria-controls="color_menu"
        class="
          p-2
          rounded-xl
          w-full
          h-full
          flex
          items-center
          justify-center
          space-x-3
          focus-styles
          hover:bg-gray-300
          dark:hover:bg-gray-500
        "
      >
        <div class="font-medium capitalize">
          <span class="ml-1">
            {{ currentColorModeTextLabel }}
          </span>
        </div>

        <ChevronDownIcon class="rotate-180" />
      </button>

      <!-- color modes options -->
      <transition name="fade-from-up">
        <div
          id="color_menu"
          ref="controlMenu"
          v-show="switchIsOpen"
          class="
            absolute
            z-10
            bg-surface-light
            dark:bg-surface-dark
            border
            dark:border-gray-500
            rounded-xl
            p-4
            shadow-lg
            bottom-8
            left-0
          "
        >
          <ul :aria-label="$t('colorSelector.label')" class="">
            <li v-for="colorMode in availableColorModes" :key="colorMode.code">
              <button
                class="
                  w-full
                  px-6
                  py-2
                  text-left
                  hover:bg-gray-300
                  dark:hover:bg-gray-600
                  font-medium
                  rounded-xl
                  focus-styles
                  capitalize
                "
                @click="setColorMode(colorMode.code)"
              >
                {{ colorMode.text }}
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useEventListener, useTimeoutFn } from "@vueuse/core";
import { createFocusTrap } from "focus-trap";
import {
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "@nuxtjs/composition-api";
import ChevronDownIcon from "~/components/icons/ChevronDownIcon.vue";
export default {
  components: { ChevronDownIcon },
  data() {
    return {
      currentColorModeTextLabel: "default",
    };
  },
  mounted() {
    for (let i = 0; i < this.availableColorModes.length; i++) {
      if (this.availableColorModes[i].code == this.currentColorMode) {
        this.currentColorModeTextLabel = this.availableColorModes[i].text;
      }
    }
  },
  // TODO update text values when lang change
  watch: {
    $i18n() {
      console.log("i18n change");
      this.updateCurrenColorModeTag();
    },
    $route: function () {
      console.log("route change");
      this.updateCurrenColorModeTag();
    },
  },

  computed: {
    availableColorModes() {
      const colorModes = this.$t("colorSelector.colorModes");
      return colorModes;
    },
    currentColorMode() {
      return this.$colorMode.preference;
    },
  },
  methods: {
    setColorMode(colorCode = "system") {
      this.$colorMode.preference = colorCode;
      this.switchIsOpen = false;
      this.updateCurrenColorModeTag();
    },
    updateCurrenColorModeTag() {
      for (let i = 0; i < this.availableColorModes.length; i++) {
        if (this.availableColorModes[i].code == this.currentColorMode) {
          this.currentColorModeTextLabel = this.availableColorModes[i].text;
        }
      }
    },
  },

  setup() {
    const controlBtn = ref(null);
    const controlMenu = ref(null);
    const state = reactive({
      switchIsOpen: false,
    });
    var langMenuFocussables;

    onMounted(() => {
      // console.log("onMounted");
      if (!process.client) {
        return;
      }
      initMenuFocusables();
      initFocusTrap();
    });

    /**
     * switcState: 'open' || 'close' || null -> toggle
     */
    function toogleSwitch(switchState) {
      if (process.client) {
        if (!switchState) {
          state.switchIsOpen = !state.switchIsOpen;

          if (state.switchIsOpen && langMenuFocussables.length) {
            langMenuFocussables[0].focus();
          }

          return;
        }
        switchState === "open"
          ? (state.switchIsOpen = true)
          : (state.switchIsOpen = false);

        if (langMenuFocussables.length) {
          langMenuFocussables[0].focus();
        }
      }
    }

    function handleKey(evt) {
      if (evt.code == "Escape") {
        toogleSwitch("close");
      }
    }

    function handleClick(evt) {
      if (process.client) {
        // if was in btn
        if (controlBtn.value.contains(evt?.target)) {
          toogleSwitch();

          if (state.switchIsOpen) {
            const { isActive, start, stop } = useTimeoutFn(() => {
              controlMenu.value.querySelector("button").focus();
            }, 1);
            start();
          }
        }
      }
    }

    function initMenuFocusables() {
      if (process.client) {
        langMenuFocussables = Array.from(
          controlMenu.value.querySelectorAll("button")
        );
      }
    }

    // -------
    // EVENTS
    // -------
    useEventListener("keyup", handleKey);
    useEventListener("click", handleClick);

    //

    // ---------------
    // Focus Trap
    // ---------------
    var focusTrap = null;

    function initFocusTrap() {
      focusTrap = createFocusTrap("#color-switch-focus-trap-container", {
        onActivate: () => {
          // console.log("trap activated");
        },
        onDeactivate: () => {
          // console.log("trap de-activated");
        },
      });
    }

    watch(state, (state) => {
      if (state.switchIsOpen) {
        focusTrap.activate();
      } else {
        focusTrap.deactivate();
      }
    });

    //

    return {
      toogleSwitch,
      controlBtn,
      controlMenu,
      ...toRefs(state),
    };
  },
};
</script>

<style>
</style>