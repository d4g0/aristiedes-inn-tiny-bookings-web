<template>
  <div class="w-full">
    <form @submit.prevent="onFormSubmit">
      <!-- Administrador Name -->
      <div class="mt-4">
        <label
          for="admin_name"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': adminNameError,
          }"
        >
          Nombre
        </label>
        <input
          type="text"
          name="admin_name"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': adminNameError,
          }"
          v-model="v.admin_name.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="adminNameError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un nombre válido </span>
          </div>
        </transition>
      </div>

      <!-- Administrador description -->
      <div class="mt-4">
        <label
          for="admin_description"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': adminDescriptionError,
          }"
        >
          Descripción
        </label>
        <textarea
          type="text"
          name="admin_description"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700':
              adminDescriptionError,
          }"
          v-model="v.admin_description.$model"
        />
        <transition name="fade">
          <div
            class="pl-2 mt-1 text-red-700 text-sm"
            v-if="adminDescriptionError"
          >
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca una descripción válida </span>
          </div>
        </transition>
      </div>

      <!-- Administrador Email -->
      <div class="mt-4">
        <label
          for="admin_email"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': emailError,
          }"
        >
          Email
        </label>
        <input
          type="email"
          name="admin_email"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': emailError,
          }"
          v-model="v.email.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="emailError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un email válido </span>
          </div>
        </transition>
      </div>

      <!-- Administrador Name -->
      <div class="mt-4">
        <label
          for="admin_password"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': passwordError,
          }"
        >
          Password
        </label>
        <input
          type="text"
          name="admin_password"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': passwordError,
          }"
          v-model="v.password.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="passwordError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un nombre válido </span>
          </div>
        </transition>
      </div>

      <!-- user role -->
      <div class="mt-4">
        <label
          for="user_role_selector"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': userRoleError,
          }"
        >
          Tipo de administrador:
        </label>
        <select
          v-model="v.user_role_option.$model"
          name="user_role_selector"
          id="user_role_selector"
          class="
            w-full
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': userRoleError,
          }"
        >
          <option value="" disabled selected>Por favor seleccione</option>
          <option v-for="role in adminRoles" :key="role.id" :value="role.id">
            {{ role.user_role }}
          </option>
        </select>

        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="userRoleError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor seleccione un tipo </span>
          </div>
        </transition>
      </div>

      <!-- submit -->
      <div class="mt-[40px] relative">
        <button
          class="
            rounded-[16px]
            p-3
            bg-black
            dark:bg-type-on-dark
            text-white
            dark:text-type-on-light
            w-full
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-brand
            dark:hover:bg-brand dark:hover:text-white
            disabled:bg-brand/60 disabled:cursor-not-allowed
          "
          :disabled="isSending"
          :class="{
            'opacity-70': isSending,
          }"
        >
          Crear
        </button>

        <!-- spinner -->
        <transition name="fade">
          <div
            v-if="isSending"
            class="
              absolute
              top-0
              left-0
              w-full
              h-full
              flex
              justify-start
              items-center
              pl-4
            "
          >
            <div
              class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
              "
              role="status"
            >
              <span class="sr-only">Cargando</span>
            </div>
          </div>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref, watch } from "@nuxtjs/composition-api";
import { EVENTS, USER_ROLES } from "~/db";
const CREATE_ADMIN = EVENTS.ADMIN.ADMINS.CREATE_ADMIN;
const { FULL_ADMIN, BASIC_ADMIN } = USER_ROLES;
import {
  required,
  maxLength,
  minLength,
  email as validEmail,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: {
    roles: {
      type: Array,
      default: [{ id: 0, user_role: "foo_role" }],
    },
    isSending: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const adminRoles = computed(() =>
      props.roles.filter((role) =>
        [FULL_ADMIN, BASIC_ADMIN].includes(role.user_role)
      )
    );

    const user_role_option = ref("");
    const admin_name = ref("");
    const email = ref("");
    const admin_description = ref("");
    const password = ref("");

    const utts = ref(false);

    // vali
    const rules = {
      admin_name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(60),
      },
      email: {
        required,
        validEmail,
      },
      admin_description: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(150),
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(24),
      },
      user_role_option: {
        required,
        isInAdminRoles,
      },
    };

    function isInAdminRoles(optionValue) {
      const isInARoles = adminRoles.value
        .map((r) => r.id)
        .includes(optionValue);
      return isInARoles ? true : false;
    }
    const v = useVuelidate(rules, {
      admin_name,
      email,
      admin_description,
      password,
      user_role_option
    });

    const emailError = computed(() => utts.value && v.value.email.$invalid);
    const adminNameError = computed(() => utts.value && v.value.email.$invalid);
    const adminDescriptionError = computed(
      () => utts.value && v.value.admin_description.$invalid
    );
    const passwordError = computed(
      () => utts.value && v.value.password.$invalid
    );

    const userRoleError = computed(
      () => utts.value && v.value.user_role_option.$invalid
    );

    function onFormSubmit() {
      utts.value = true;
      const data = {
        user_role_id: user_role_option.value,
        email: email.value,
        admin_name: admin_name.value,
        admin_description: admin_description.value,
        password: password.value,
      };

      // emit
      if (!v.value.$invalid) {
        emit(CREATE_ADMIN, data);
      }
    }

    return {
      onFormSubmit,
      adminRoles,
      user_role_option,
      // v
      v,
      // v errors
      emailError,
      adminNameError,
      adminDescriptionError,
      passwordError,
      userRoleError,

      //
    };
  },
};
</script>

<style>
</style>