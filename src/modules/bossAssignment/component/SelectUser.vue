<template>
	<div class="relative w-full">
		<div class="w-full">
			<div class="bg-white flex border rounded-lg p-2 w-full border-gray-400">
				<input
					placeholder="Selecciona el empleado"
					v-model="user_selected"
					@keydown="onlyOpen()"
					class="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
				<div
					class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
					<button
						@click="open()"
						type="button"
						class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
						<span>
							<fw-icon :icon="icon" />
						</span>
					</button>
				</div>
			</div>
		</div>
		<div
			id="drop-client"
			ref="element"
			class="absolute not-show w-full h-64 max-h-64 overflow-y-scroll p-2 bg-white z-50 border rounded">
			<div
				v-if="emp.length > 0"
				v-for="(empleado, index) in emp"
				:key="index"
				class="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
				<div
					@click="
						close();
						buscar('seleccionado', empleado);
						user_selected = empleado.nCompleto;
					"
					class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
					<div class="w-6 flex flex-col items-center">
						<div
							class="flex relative bg-blue-500 justify-center items-center m-1 mr-2 w-6 h-6 mt-1 rounded-full">
							<i class="fa-solid fa-user text-white"></i>
						</div>
					</div>
					<div class="w-full items-center flex">
						<div class="mx-2 -mt-1 text-sm">
							<div
								class="text-xs w-full normal-case font-normal -mt-1 text-gray-500">
								{{ empleado?.nCompleto }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="emp.length === 0"
				class="w-full h-full flex flex-col justify-center items-center">
				<img class="w-36" :src="nofound" />
				<p>Usuario no encontrado</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import nofound from "../../../assets/animations/not-found.gif";
import { userTiposI } from "../../../modules/bossAssignment/types/asignacion.type";

type emit = {
	(event: "buscar", search: string): void;
	(event: "seleccionado", empleado: userTiposI): void;
};

interface pros {
	emp: userTiposI[];
}

const buscar = defineEmits<emit>();

const { emp } = defineProps<pros>();

interface U {
	nameEmp: string;
}

// const clientsProcessed = ref<U[]>([]);

const user_selected = ref("");

const icon = ref("chevron-down");

const element = ref<HTMLDivElement>();

const open = () => {
	if (element.value?.classList.contains("not-show")) {
		element.value?.classList.add("show");
		element.value?.classList.remove("not-show");
		icon.value = "chevron-up";
	} else {
		element.value?.classList.remove("show");
		element.value?.classList.add("not-show");
		icon.value = "chevron-down";
	}
};

const onlyOpen = () => {
	if (element.value?.classList.contains("not-show")) {
		element.value?.classList.add("show");
		element.value?.classList.remove("not-show");
		icon.value = "chevron-up";
	}
	buscar("buscar", user_selected.value);
};

const close = () => {
	icon.value = "chevron-down";
	element.value?.classList.add("not-show");
	element.value?.classList.remove("show");
};

onMounted(() => {});
</script>
<style>
.not-show {
	display: none;
}

.show {
	display: block;
}
</style>
