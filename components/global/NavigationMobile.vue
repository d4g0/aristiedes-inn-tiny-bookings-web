<template>
  <div
    class="
      w-full
      
    "
  >
    <div class="relative z-20">
      <div
        class="
          frame
          flex
          items-center
          justify-between
          relative
          py-5
          bg-white
          text-obsidiana
        "
      >
        <!-- logo -->
        <div ref="logo_link">
          <nuxt-link
            :to="localePath('/')"
            class="block rounded-xl focus-styles "
          >
            <div class="w-52 relative top-0 left-0">
              <LazyImage src="/img/global/logo.jpg" alt="logo" class="rounded-xl" />
            </div>
          </nuxt-link>
        </div>

        <!-- mobile menu btn -->
        <NavigationMenuButton
          @menu-button-click="onMenuBtnClick"
          :open="open"
          :focusRingClass="'focus-visible:ring-brand'"
          :hoverClass="'hover:bg-gray-200 dark:hover:bg-gray-200'"
          class=""
        />
      </div>
    </div>
    <!-- mobile links -->
    <NavigationMobileMenu
      :show="open"
      :links="navigationLinks"
      @close-mobile-nav="onMobileNavCloseRequest"
    />
  </div>
</template>

<script>
import { onMounted, ref, watch } from "@vue/composition-api";
import useBodyOverflow from "~/composables/useBodyOverflow.js";
import NavigationMenuButton from "./NavigationMenuButton.vue";
import NavigationMobileMenu from "./NavigationMobileMenu.vue";
import { useEventListener } from "@vueuse/core";

export default {
  components: {
    NavigationMenuButton,
    NavigationMobileMenu,
    // Logo,
  },
  props: {
    navigationLinks: {
      type: Array,
      default: () => [
        {
          route: "/",
          body: "home",
        },
      ],
    },
  },
  setup(props, { emit }) {
    const open = ref(false);
    const { hideOverflow, showOverflow } = useBodyOverflow();
    const logo_link = ref();
    // gradient effect on presentation

    // dom overflow handling
    watch(open, () => {
      if (open.value) {
        hideOverflow();
      } else {
        showOverflow();
      }
      emit("nav-open-change", open.value);
    });

    onMounted(async () => {
      useEventListener(logo_link.value, "click", onLogoClick);
    });

    function onMobileNavCloseRequest() {
      if (open.value) {
        open.value = false;
      }
    }

    function onLogoClick() {
      if (open.value) {
        open.value = false;
      }
    }

    function onMenuBtnClick() {
      open.value = !open.value;
    }

    return {
      // refs
      logo_link,
      // state
      open,
      // fn
      onMenuBtnClick,
      onMobileNavCloseRequest,
    };
  },
};
</script>