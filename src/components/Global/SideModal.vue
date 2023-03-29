<template>
	<div
		v-if="show_modal"
		class="overflow-hidden w-screen h-screen fixed top-0 right-0">
		<div
			:class="
				show_modal
					? `animate__animated
					animate__fadeInRight
					animate__faster`
					: `animate__animated
					animate__fadeOutRight
					animate__faster`
			"
			class="absolute right-4 z-50 top-10 bottom-10 flex flex-col items-center bg-white rounded-xl"
			v-if="show_modal">
			<div
				class="flex w-full text-center p-5 border-b border-solid border-slate-200 rounded-t">
				<h3 class="text-xl font-thin">{{ title }}</h3>
				<button
					class="p-1 ml-auto cursor-pointer border-0 text-blackfloat-right text-3xl leading-none font-semibold outline-none focus:outline-none"
					@click="emits_m(`toggle_modal`)">
					<span class="h-6 w-6 text-2xl block outline-none focus:outline-none">
						×
					</span>
				</button>
			</div>
			<div class="w-full p-5">
				<slot />
			</div>
		</div>
		<div
			v-if="show_modal"
			class="opacity-25 fixed w-screen h-screen overflow-hidden inset-0 z-40 bg-black"></div>
	</div>
</template>

<script lang="ts" setup>
type PropsM = {
	show_modal: boolean;
	title: string;
	size?: string;
};

type EmitsM = {
	(event: "toggle_modal"): void;
};

const emits_m = defineEmits<EmitsM>();

const { show_modal, title, size } = defineProps<PropsM>();
</script>
