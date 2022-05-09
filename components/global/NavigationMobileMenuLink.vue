<template>
  <div
    class="
      relative
      transition-all
      overflow-x-visible
      hover:bg-gray-200
      dark:hover:bg-gray-600
      rounded-lg
    "
  >
    <nuxt-link
      :to="localePath(link.route)"
      class="
        font-medium
        box-border
        rounded-lg
        p-4
        flex
        items-center
        justify-start
        space-x-3
        focus-styles
      "
    >
      <!-- icon slot -->
      <slot />
      <span>
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
      }),
    },
  },
};
</script>

<style>
</style>