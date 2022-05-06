<template>
  <div
    ref="menu_links_container"
    class="fixed top-0 left-0 w-full transform-gpu -translate-y-full transition-all duration-700 h-screen bg-white"
    :class="show ? 'translate-y-0' : ''"
  >
    <div
      class="px-8 sm:px-12 absolute w-full h-full pt-[140px] overflow-y-auto pb-16 transition-opacity bg-white  text-obsidiana "
      :class="show ? 'duration-1000' : 'opacity-0 duration-300'"
    >
      <!-- in site links -->
      <ul class="pt-2">
        <li v-for="(link, index) in links" :key="index" class="block">
          <NavigationMobileMenuLink :link="link" class="" />
        </li>
      </ul>
      <!-- divider -->
      <div
        aria-hidden="true"
        class="h-[1px] w-full bg-gray-200 dark:bg-gray-500 my-[26px]"
      ></div>
      

      <div class="">
        <LangSwitcherMobile @close-mobile-nav="requestClose" />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMobileMenuLink from "./NavigationMobileMenuLink.vue";
import LangSwitcherMobile from "~/components/global/LangSwitcheMobile.vue";
import { onMounted, onUnmounted, ref } from "@vue/composition-api";

export default {
  components: {
    LangSwitcherMobile,
    //
    NavigationMobileMenuLink,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: () => [
        {
          route: "/",
          body: "link",
        },
      ],
    },
  },
  setup(props, { emit }) {
    const menu_links_container = ref();

    function onClick(evt) {
      if (!props.show) {
        return;
      }
      // request close
      if (
        evt.target.tagName === "BUTTON" &&
        evt.target.id !== "lang-selector-btn"
      ) {
        emit("close-mobile-nav");
      }
      // links
      if (evt.target.tagName === "A") {
        emit("close-mobile-nav");
      }
      // spans inside links
      if (
        evt.target.tagName === "SPAN" &&
        evt.target.parentElement.tagName == "A"
      ) {
        emit("close-mobile-nav");
      }
      // svgs inside links
      if (
        evt.target.tagName === "svg" &&
        evt.target.parentElement.tagName == "A"
      ) {
        emit("close-mobile-nav");
      }
      // paths inside svgs inside links
      if (
        evt.target.tagName === "path" &&
        evt.target.parentElement.tagName == "svg" &&
        evt.target.parentElement.parentElement.tagName == "A"
      ) {
        emit("close-mobile-nav");
      }
    }
    function requestClose() {
      emit("close-mobile-nav");
    }
    onMounted(() => {
      menu_links_container.value.addEventListener("click", onClick);
    });
    onUnmounted(() => {
      menu_links_container.value.removeEventListener("click", onClick);
    });

    return {
      // ref
      menu_links_container,
      // data
      // fn
      requestClose,
    };
  },
};
</script>

<style scopped>
.h-\(100vh\-140px\) {
  height: calc(100vh - 140px);
}
</style>
