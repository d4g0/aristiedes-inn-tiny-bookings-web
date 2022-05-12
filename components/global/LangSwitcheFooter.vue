<template>
  <div class="">
    <div class="relative">
      <button
        @click="onClick"
        id="lang-selector-btn"
        :aria-label="$t('langSwitcher.label')"
        aria-haspopup="true"
        aria-controls="lang_menu"
        class="
          opacity-80
          w-full
          h-full
          rounded-md
          flex
          items-center
          justify-center
          space-x-2
          focus-styles
          hover:opacity-100
          focus:opacity-100
        "
      >
        <WorldIcon aria-hidden="true" class="text-obsidiana/80" />

        <span class="font-medium">
          {{ localeName }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/composition-api";
import WorldIcon from "~/components/icons/WorldIcon.vue";
export default {
  computed: {
    localeName() {
      return this.$i18n.localeProperties.name;
    },
  },

  components: {
    WorldIcon,
  },
  setup(props, { emit }) {
    const tooglelangOptionsNeeded = inject("tooglelangOptionsNeeded");
    function onClick(evt) {
      tooglelangOptionsNeeded();
      emit("close-mobile-nav");
    }

    return {
      // refs
      // state
      // fn
      onClick,
    };
  },
};
</script>

<style></style>
