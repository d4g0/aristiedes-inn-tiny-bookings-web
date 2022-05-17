<template>
  <div class="min-h-screen pt-[80px] w-full flex items-center justify-center">
    <div class="frame h-full text-center pb-20">
      <div v-if="error.statusCode === 404">
        <div class="max-w-md mx-auto">
          <LazyImage src="/img/404/undraw_before_dawn_re_hp4m.svg" />
        </div>
        <h1 class="mt-10 text-4xl font-semibold">
          {{ $t("404.heading") }}
        </h1>
        <div class="text-xl font-medium mt-8">
          <p>{{ $t("404.description") }}</p>
          <div class="mt-6 flex items-center justify-center">
            <div
              class="
                rounded-xl
                text-white
                font-medium
                bg-obsidiana
                hover:bg-gradient-to-tr hover:from-rose-500 hover:to-orange-400
                transition-all
                duration-300
              "
            >
              <NuxtLink
                :to="localePath('/')"
                class="
                  px-6
                  py-2
                  rounded-xl
                  focus-styles
                  focus-visible:ring-offset-2 focus-visible:ring-offset-white
                  block
                  h-full
                  w-full
                "
              >
                {{ $t("404.homeLinkText") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p>An error occurred</p>
        <div>Go to <NuxtLink :to="localePath('/')">Home </NuxtLink></div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from '~/components/global/LazyImage.vue';
export default {
  components: { LazyImage },
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
};
</script>