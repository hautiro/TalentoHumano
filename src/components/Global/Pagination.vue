<template>
	<ul class="hidden lg:flex mt-6">
		<li>
			<button
				@click="change_page(prev)"
				class="mx-1 bg-[#0284C1] cursor-pointer rounded-full p-2 w-12 h-12 text-center text-lg text-white"
				:disabled="current_page === 1">
				<fw-icon icon="chevron-left" />
			</button>
		</li>
		<li
			class="mx-1 border font-semibold border-blue text-white rounded-full p-2 w-12 h-12 text-center text-sm flex justify-center items-center cursor-pointer"
			v-for="page in pages"
			:class="page === current_page ? `bg-[#0284C1]` : `text-[#0284C1]`"
			v-bind:key="page"
			@click="change_page(page)">
			{{ page }}
		</li>
		<li>
			<button
				class="mx-1 bg-[#0284C1] rounded-full p-2 w-12 h-12 cursor-pointer text-center text-lg text-white"
				:disabled="current_page === total_pages"
				@click="change_page(next)">
				<fw-icon icon="chevron-right" />
			</button>
		</li>
	</ul>
	<div class="grid grid-cols-2 lg:hidden gap-6 mt-5">
		<button
			:disabled="current_page === 1"
			@click="change_page(prev)"
			class="bg-[#0284C1] text-white roboto-bold rounded py-2 text-sm">
			Anterior
		</button>
		<button
			:disabled="current_page === total_pages"
			@click="change_page(next)"
			class="bg-[#0284C1] text-white roboto-bold rounded py-2 text-sm">
			Siguiente
		</button>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	pages: Array<number | string>;
	current_page: number;
	total_pages: number;
	next: number;
	prev: number;
}

const { pages, current_page, total_pages, next, prev } = defineProps<Props>();

type Emits = {
	(event: "method", page: number | string): void;
};

const emits = defineEmits<Emits>();

const change_page = (page: number | string) => {
	emits("method", Number(page));
};
</script>
