<template>
  <h2 class="font-bold text-3xl md:text-5xl">
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
