<template>
  <h1 class="font-bold text-5xl md:text-7xl">
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
