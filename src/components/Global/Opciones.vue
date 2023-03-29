<template>
	<div class="w-96 h-full">
		<RouterLink :to="'/' + path" class="w-full grid grid-cols-1 gap-4 mt-5">
			<div
				class="border rounded shadow p-5 text-white flex flex-col justify-center items-center"
				:class="colors">
				<p class="py-1 roboto-light">
					<img class="w-36 xl:w-40" :src="icon" />
				</p>
				<p class="py-1 roboto-light">
					<span
						class="roboto-bold font-bold text-xl uppercase"
						:class="textColor"
						>{{ nombre }}</span
					>
				</p>
				<!-- <div class="p-3 flex justify-center items-center">
                    <button class="py-3 bg-[#01B851] w-8 h-8 rounded-full flex justify-center items-center">
                        <fw-icon icon="pencil" />
                    </button>
                    <button class="py-3 bg-[#BD1B20] w-8 h-8 rounded-full flex justify-center items-center mx-6">
                        <fw-icon icon="trash" />
                    </button>
                    <button class="py-3 bg-[#FDB813] w-8 h-8 rounded-full flex justify-center items-center">
                        <fw-icon icon="eye" />
                    </button>
                            </div> -->
			</div>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
type opciones = {
	icon: string;
	nombre: string;
	path: string;
	colors: string;
	textColor?: string;
};
const { icon, nombre, path, colors, textColor } = defineProps<opciones>();
</script>
