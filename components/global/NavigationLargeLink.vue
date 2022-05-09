<template>
  <div class="transition-all relative py-2">
    <nuxt-link
      :to="localePath(link.route)"
      class="
        text-[#086ba5] text-md
        block
        font-medium
        hover:text-opacity-100 hover:bg-gray-200
        dark:hover:bg-gray-500
        px-2
        py-1
        rounded-xl
        focus-styles
      "
    >
      <span
        class="transition-all duration-150"
        :class="
          isOnPath
            ? ' text-opacity-100 font-bold'
            : 'text-opacity-80 text-gray-600'
        "
      >
        {{ $t(link.i18nPath) || link.body }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: () => ({
        route: "/",
        body: "super link",
        i18nPath: "i18 values goes here",
      }),
    },
    introDelay: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    pathName: {
      type: String,
      default: "/",
    },
  },
  computed: {
    isOnPath() {
      // if (this.link.route == "/" && this.link.route == this.pathName) {
      //   return true;
      // } else if (this.link.route.length > 1) {
      //   return this.link.pathName
      //     .substring(1)
      //     .startsWith(this.link.route.substring(1));
      // }
      return this.link.route == this.link.pathName;
    },
    check() {
      return {
        pathName: this.link.pathName,
        route: this.link.route,
        r1: this.link.route == this.link.pathName,
      };
    },
  },
};
</script>

<style></style>
