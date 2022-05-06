<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold">Foo Bar Bazz</h1>
    <div class="min-h-screen">

    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
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
