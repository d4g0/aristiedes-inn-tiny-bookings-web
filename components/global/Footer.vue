<template>
  <section
    class="pb-10 text-sm mx-auto max-w-screen-lg xl:max-w-screen-xl py-1 px-5 bg-gray-200 border-t-gray-500 border"
  >
    <div class="flex flex-col items-center">
      <!-- naviation links -->
      <div class="mt-20">
        <!-- in site links -->
        <ul
          class="pt-2 flex flex-col gap-2 md:flex-row items-center justify-center"
        >
          <li
            v-for="(link, index) in navigationLinks.public"
            :key="index"
            class=""
          >
            <nuxt-link
              :to="localePath(link.route)"
              class="inline-block font-medium box-border rounded-lg p-2 focus-styles hover:bg-gray-200 opacity-75 hover:opacity-100 focus:opacity-100"
            >
              <span>
                {{ $t(link.i18nPath) || link.body }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <div class="">
          <LangSwitcheFooter />
        </div>
      </div>

      <!-- copy -->
      <div class="mt-10">
        <p class="text-xs opacity-80">{{ brand }} &copy; 2022</p>
      </div>
    </div>
  </section>
</template>

<script>
import LangSwitcheFooter from "~/components/global/LangSwitcheFooter.vue";
import { navigationLinks } from "~/db";
export default {
  components: {
    LangSwitcheFooter,
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
