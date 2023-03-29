<template>
  <div class="h-screen w-screen overflow-x-hidden">
    <div class="w-screen h-16 fixed bg-gray-800 top-0">
      <RouterLink :to="`${ruta}`" v-if="ruta">
        <div
          class="h-full flex items-center absolute justify-start text-white ml-20 text-xl gap-2"
        >
          <fw-icon icon="arrow-left" />
          <p class="hidden lg:flex">Regresar</p>
        </div>
      </RouterLink>
      <div class="h-full flex justify-center items-center text-white text-xl uppercase">
        <p>{{ titulo }}</p>
      </div>
      <div
        class="h-full flex items-center justify-end absolute text-white mr-20 text-xs top-0 right-0 gap-2"
      >
        <p class="hidden lg:flex">{{ NombreLogueado }}</p>
      </div>
    </div>

    <div class="flex top-0">
      <div class="absolute lg:hidden z-10 top-0 left-8">
        <button @click="show_menu = true" class="text-2xl mt-5 text-gray-600">
          <fw-icon icon="bars" />
        </button>
      </div>
      <div
        class="w-16 h-screen fixed overflow-auto hidden lg:flex flex-col items-center bg-gray-800"
      >
        <div @click="setShow" class="text-white cursor-pointer text-2xl mt-2">
          <fw-icon :icon="show ? `times` : `bars`" />
        </div>
        <div class="text-white text-xl mt-8">
          <RouterLink to="/">
            <fw-icon icon="home" />
          </RouterLink>
        </div>
        <div class="text-white text-xl mt-4">
          <RouterLink to="/administration">
            <fw-icon icon="user-shield" />
          </RouterLink>
        </div>
        <div class="text-white text-xl mt-4">
          <RouterLink to="/RRHH">
            <fw-icon icon="hands-holding-child" />
          </RouterLink>
        </div>
        <div class="text-white text-xl mt-4" @click="MakeLoggout">
          <fw-icon icon="sign-out-alt" />
        </div>
      </div>
      <div
        :class="show ? `flex` : `hidden`"
        class="h-screen overflow-auto ml-14 z-10 w-80 fixed bg-gray-800"
      >
        <ul class="text-white mt-2 ml-2">
          <li class="text-2xl text-white font-semibold">
            <RouterLink to="/">TALENTO HUMANO</RouterLink>
          </li>
          <li class="mt-8 text-xl font-semibold">
            <RouterLink to="/">Inicio</RouterLink>
          </li>
          <li class="mt-4 text-xl font-semibold">
            <RouterLink to="/administration">Administracion</RouterLink>
          </li>
          <li class="mt-4 text-xl font-semibold">
            <RouterLink to="/RRHH">Recursos Humanos</RouterLink>
          </li>
          <li class="mt-4 text-xl font-semibold cursor-pointer" @click="MakeLoggout">
            Cerrar Sesion
          </li>
        </ul>
      </div>
      <div class="p-6 ml-0 mt-16 w-[95%] overflow-auto lg:ml-16">
        <slot />
      </div>
    </div>
    <div
      :class="
        show_menu
          ? `animate__animated
						animate__fadeInLeft
						animate__faster`
          : `animate__animated
						animate__fadeOutLeft
						animate__faster`
      "
      class="fixed left-0 z-50 top-0 h-full w-[80vw] md:w-[40vw] flex flex-col bg-white"
      v-if="show_menu"
    >
      <div
        class="flex flex-col w-full h-44 border-b p-5 border-solid bg-gray-800 justify-center"
      >
        <button
          @click="show_menu = false"
          class="absolute top-0 right-5 text-2xl text-white"
        >
          <fw-icon icon="xmark" />
        </button>
        <img class="w-36" src="../assets/facela.png" />
        <span class="text-gray-50 text-sm font-semibold mt-3">{{ NombreLogueado }}</span>
      </div>
      <div class="w-full p-5">
        <RouterLink to="/" class="flex py-2">
          <fw-icon icon="home" class="text-gray-600 text-lg mr-2 w-6" />
          <p class="text-sm roboto-light">Inicio</p>
        </RouterLink>
        <RouterLink to="/administration" class="flex py-2">
          <fw-icon icon="users" class="text-gray-600 text-lg mr-2 w-6" />
          <p class="text-sm roboto-light">Administracion</p>
        </RouterLink>
        <!-- <RouterLink to="/product-list" class="flex py-2">
					<fw-icon icon="list" class="text-gray-600 text-lg mr-2 w-6" />
					<p class="text-sm roboto-light">Catalogos de productos</p>
				</RouterLink> -->
      </div>
      <div
        @click="MakeLoggout"
        class="p-5 absolute cursor-pointer bottom-0 border-t w-full flex py-5"
      >
        <fw-icon icon="sign-out-alt" class="text-gray-600 text-lg mr-2 w-6" />
        <p class="text-sm roboto-light">Cerrar sesion</p>
      </div>
    </div>
    <div
      v-if="show_menu"
      class="opacity-25 fixed w-screen h-screen overflow-hidden inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { UseAuthStore } from "../stores/auth.store";
import { empIdLogueado } from "../utils/local-data";

const { MakeLoggout, getNombre } = UseAuthStore();
const { NombreLogueado } = storeToRefs(UseAuthStore());

let show = ref(false);
const show_menu = ref(false);

const setShow = () => {
  show.value = !show.value;
};

const { titulo, ruta } = defineProps<pros>();

interface pros {
  ruta?: string;
  titulo: string;
}

onMounted(() => {
  getNombre(empIdLogueado());
});
</script>
