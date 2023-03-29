<template>
	<div
		@click="emits('changeState', id)"
		class="w-14 ml-6 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer"
		:class="state ? 'bg-cyan-500' : 'bg-gray-300'">
		<div
			class="bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out"
			:class="{ 'translate-x-7': state }"></div>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	state: boolean;
	id: number;
}
type Emits = {
	(Event: "changeState", id: number): void;
};
const emits = defineEmits<Emits>();
const { state, id } = defineProps<Props>();
</script>
