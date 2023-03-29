<template>
    <div
        class="w-screen h-screen bg-[url('./assets/login-back1.svg')] flex justify-center items-center bg-no-repeat bg-cover">
        <div class="w-[90vw] lg:w-[90vw] xl:w-[90vw] 2xl:w-[80vw] h-[75vh] rounded rounded-br-[3rem] flex bg-white">
            <div class="w-full lg:w-[35%] h-full bg-white p-8">
                <div class="flex justify-center">
                    <span class="font-bold text-base xl:text-lg text-gray-700 ml-4 mt-2 roboto-bold">TALENTO HUMANO</span>
                </div>
                <div class="w-full flex py-5 justify-center items-center">
                    <img class="w-36 xl:w-40" src="../assets/logo.png">
                </div>
                <p class="roboto-bold md:text-2xl lg:text-base xl:text-2xl text-gray-600 py-2 text-center ">¡Bienvenido!
                </p>
                <p class="text-sm lg:text-lg roboto-light py-3">Ingresa tus datos para iniciar sesion</p>
                <form @submit="on_submit">
                    <div class="py-2">
                        <label class="text-xs font-black text-gray-600 roboto-light">Nombre de usuario
                            <RequiredField />
                        </label>
                        <field name="Usuario" placeholder="Escribe tu usuario"
                            class="py-3 roboto-light text-sm border rounded w-full px-2" />
                        <error-message name="Usuario" class="text-red-500 text-sm roboto-light"></error-message>
                    </div>
                    <div class="py-2">
                        <label class="text-xs font-black text-gray-600 roboto-light">Contraseña
                            <RequiredField />
                        </label>
                        <field name="Contrasenia" type="password" placeholder="Escribe tu contraseña"
                            class="py-3 roboto-light text-sm border rounded w-full px-2" />
                        <error-message name="Contrasenia" class="text-red-500 text-sm roboto-light"></error-message>
                    </div>
                    <button class="mt-4 w-full py-4 text-sm font-semibold roboto-bold text-white bg-[#0284C1] rounded">
                        Iniciar Sesion
                    </button>
                </form>
                <span class="text-[#0284C1] roboto-light float-right py-3 text-sm">¿Olvidaste tu contraseña?</span>
            </div>
            <div class="hidden lg:flex w-[65%] h-full p-6">
                <div
                    class="w-full h-full rounded rounded-tl-[3rem] rounded-br-[3rem] bg-[url('./assets/back.svg')] bg-cover bg-center bg-no-repeat">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as yup from "yup"
import { Form, Field, ErrorMessage, useForm } from "vee-validate"
import RequiredField from "../components/Global/RequiredField.vue";
import { UseAuthStore } from '../stores/auth.store';
import { LoginPayload } from '../types/auth.types';

const validation_schema = yup.object().shape({
    Usuario: yup.string().required("Debes escribir tu nombre de usuario"),
    Contrasenia: yup.string().required("Debes escribir tu contraseña")
})

const { handleSubmit } = useForm<LoginPayload>({
    validationSchema: validation_schema,
})

const { login_mutation } = UseAuthStore()

const on_submit = handleSubmit((values) => {
    login_mutation(values)
})

</script>

<style lang="scss">

</style>