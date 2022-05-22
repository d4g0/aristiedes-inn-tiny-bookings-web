<template>
  <div class="">
    <!-- search -->
    <div class="">
      <!-- <AuthData /> -->
      <div class="frame-30 mt-20">
        <h1 class="font-bold text-5xl md:text-7xl">
          {{ $t("home.search.title") }}
        </h1>
      </div>
      <div class="frame-30 mt-10">
        <div class="max-w-lg mx-auto md:ml-0">
          <SearchCtrl />
        </div>
      </div>
    </div>

    <!-- listings -->
    <div>
      <div class="mt-10 frame-w">
        <Listings />
      </div>
    </div>
    <!-- basket -->
    <div>
      <BasketExpansion />
      <Basket />
    </div>
    <!-- checkout -->
    <div>
      <CheckOut/>
    </div>
  </div>
</template>

<script>
import Basket from "~/components/basket/Basket.vue";
import BasketExpansion from '~/components/basket/BasketExpansion.vue';
import CheckOut from '~/components/checkout/CheckOut.vue';
import SearchCtrl from "~/components/home/SearchCtrl.vue";
import Listings from "~/components/listings/Listings.vue";
// import AuthData from "~/components/test/AuthData.vue";

export default {
  name: "IndexPage",
  middleware: "home",
  components: {
    // AuthData,
    SearchCtrl,
    Listings,
    Basket,
    BasketExpansion,
    CheckOut,
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
