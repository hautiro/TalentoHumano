<template>
	<div>
		<Layout ruta="/administration" titulo="Administracion de Usuarios">
			<div class="px-6 pb-12 mt-5 lg:mt-0">
				<p class="text-lg lg:text-2xl text-gray-800 font-thin">
					Listado de usuarios
				</p>
				<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div class="mt-5">
						<input
							class="w-full border py-3 rounded text-sm px-2"
							v-model="busquedaActual"
							placeholder="Escribe para buscar un usuario" />
					</div>
					<div class="w-full relative bottom-32 right-5 mb-5 lg:static">
						<button
							@click="handle_show_side_modal"
							class="py-3 float-right text-white bg-blue-500 hover:bg-blue-700 w-12 h-12 rounded-full flex justify-center items-center">
							<fw-icon icon="plus" />
						</button>
					</div>
				</div>

				<!-- Breadcrumb -->
				<nav
					class="flex px-5 py-3 -mt-16 lg:mt-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
					aria-label="Breadcrumb">
					<ol class="inline-flex items-center space-x-1 md:space-x-3">
						<li>
							<div class="flex items-center" @click="getUserRol('')">
								<a
									href="#"
									class="ml-1 text-xs font-medium text-gray-700 first-letter">
									Todos
								</a>
							</div>
						</li>
						<li aria-current="page">
							<div class="flex items-center">
								<svg
									aria-hidden="true"
									class="w-6 h-6 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"></path>
								</svg>
							</div>
						</li>
						<li v-for="(rol, index) in roles" :key="index" class="flex">
							<div class="flex items-center" @click="getUserRol(rol.NombreRol)">
								<a
									href="#"
									class="ml-1 text-xs font-medium text-gray-700 first-letter"
									:class="rol.IdRol === 1 ? 'text-blue-600' : ''">
									{{ rol.NombreRol }}
								</a>
							</div>
							<div
								class="flex items-center mx-4"
								v-if="index + 1 < roles.length">
								<svg
									aria-hidden="true"
									class="w-6 h-6 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"></path>
								</svg>
							</div>
						</li>
					</ol>
				</nav>

				<div v-if="loading && pagination.total_rows <= 0"></div>
				<div
					v-if="!loading && pagination.total_rows > 0"
					class="w-full rounded-[1rem] hidden lg:flex flex-col mt-4 h-auto bg-gray-50">
					<div
						class="w-full rounded-t-[1rem] bg-[#1d3557] grid grid-cols-7 text-xs">
						<p class="text-white font-semibold p-3 py-4 text-center">No.</p>
						<p class="text-white font-semibold p-3 py-4 text-center">
							Nombre de Usuario
						</p>
						<p class="text-white font-semibold p-3 py-4 text-center">Usuario</p>
						<p class="text-white font-semibold p-3 py-4 text-center">
							Correo de Usuario
						</p>
						<p class="text-white font-semibold p-3 py-4 text-center">
							Fecha Actualizacion
						</p>
						<p class="text-white font-semibold p-3 py-4 text-center">Estado</p>
						<p class="text-white font-semibold p-3 py-4 text-center">
							Acciones
						</p>
					</div>
					<div
						v-for="(user, index) in users"
						:key="index"
						class="grid grid-cols-7 border-b text-white text-xs">
						<p class="text-black font-semibold p-3 py-4 text-center">
							{{ index + 1 }}
						</p>
						<p class="text-black font-semibold p-3 py-4 text-center">
							{{ user.NombreUsuario + " " + user.ApellidoUsuario }}
						</p>
						<p class="text-black font-semibold p-3 py-4 text-center">
							{{ user.Usuario }}
						</p>
						<p class="text-black font-semibold p-3 py-4 text-center">
							{{ user.CorreoUsuario }}
						</p>
						<p class="text-black font-semibold p-3 py-4 text-center">
							{{ new Date(user.FechaActualizacion).toLocaleDateString() }}
						</p>
						<p class="text-black font-semibold p-3 py-4 flex justify-center">
							<Toggle
								:state="user.Estado"
								:id="user.IdUsuario"
								@change-state="updateEstado"></Toggle>
						</p>
						<div class="p-3 flex justify-center items-center gap-1 text-xs">
							<button
								class="py-3 bg-[#01B851] w-12 h-12 rounded-full flex justify-center items-center">
								<fw-icon icon="pencil" />
							</button>
							<!-- <button class="py-3 bg-[#BD1B20] w-12 h-12 rounded-full flex justify-center items-center mx-6">
                                <fw-icon icon="trash" />
                            </button> -->
							<!-- <button
                                class="py-3 bg-[#FDB813] w-12 h-12 rounded-full flex justify-center items-center">
                                <fw-icon icon="eye" />
                            </button> -->
						</div>
					</div>
				</div>
				<div class="w-full grid grid-cols-1 lg:hidden gap-4 mt-5">
					<div
						class="border rounded shadow p-5 text-white bg-gray-700"
						v-for="(us, index) in users"
						:key="index">
						<p class="py-1 roboto-light">
							<span class="roboto-bold">Usuario:</span>
							{{ us.NombreUsuario }}
						</p>
						<p class="py-1 roboto-light">
							<span class="roboto-bold">Correo:</span>
							{{ us.CorreoUsuario }}
						</p>
						<p class="py-1 roboto-light">
							<span class="roboto-bold">Fecha Creacion:</span>
							{{ new Date(us.FechaActualizacion).toLocaleDateString() }}
						</p>
						<div class="p-3 flex justify-center items-center">
							<button
								class="py-3 bg-[#01B851] w-8 h-8 rounded-full flex justify-center items-center">
								<fw-icon icon="pencil" />
							</button>
							<!-- <button
                                class="py-3 bg-[#BD1B20] w-8 h-8 rounded-full flex justify-center items-center mx-6">
                                <fw-icon icon="trash" />
                            </button>
                            <button
                                class="py-3 bg-[#FDB813] w-8 h-8 rounded-full flex justify-center items-center">
                                <fw-icon icon="eye" />
                            </button> -->
						</div>
					</div>
				</div>
				<Pagination
					v-if="pagination.total_pages > 1"
					@method="change_page"
					:total_pages="pagination.total_pages"
					:current_page="pagination.page"
					:prev="pagination.prev_page"
					:next="pagination.next_page"
					:pages="paginate(pagination.page, pagination.total_pages)" />
				<SideModal
					title="Agregar nuevo usuario"
					@toggle_modal="handle_show_side_modal"
					:show_modal="show_side_modal">
					<AddUserForm @hide-modal="handle_show_side_modal" />
				</SideModal>
			</div>
		</Layout>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Layout.vue";
import { UseUsersStore } from "./users.store";
import { storeToRefs } from "pinia";
import Pagination from "../../components/Global/Pagination.vue";
import SideModal from "../../components/Global/SideModal.vue";
import { paginate } from "../../utils/functions";
import AddUserForm from "../users/component/AddUserForm.vue";
import Toggle from "../../components/Global/Toggle.vue";
import { useRolesStore } from "../../stores/roles.store";

const show_side_modal = ref(false);

let pageActual = ref(1);
let busquedaActual = ref("");

const view = ref();

const { get_all_roles } = useRolesStore();
const { roles } = storeToRefs(useRolesStore());

const handle_show_side_modal = () =>
	(show_side_modal.value = !show_side_modal.value);

const { get_users, update_state } = UseUsersStore();
const { pagination, users, loading } = storeToRefs(UseUsersStore());

const change_page = async (page: number | string) => {
	pageActual.value = Number(page);
	await get_users(Number(page), "", "");
};

const updateEstado = (id: number) => {
	update_state(id, pageActual.value, busquedaActual.value);
};

const getUserRol = (rolName: string) => {
	get_users(1, "", rolName);
};

onMounted(async () => {
	await get_users(1, "", "");
	await get_all_roles();
});
</script>

<style lang="scss"></style>
