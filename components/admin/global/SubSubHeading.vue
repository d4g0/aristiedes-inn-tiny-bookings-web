<template>
  <h3 class="font-bold text-lg md:text-xl">
    {{ text }}
  </h3>
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
