<template>
  <h2 class="font-bold text-2xl md:text-3xl">
    {{ text }}
  </h2>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Main Heading",
    },
  },
};
</script>
