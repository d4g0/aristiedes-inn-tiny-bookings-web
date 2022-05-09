<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold">Home</h1>
    <div class="min-h-screen">
      <AuthData :auth="{ user, token, token_created_at }" />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import AuthData from "~/components/test/AuthData.vue";
import { useAuthStore } from "~/stores/auth";
import { onMounted, useContext } from "@nuxtjs/composition-api";
import { USER_ROLES } from "~/db";
export default {
  name: "IndexPage",
  // middleware: "home",
  components: { AuthData },
  setup() {
    const authStore = useAuthStore();
    const { user, token, token_created_at } = storeToRefs(authStore);
    // console.log(user);

    onMounted(mountedSecuence);
    function mountedSecuence() {
      redirectIfAdmin();
    }
    // redirect to dashboard if an admin is logedin
    const { isAuthenticated } = authStore;

    const ctx = useContext();

    function redirectIfAdmin() {
      if (!isAuthenticated()) {
        return;
      }

      const user_role = user.value?.user_role;
      if ([USER_ROLES.BASIC_ADMIN, USER_ROLES.FULL_ADMIN].includes(user_role)) {
        ctx.redirect(200, ctx.localePath("/admin"));
      }
    }

    return {
      user,
      token,
      token_created_at,
    };
  },
  head() {
    const DOMAIN = this?.$nuxt?.context?.env?.DOMAIN;
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    function getCanonicalUrl() {
      return i18nHead.link.filter((linkItem) => linkItem.hid == "i18n-can")[0]
        .href;
    }

    return {
      meta: [
        // description
        {
          hid: "description",
          name: "description",
          content: this.$t("metadata.home.description"),
        },
        // OG / Facebook
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: getCanonicalUrl(),
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t("metadata.home.title"),
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("metadata.home.description"),
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `https://${DOMAIN}/img/social/social.jpg`,
        },
        // Twitter
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: getCanonicalUrl(),
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: this.$t("metadata.home.title"),
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content: this.$t("metadata.home.description"),
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: `https://${DOMAIN}/img/social/social.jpg`,
        },
      ],
    };
  },
};
</script>
