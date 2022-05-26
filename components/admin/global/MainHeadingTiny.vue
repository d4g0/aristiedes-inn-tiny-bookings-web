<template>
  <h1 class="font-bold text-3xl md:text-4xl">
    {{ text }}
  </h1>
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
