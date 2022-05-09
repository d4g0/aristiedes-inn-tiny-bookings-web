<template>
  <div class="relative z-20 shinny-gray text-obsidiana">
    <div class="bg-white relative border-obsidiana/10 border-b">
      <!-- main navigation -->
      <div
        class="mx-auto max-w-screen-lg xl:max-w-screen-xl py-1 px-5 flex items-center justify-between"
      >
        <!-- logo -->
        <div class="flex items-center">
          <nuxt-link
            :to="localePath('/')"
            class="inline-block rounded-xl focus-styles"
          >
            <div class="w-64 relative top-0 left-0">
              <LazyImage
                src="/img/global/logo.jpg"
                alt="Aristides Inn Logo"
                class="rounded-xl"
              />
            </div>
          </nuxt-link>
        </div>

        <!-- links -->
        <div class="">
          <ul class="space-x-5 pl-5 flex items-center justify-center">
            <li v-for="(link, index) in navigationLinks" :key="index">
              <NavigationLargeLink :link="{ ...link, pathName }" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

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
    pathName: {
      type: String,
      default: "/",
    },
  },
};
</script>

<style></style>
