<template>
  <nav
    class="
      fixed
      z-10
      top-0
      left-0
      w-full
      transform
      transition-transform
      duration-500
    "
    ref="nav_ref"
    :class="showShadow ? 'shadow-md lg:shadow-none' : ''"
    v-show="shouldRenderNav"
  >
    <transition name="fade-slow" mode="out-in">
      <NavigationLarge
        v-if="width > 1023 - 15 && width > 0"
        :navigationLinks="currentLinks"
        :pathName="computedPath"
        class=""
      />
      <NavigationMobile
        v-else
        :navigationLinks="currentLinks"
        @nav-open-change="onNavOpenChange"
        class="lg:hidden"
      />
    </transition>
  </nav>
</template>

<script>
import { useEventListener, useThrottleFn } from "@vueuse/core";
import { wait } from "~/utils";
import { navigationLinks, USER_ROLES } from "~/db";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import {
  computed,
  watch,
  onMounted,
  ref,
  inject,
} from "@nuxtjs/composition-api";

export default {
  components: {
    NavigationMobile: () => import("./NavigationMobile.vue"),
    NavigationLarge: () => import("./NavigationLarge.vue"),
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    defaultLocale() {
      return this.$i18n.defaultLocale;
    },
    computedPath() {
      var computedPath = "";
      // default locale
      if (this.locale == this.$i18n.defaultLocale) {
        return this.pathName;
      }
      // non default locale
      else {
        computedPath =
          this.pathName === `/${this.locale}`
            ? "/"
            : this.pathName.substr(this.locale.length + 1);
        return computedPath;
      }
    },
  },
  watch: {
    // pathName updates on navigations
    $route(to, from) {
      if (process.client) {
        this.pathName = window.location.pathname;
      }
    },
  },
  setup() {
    const nav_ref = ref();
    const prevScrollPos = ref(0);
    const mobileNavOpen = ref(false);
    const pathName = ref("");
    const showShadow = ref(false);
    const width = inject("width");
    const shouldRenderNav = ref(false);
    const largeNavOpen = ref(true);

    onMounted(async function prepareWidthWhenLoading() {
      // delay nav render till width is hydratated
      await wait();
      // then render
      shouldRenderNav.value = true;
    });

    function onScroll() {
      // scroll up
      if (window.pageYOffset < prevScrollPos.value) {
        handleNav("open");
        if (window.pageYOffset < 700) {
          showShadow.value = false;
        }
      }
      // scroll down
      else {
        if (window.pageYOffset > 100) {
          handleNav("close");
          showShadow.value = true;
        } else {
          showShadow.value = false;
        }
      }

      prevScrollPos.value = window.pageYOffset;
    }

    let onScrollThrottled = useThrottleFn(onScroll, 50);

    // ---------------
    // EventBindings
    // ---------------
    useEventListener("scroll", onScrollThrottled);

    // ---------------
    // Life Cycle
    // ---------------
    onMounted(() => {
      if (process.client) {
        initScrollValue();
        inintPathName();
        document.addEventListener("focusin", onFocus);
      }
    });

    function inintPathName() {
      pathName.value = window.location.pathname;
    }

    function initScrollValue() {
      prevScrollPos.value = window.pageYOffset;
    }

    function handleNav(state /* 'open' || 'close' */) {
      // ignore when mobile menu open
      if (mobileNavOpen.value) {
        return;
      }
      if (process.client) {
        if (state == "open") {
          nav_ref.value.classList.remove("-translate-y-44");
          largeNavOpen.value = true;
        }
        if (state == "close") {
          nav_ref.value.classList.add("-translate-y-44");
          largeNavOpen.value = false;
        }
      }
    }

    function onNavOpenChange(openState) {
      mobileNavOpen.value = openState;
    }

    function onFocus(evt) {
      // filter inside nav targets only
      if (!nav_ref.value.contains(evt.target)) {
        return;
      }
      // default case an inside nav interactive element has been
      // focused so make sure nav is visible when needed
      if (!largeNavOpen.value) {
        handleNav("open");
      }
    }

    // ---------------
    // Navigation links selections handling
    // ---------------
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const { isAuthenticated } = authStore;
    // public is the default value (in db)
    const currentNavigationLinksSelection = ref("public");
    const currentLinks = computed(
      () => navigationLinks[currentNavigationLinksSelection.value]
    );
    watch(user, (newU, oU) => {
      if (newU) {
        if (!isAuthenticated()) {
          return;
        }
        console.log(newU)
        const user_role = newU.user_role;
        if (user_role == USER_ROLES.CLIENT) {
          currentNavigationLinksSelection.value = "authenticatedClient";
        }
        if (
          [USER_ROLES.FULL_ADMIN, USER_ROLES.BASIC_ADMIN].includes(user_role)
        ) {
          currentNavigationLinksSelection.value = "authenticatedAdmin";
        }
      }
    });

    return {
      // ref
      nav_ref,
      // state
      pathName,
      showShadow,
      width,
      shouldRenderNav,
      currentLinks,
      // fn
      onNavOpenChange,
    };
  },
};
</script>
