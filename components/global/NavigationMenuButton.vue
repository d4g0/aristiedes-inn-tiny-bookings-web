<template>
  <button
    class="h-11 w-11 rounded-xl flex items-center justify-center focus-styles"
    :class="[hoverClass, focusRingClass]"
    @click="$emit('menu-button-click')"
  >
    <span class="sr-only">Open user menu</span>
    <transition name="fade" mode="out-in">
      <MenuAlt4Icon
        v-if="!open"
        class="text-type-on-light"
        :class="iconColorClass"
      />
      <!-- text-color-modes -->
      <!-- text color fixed as nav bg is fixed to white -->
      <XIcon v-else class=" text-type-on-light" :class="iconColorClass" />
    </transition>
  </button>
</template>

<script>
import MenuAlt4Icon from "~/components/icons/MenuAlt4Icon.vue";
import XIcon from "~/components/icons/XIcon.vue";

export default {
  components: { MenuAlt4Icon, XIcon },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    iconColorClass: {
      type: String,
      default: "text-type-on-light",
    },
    hoverClass: {
      type: String,
      default: "hover:bg-gray-100",
    },
    focusRingClass: {
      type: String,
      default: "focus-visible:ring-brand",
    },
  },
};
</script>

<style>
</style>