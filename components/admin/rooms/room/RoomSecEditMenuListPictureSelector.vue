<template>
  <div>
    <SubHeading text="Actualize la foto" />
    <!-- Actual -->
    <div class="mt-[30px]">
      <p class="font-bold">Actual:</p>
      <div class="mt-[20px] h-[300px] w-full relative">
        <div
          class="absolute w-full h-full inset-0 bg-gray-200 rounded-[16px]"
          :class="{
            hasPicture: 'animate-pulse',
          }"
        ></div>
        <img
          v-if="hasPicture"
          class="
            absolute
            top-0
            left-0
            w-full
            h-full
            object-cover
            rounded-[16px]
            z-10
          "
          :src="pictureSrc"
        />
        <div
          v-else
          class="relative z-10 w-full h-full flex items-center justify-center"
        >
          <p>Esta habitación no tiene foto</p>
        </div>
      </div>
    </div>

    <!-- update pic -->
    <form class="mt-[30px]" @submit.prevent="onSubmit">
      <div>
        <div class="">
          <label
            for="new_room_picture"
            class="label pl-2"
            :class="{
              'text-red-700': fileError,
            }"
          >
            Suba una nueva foto:
          </label>
          <input
            type="file"
            id="new_room_picture"
            ref="picture_input"
            class="
              w-full
              input-field
              focus-effect
              border-gray-800/40 border
              focus:ring-brand
            "
            :class="{
              'text-red-700 border-red-700 focus:ring-red-700': fileError,
            }"
          />
          <transition name="fade">
            <div class="pl-2 mt-1 text-red-700 text-sm" v-if="fileError">
              <span aria-hidden="true">*</span>
              <span class=""> Por favor seleccione una foto </span>
            </div>
          </transition>
        </div>
        <SubmitBtn
          :isSending="isSending"
          submitText="Actualizar"
          class="mt-[30px]"
        />
      </div>
    </form>

    <!-- eliminate pic -->
    <div v-if="hasPicture" class="mt-[50px]">
      <SubmitBtnSecondary
        @btn_hit="onDelReq"
        :isSending="deleteRoomPictureLoading"
        submitText="Eliminar foto"
      />
    </div>
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import {
  computed,
  inject,
  ref,
  useContext,
  watch,
} from "@nuxtjs/composition-api";
import SubmitBtn from "../../global/SubmitBtn.vue";
import SubmitBtnSecondary from "../../global/SubmitBtnSecondary.vue";
import { usePostFormDataQuery } from "~/composables/usePostFormDataQuery";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
import LazyImage from "~/components/global/LazyImage.vue";
import EndSecLine from "../../global/EndSecLine.vue";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { deleteRoomPicture } from "~/querys/deleteRoomPicture";
export default {
  components: {
    SubHeading,
    SubmitBtn,
    SubmitBtnSecondary,
    LazyImage,
    EndSecLine,
  },

  props: {
    room: {
      type: Object,
    },
  },

  setup(props) {
    // pic
    const ctx = useContext();
    const API_CONTENT_PATH = ctx.env.API_CONTENT_PATH;
    const API_REST_URL = ctx.env.API_REST_URL;
    // console.log({ env: ctx.env });
    const firstPicSrc = computed(
      () => props.room?.room_pictures[0]?.filename || ""
    );
    function mapedPictureSrc(filename) {
      return `/${API_CONTENT_PATH}/img/${filename}`;
    }
    const pictureSrc = computed(() => mapedPictureSrc(firstPicSrc.value));

    const hasPicture = computed(() =>
      firstPicSrc.value.length ? true : false
    );

    // form
    const picture_input = ref();

    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    // query

    const uploadRoute = `room_pictures?room_id=${props.room.id}&token=${token.value}`;
    const uploadUrl = API_REST_URL + uploadRoute;
    // console.log({ API_REST_URL, uploadUrl });
    const {
      loading: isSending,
      load: updatePicture,
      result: updateResult,
      error: updateError,
      setFormData,
    } = usePostFormDataQuery(uploadUrl);

    const loadRooms = inject("loadRooms");

    watch(updateResult, (newR) => {
      // console.log({ newR });
      if (newR.result == "OK") {
        showToastWithText(TOAST_TYPES.success, "Foto actualizada", true);
        loadRooms();
      }
    });
    watch(updateError, (newE) => {
      if (newE) {
        console.log({ newE });
        showToastWithText(TOAST_TYPES.error, "Error", true);
      }
    });

    const utts = ref(false);
    const fileError = ref(false);
    // const fileError = computed(
    //   utts.value &&
    //     !picture_input.value?.files &&
    //     !picture_input.value?.files[0]
    // );
    // submit
    function onSubmit() {
      utts.value = true;
      // check vality
      console.log(picture_input.value);
      const formData = new FormData();
      formData.append("new_room_picture", picture_input.value?.files[0]);
      setFormData(formData);
      updatePicture();
    }

    // dell picture

    const {
      load: fetchDeleteRoomPicture,
      loading: deleteRoomPictureLoading,
      setVariables,
    } = smartQueryLoader(
      deleteRoomPicture,
      (_result) => {
        showToastWithText(TOAST_TYPES.success, "Foto eliminada", true);
        loadRooms();
      },
      "deleteRoomPicture"
    );

    function onDelReq() {
      console.log("onDelReq");

      try {
        // v
        const variables = {
          input: {
            room_picture_id: parseInt(
              props.room.room_pictures[0].room_picture_id
            ),
          },
        };

        setVariables(variables);
        fetchDeleteRoomPicture();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      hasPicture,
      firstPicSrc,
      pictureSrc,
      picture_input,
      isSending,
      fileError,
      onSubmit,
      // dell
      onDelReq,
      deleteRoomPictureLoading,
    };
  },
};
</script>

<style>
</style>
