<template>
  <section
    class="
      text-sm
      bg-surface-light
      dark:bg-surface-dark
      text-type-on-light
      dark:text-type-on-dark
      transition-all
      duration-300
      border-t-gray-500 border-t
    "
  >
    <div class="frame mt-20 mb-20">
      <div class="flex flex-col items-start">
        <!-- lang -->
        <div class="">
          <div class="">
            <LangSwitcheFooter />
          </div>
        </div>

        <!-- naviation links -->
        <div class="mt-6 max-w-sm">
          <ul class="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <li
              v-for="(link, index) in navigationLinks.public"
              :key="index"
              class=""
            >
              <nuxt-link
                :to="localePath(link.route)"
                class="
                  inline-block
                  font-medium
                  box-border
                  rounded-md
                  focus-styles
                  opacity-75
                  hover:opacity-100
                  focus:opacity-100
                "
              >
                <span>
                  {{ $t(link.i18nPath) || link.body }}
                </span>
              </nuxt-link>
            </li>

            <!-- admin login -->
            <li class="">
              <nuxt-link
                :to="localePath(navigationLinks.adminLogin.route)"
                class="
                  inline-block
                  font-medium
                  box-border
                  rounded-lg
                  focus-styles
                  opacity-75
                  hover:opacity-100
                  focus:opacity-100
                "
              >
                <span>
                  {{
                    $t(navigationLinks.adminLogin.i18nPath) ||
                    navigationLinks.adminLogin.body
                  }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- color -->
        <div class="mt-6">
          <ColorModeSwitch />
        </div>

        <!-- copy -->
        <div class="mt-10">
          <p class="opacity-80">{{ brand }} &copy; 2022</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LangSwitcheFooter from "~/components/global/LangSwitcheFooter.vue";
import { navigationLinks } from "~/db";
import ColorModeSwitch from "./ColorModeSwitch.vue";
export default {
  components: {
    LangSwitcheFooter,
    ColorModeSwitch,
  },
  setup() {
    return {
      navigationLinks,
    };
  },
  data() {
    var BRAND = this?.$nuxt?.context?.env?.BRAND || "default brand";
    return {
      brand: BRAND,
    };
  },
};
</script>
