<template>
  <div
    class="
      relative
      transition-all
      overflow-x-visible
      hover:bg-gray-300
      dark:hover:bg-gray-600
      rounded-xl
    "
    
  >
    <a
      rel="noopener"
      target="_blank"
      :href="link.href"
      class="
        capitalize
        font-medium
        box-border
        rounded-xl
        p-4
        flex
        items-center
        justify-start
        space-x-3
        focus-styles
      "
    >
      <slot />
      <span>
        {{ $t(link.i18nPath) || link.body }}
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: () => ({
        href: "#",
        body: "super link",
      }),
    },
  },
};
</script>

<style>
</style>