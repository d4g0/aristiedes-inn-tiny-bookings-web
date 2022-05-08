<template>
  <div id="lang-large-focus-trap-container">
    <transition name="fade">
      <!-- TODO use the direct value, nor their negation -->
      <dialog
        v-if="langMenuNeeded"
        class="
          fixed
          z-50
          inset-0
          h-full
          w-full
          bg-white
          dark:bg-obsidiana/90
          transition-colors
          duration-300
          text-obsidiana
          backdrop-blur-md
          flex
          items-center
          justify-center
        "
      >
        <div class="w-full">
          <div
            class="
              border
              dark:border-gray-400
              bg-white
              dark:bg-obsidiana
              transition-colors
              duration-300
              rounded-2xl
              shadow-xl
              py-10
              px-10
              lg:py-20 lg:px-20
              h-[75vh]
              overflow-y-auto
              max-w-xl
              md:max-w-3xl
              mx-auto
              w-full
            "
          >
            <div>
              <button
                class="
                  rounded-full
                  p-2
                  focus-styles-obsidiana
                  -translate-x-2
                  hover:bg-gray-300
                  dark:hover:bg-gray-600
                "
                @click="onClick"
              >
                <XIcon />
                <span class="sr-only"> Close Lang Menu</span>
              </button>
            </div>
            <div class="mt-5">
              <h1 class="text-3xl font-medium md:text-4xl">
                {{ $t("langSwitcher.menuHeading") }}
              </h1>
            </div>
            <ul
              :aria-label="$t('langSwitcher.optionsLabel')"
              class="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-2"
            >
              <li v-for="locale in availableLocales" :key="locale.code">
                <nuxt-link
                  class="
                    hover:bg-gray-300
                    dark:hover:bg-gray-600
                    block
                    border
                    dark:border-gray-500
                    p-4
                    font-medium
                    rounded-xl
                    focus-styles-obsidiana
                  "
                  :to="switchLocalePath(locale.code)"
                  @click.native="onClick"
                  >{{ locale.name }}</nuxt-link
                >
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </transition>
  </div>
</template>

<script>
import { onMounted, watch } from "@vue/composition-api";
import { createFocusTrap } from "focus-trap";
import XIcon from "~/components/icons/XIcon.vue";
import { wait } from "~/utils";
import { onKeyUp } from "@vueuse/core";

export default {
  components: { XIcon },
  props: {
    langMenuNeeded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  setup(props, { emit }) {
    function onClick(evt) {
      // close menu
      emit("close");
    }

    onMounted(() => {
      if (!process.client) {
        return;
      }
      initFocusTrap();
    });

    onKeyUp("Escape", () => {
      if (props.langMenuNeeded) {
        emit("close");
      }
    });
    // ---------------
    // Focus Trap
    // ---------------
    var focusTrap = null;

    function initFocusTrap() {
      focusTrap = createFocusTrap("#lang-large-focus-trap-container", {
        onActivate: () => {
          // console.log("trap activated");
        },
        onDeactivate: () => {
          // console.log("trap de-activated");
        },
      });
    }
    watch(props, async (props) => {
      if (props.langMenuNeeded) {
        await wait(0.1);
        focusTrap.activate();
      } else {
        await wait(0.1);
        focusTrap.deactivate();
      }
    });
    return { onClick };
  },
};
</script>

<style>
</style>