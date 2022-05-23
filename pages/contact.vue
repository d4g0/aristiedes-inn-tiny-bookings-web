<template>
  <div class="frame-30 mt-20">
    <Contact />
  </div>
</template>

<script>
import Contact from "~/components/home/Contact.vue";
export default {
  components: {
    Contact,
  },
  head() {
    const DOMAIN = this?.$nuxt?.context?.env?.DOMAIN;
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    function getCanonicalUrl() {
      return i18nHead.link.filter((linkItem) => linkItem.hid == "i18n-can")[0]
        .href;
    }

    return {
      title: this.$t("metadata.home.title"),
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
          content: `https://${DOMAIN}/img/social/aristides-social.jpg`,
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
          content: `https://${DOMAIN}/img/social/aristides-social.jpg`,
        },
      ],
    };
  },
};
</script>
