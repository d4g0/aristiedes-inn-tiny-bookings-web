<template>
  <pre>
<code>
user {{user}}
</code>
  </pre>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        id: 0,
        user_role: "",
      }),
    },
  },
};
</script>

<style>
</style>