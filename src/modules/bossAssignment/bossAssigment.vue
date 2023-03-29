<template>
	<div>
		<div>
			<Layout ruta="/administration" titulo="Control asignaciones">
				<div class="px-6 pb-12 mt-5 lg:mt-0">
					<p class="text-lg lg:text-2xl text-gray-800 font-thin">
						Asignacion de Jefaturas
					</p>
					<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div class="mt-5">
							<input
								class="w-full border py-3 rounded text-sm px-2"
								v-model="busquedaActual"
								placeholder="Escribe para buscar un usuario" />
						</div>
						<div class="w-full relative bottom-32 right-5 mb-5 lg:static">
							<!-- <button
							@click="handle_show_side_modal"
							class="py-3 float-right text-white bg-[#0284C1] w-12 h-12 rounded-full flex justify-center items-center">
							<fw-icon icon="plus" />
						</button> -->
						</div>
					</div>
					<div class="grid grid-cols-2 gap-2 mt-2">
						<SelectUser
							:emp="jefes"
							@buscar="buscarJefe"
							@seleccionado="jefeSeleccionado">
						</SelectUser>
						<SelectUser
							:emp="empleados"
							@buscar="buscarEmpleado"
							@seleccionado="empleadoSeleccionado">
						</SelectUser>
					</div>
					<button
						@click="save"
						class="py-3 float-right text-white bg-blue-500 hover:bg-blue-700 w-12 h-12 rounded-full flex justify-center items-center my-3">
						<fw-icon icon="plus" />
					</button>
					<div
						v-if="pagination.total_rows <= 0"
						class="w-full h-full flex flex-col justify-center items-center">
						<img class="w-72" :src="empty" />
						<p class="text-xl">La Jefatura no tiene empleados asignados</p>
					</div>
					<div
						v-if="loading"
						class="w-full h-full flex flex-col justify-center items-center">
						<img class="w-72" :src="empty" />
						<p class="text-xl">La Jefatura no tiene empleados asignados</p>
					</div>
					<div
						v-if="pagination.total_rows > 0"
						class="w-full rounded-[1rem] hidden lg:flex flex-col mt-4 h-auto bg-gray-50">
						<div class="w-full rounded-t-[1rem] bg-[#1d3557] grid grid-cols-4">
							<p class="text-white font-semibold p-3 py-4 text-center">No.</p>
							<p class="text-white font-semibold p-3 py-4 text-center">
								Nombre Empleado
							</p>
							<p class="text-white font-semibold p-3 py-4 text-center">
								Fecha Actualizacion
							</p>
							<p class="text-white font-semibold p-3 py-4 text-center">
								Estado
							</p>
						</div>
						<div
							v-for="(asignacion, index) in asignaciones"
							:key="index"
							class="grid grid-cols-4 border-b text-white">
							<p class="text-black font-semibold p-3 py-4 text-center">
								{{ index + 1 }}
							</p>
							<p class="text-black font-semibold p-3 py-4 text-center">
								{{ asignacion.NombreEmpleado }}
							</p>
							<p class="text-black font-semibold p-3 py-4 text-center">
								{{
									new Date(asignacion.FechaActualizacion).toLocaleDateString()
								}}
							</p>
							<p class="text-black font-semibold p-3 py-4 flex justify-center">
								<Toggle
									:state="asignacion.Estado"
									:id="asignacion.idAsignacion"
									@change-state="updateEstado">
								</Toggle>
							</p>
						</div>
					</div>
					<div class="w-full grid grid-cols-1 lg:hidden gap-4 mt-5">
						<div
							class="border rounded shadow p-5 text-white bg-gray-700"
							v-for="(us, index) in asignaciones"
							:key="index">
							<p class="py-1 roboto-light">
								<span class="roboto-bold">Usuario:</span>
								{{ us.NombreEmpleado }}
							</p>
							<p class="py-1 roboto-light">
								<span class="roboto-bold">Correo:</span>
								{{ us.Estado }}
							</p>
							<p class="py-1 roboto-light">
								<span class="roboto-bold">Fecha Creacion:</span>
								{{ new Date(us.FechaActualizacion).toLocaleDateString() }}
							</p>
						</div>
					</div>
					<Pagination
						v-if="pagination.total_pages > 1"
						@method="change_page"
						:total_pages="pagination.total_pages"
						:current_page="pagination.page"
						:prev="pagination.prev_page"
						:next="pagination.nex_page"
						:pages="paginate(pagination.page, pagination.total_pages)" />
				</div>
			</Layout>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { paginate } from "../../utils/functions";
import Layout from "../../components/Layout.vue";
import Pagination from "../../components/Global/Pagination.vue";
import empty from "../../assets/animations/empty.gif";
import { useAsignacionStore } from "./bossAssignment.store";
import Toggle from "../../components/Global/Toggle.vue";
import { userTiposI } from "./types/asignacion.type";
import SelectUser from "./component/SelectUser.vue";

let busquedaActual = ref("");
let pageActual = ref(1);

// const { pagination, users } = storeToRefs(UseUsersStore());

const { pagination, asignaciones, jefes, empleados } = storeToRefs(
	useAsignacionStore()
);
const {
	loading,
	get_asignacion,
	set_Asignacion,
	update_Estado,
	getUsuarioEmpleado,
	getUsuarioJefe,
} = useAsignacionStore();

const change_page = async (page: number | string) => {
	pageActual.value = Number(page);
	await get_asignacion(Number(page), "", jefe_selected.value.empId);
};

const updateEstado = (id: number) => {
	update_Estado(id, pageActual.value, busquedaActual.value);
};

const buscarJefe = (nombre: string) => {
	getUsuarioJefe(nombre);
};

const buscarEmpleado = (nombre: string) => {
	getUsuarioEmpleado(nombre);
};

const emp_selected = ref<userTiposI>({
	empId: 0,
	NombreUsuario: "",
	ApellidoUsuario: "",
	nCompleto: "",
});

const empleadoSeleccionado = (empleado: userTiposI) => {
	emp_selected.value = empleado;
};

const jefe_selected = ref<userTiposI>({
	empId: 0,
	NombreUsuario: "",
	ApellidoUsuario: "",
	nCompleto: "",
});

const jefeSeleccionado = async (jefe: userTiposI) => {
	jefe_selected.value = jefe;
	console.log(jefe);
	await get_asignacion(1, "", Number(jefe.empId));
};

const save = () => {
	const data_send = {
		empId: Number(emp_selected.value.empId),
		NombreEmpleado:
			emp_selected.value.NombreUsuario + emp_selected.value.ApellidoUsuario,
		JefeId: Number(jefe_selected.value.empId),
	};
	set_Asignacion(data_send);
};

onMounted(async () => {
	await getUsuarioJefe("", "Jefe");
	await getUsuarioEmpleado("", "Empleado");
});
</script>

<style lang="scss"></style>
