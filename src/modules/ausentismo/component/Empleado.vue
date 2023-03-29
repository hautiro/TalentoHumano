<template>
	<div class="bg-white shadow-lg rounded-lg overflow-hidden">
		<RouterLink :to="`Ausentismo/${empleado.empID}`">
			<!-- Product Image -->
			<div class="relative flex justify-center">
				<img class="w-32 h-32" :src="perfil" :alt="empleado.NombreUsuario" />
				<div class="absolute bottom-0 right-0 p-2 bg-gray-800 text-white">
					{{ empleado.CodEmp }}
				</div>
			</div>
			<!-- Product Info -->
			<div class="p-4">
				<p class="font-bold text-xs text-center">
					{{ empleado.NombreUsuario }}
				</p>
				<p class="py-1 text-gray-500">
					<span class="roboto-bold">Posicion:</span>
					{{ empleado.jobTitle }}
				</p>
				<p class="py-1 text-gray-500">
					<span class="roboto-bold">Departamento:</span>
					{{ empleado.nameDept }}
				</p>

				<!-- <div class="mt-4 flex items-center justify-center">
				<div>
					<button
						class="w-9 h-9 text-xs text-white bg-green-600 mx-2 rounded-full">
						<fw-icon class="" icon="pencil" />
					</button>
					<button
						class="w-9 h-9 text-xs text-white bg-red-600 mx-2 rounded-full">
						<fw-icon icon="trash" />
					</button>
					<button
						class="w-9 h-9 text-xs rounded-full text-white bg-blue-600 mx-2">
						<fw-icon icon="eye" />
					</button>
				</div>
			</div> -->
			</div>
		</RouterLink>
	</div>
</template>

<script lang="ts" setup>
import { return_image } from "../../../utils/constants";
import { EmpleadoXJefeI } from "../types/ausentismo.type";
import perfil from "../../../assets/perfil1.png";

interface Props {
	empleado: EmpleadoXJefeI;
}

const { empleado } = defineProps<Props>();
</script>

<style scoped>
/* Tailwind CSS classes used */
.rounded-lg {
	border-radius: 0.5rem;
}
.overflow-hidden {
	overflow: hidden;
}
.shadow-lg {
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
}
.bg-white {
	background-color: #ffffff;
}
.w-full {
	width: 100%;
}
.h-64 {
	height: 16rem;
}
.object-cover {
	object-fit: cover;
}
.absolute {
	position: absolute;
}
.bottom-0 {
	bottom: 0;
}
.right-0 {
	right: 0;
}
.p-2 {
	padding: 0.5rem;
}
.bg-gray-800 {
	background-color: #1f2937;
}
.text-white {
	color: #ffffff;
}
.font-bold {
	font-weight: 700;
}
.text-lg {
	font-size: 1.25rem;
}
.text-gray-700 {
	color: #4b5563;
}
.mt-2 {
	margin-top: 0.5rem;
}
.flex {
	display: flex;
}
.items-center {
	align-items: center;
}
.h-6 {
	height: 1.5rem;
}
.w-6 {
	width: 1.5rem;
}
.fill-current {
	fill: currentColor;
}
.text-gray-500 {
	color: #6b7280;
}
.mr-2 {
	margin-right: 0.5rem;
}
.text-sm {
	font-size: 0.875rem;
}
</style>
