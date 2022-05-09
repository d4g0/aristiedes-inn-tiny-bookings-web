<template>
  <pre>
<code>
auth {{auth}}
</code>
  </pre>
</template>

<script>
export default {
  props: {
    auth: {
      type: Object,
      default: () => ({
        user: {},
        token: "",
        token_created_at: "",
      }),
    },
  },
};
</script>

<style>
</style>