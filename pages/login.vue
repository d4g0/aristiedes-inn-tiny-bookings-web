<template>
  <div class="frame flex items-center justify-center">
    <div class="w-full max-w-md mx-auto">
      <div class="py-5 mt-20 mb-32 lg:mb-52 flex flex-col items-center w-full">
        <h1 class="text-4xl lg:text-5xl font-bold">Login</h1>
        <LoginForm :isSending="isFormSending" class="mt-[40px]" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
export default {
  setup() {
    const isFormSending = ref(true);

    return {
      isFormSending,
    };
  },
};
</script>
