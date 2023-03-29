<template>
	<div
		class="w-full p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 border">
		<div class="flex-shrink-0">
			<fw-icon class="text-3xl" icon="calendar-xmark"></fw-icon>
		</div>
		<div>
			<div class="text-xl font-medium text-black">
				{{ ausentismo.U_tipo_absent }}
			</div>
			<p class="py-1 text-gray-500">
				<span class="roboto-bold">Desde:</span>
				{{ new Date(ausentismo.fromDate).toLocaleDateString() }}
				{{ ausentismo.U_hora_desde }}
			</p>
			<!-- <p class="py-1 text-gray-500">
				<span class="roboto-bold">Hora desde:</span>
				{{ ausentismo.U_hora_desde }}
			</p> -->
			<p class="py-1 text-gray-500">
				<span class="roboto-bold">Hasta:</span>
				{{ new Date(ausentismo.toDate).toLocaleDateString() }}
				{{ ausentismo.U_hora_hasta }}
			</p>
			<!-- <p class="py-1 text-gray-500">
				<span class="roboto-bold">Hora hasta:</span>
				
			</p> -->
			<p class="py-1 text-gray-500">
				<span class="roboto-bold">Comentario:</span>
				{{ ausentismo.reason }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Ausentismo } from "../types/ausentismo.type";

interface Props {
	ausentismo: Ausentismo;
}

const { ausentismo } = defineProps<Props>();
</script>
