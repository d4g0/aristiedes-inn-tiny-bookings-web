<template>
  <section class="frame-30 space-y-20">
    <h1 class="font-bold text-5xl md:text-7xl">
      {{ $t("contact.heading") }}
    </h1>
    <!-- text -->
    <div
      class="
        lg:pr-16
        xl:pr-24
        flex flex-col
        md:flex-row md:items-start md:justify-between
        gap-10
        md:gap-20
      "
    >
      <!-- address email and phone -->
      <div class="text-lg space-y-4 max-w-[400px]">
        <!-- address -->
        <div class="flex items-center w-full">
          <MarkerIcon class="w-12 h-12  flex-shrink-0" />
          <address class="ml-4 leading-none font-medium opacity-75">
            {{ $t("contact.address") }}
          </address>
        </div>

        <!-- mail -->
        <div class="flex items-center">
          <MailIcon class="w-10 h-10  flex-shrink-0" />
          <a
            class="ml-5 focus-styles rounded-xl block"
            target="_blank"
            rel="noopener"
            href="mailto:aristidesinn@gmail.com"
          >
            <p class="tracking-wider font-medium opacity-75">
              <span>aristidesinn@gmail.com</span>
            </p>
          </a>
        </div>

        <!-- phones -->
        <div class="flex items-center focus-styles-white rounded-xl w-full">
          <PhoneSolidIcon class="w-10 h-10  flex-shrink-0" />
          <div class="ml-4">
            <!-- phone 1 -->
            <a
              target="_blank"
              rel="noopener"
              href="tel:+51 944 675 509"
              class="ml-1 block focus-styles rounded-xl w-full"
            >
              <p class="space-x-0.5 tracking-wider font-medium opacity-75">
                <span>+51</span>
                <span>944</span>
                <span>675</span>
                <span>509</span>
              </p>
            </a>
            <!-- phone 2 -->
            <a
              target="_blank"
              rel="noopener"
              href="tel:+51 043 415 209"
              class="ml-1 block focus-styles rounded-xl w-full"
            >
              <p class="space-x-0.5 tracking-wider font-medium opacity-75">
                <span>+51</span>
                <span>043</span>
                <span>415</span>
                <span>209</span>
              </p>
            </a>
          </div>
        </div>
      </div>

      <!-- map -->
      <div class="relative w-full h-[350px]">
        <Map />
      </div>
    </div>
  </section>
</template>

<script setup>
import PhoneIcon from "~/components/icons/PhoneIcon.vue";
import MarkerIcon from "~/components/icons/MarkerIcon.vue";
import PhoneSolidIcon from "~/components/icons/PhoneSolidIcon.vue";
import MailIcon from "~/components/icons/MailIcon.vue";
import Map from "~/components/home/Map.vue";
</script>
