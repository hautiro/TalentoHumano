<template>
	<div>
		<Layout ruta="/HomeAusentismo" titulo="control Ausentismo">
			<div
				ref="ausentismoS"
				class="px-6 pb-12 overflow-y-auto p-16 mb-14 mt-5 lg:mt-0">
				<div class="w-[90%] h-[15%] bg-white border-b">
					<p class="text-lg lg:text-2xl text-gray-800 font-thin">
						{{ Nombre }} ({{ cantidad }} de {{ totalRow }})
					</p>
					<div class="w-full flex flex-row gap-6">
						<div class="mt-5 w-full flex items-center">
							<div
								@click="buscarTipoAusentismo"
								class="relative w-12 h-12 cursor-pointer bg-blue-500 rounded flex justify-center text-lg text-white items-center">
								<img class="h-7" :src="Lupa" />
							</div>
							<input
								class="w-full border py-3 rounded text-sm px-2 pl-10"
								v-model="busquedaActual"
								placeholder="Escribe para buscar un usuario" />
							<button
								@click="handle_show_side_modal"
								class="relative text-white bg-[#0284C1] w-12 h-12 rounded flex justify-center items-center">
								<fw-icon icon="plus" />
							</button>
						</div>
						<!-- <div
							class="absolute bottom-32 right-5 mb-5 lg:static my-2 flex items-center"></div> -->
					</div>
				</div>
				<div class="ml-6">
					<div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
						<Ausentismo
							v-for="(ausentismo, index) in AusentismoEmpleado"
							:ausentismo="ausentismo"></Ausentismo>
					</div>
					<div
						@click="more"
						class="w-12 h-12 cursor-pointer bg-blue-500 rounded-full flex justify-center text-lg text-white items-center">
						<img class="h-7" :src="Arrow" />
					</div>
				</div>
				<SideModal
					title="Agregar Ausentismo"
					@toggle_modal="handle_show_side_modal"
					:show_modal="show_side_modal">
					<AddAusentForm
						:jefeId="empIdLogueado()"
						:empId="Number(params.id)"
						@hide-modal="handle_show_side_modal" />
				</SideModal>
			</div>
		</Layout>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Layout from "../../components/Layout.vue";
import { storeToRefs } from "pinia";
import SideModal from "../../components/Global/SideModal.vue";
import { UseAusentismoStore } from "./Ausentismo.store";
import AddAusentForm from "./component/AddAusentForm.vue";
import Ausentismo from "./component/Ausentismo.vue";
import { useRoute } from "vue-router";
import empty from "../../assets/animations/empty.gif";
import loaderWeb from "../../assets/animations/loader-web.gif";
import { empIdLogueado } from "../../utils/local-data";
import Arrow from "../../assets/down-arrow.png";
import Lupa from "../../assets/lupa.png";

const { params } = useRoute();

const show_side_modal = ref(false);
const page = ref(1);

let busquedaActual = ref("");
let ausentismoS = ref<HTMLDivElement>();

const handle_show_side_modal = () =>
	(show_side_modal.value = !show_side_modal.value);

const { getAusentismo, getNombre, clearAusentismo } = UseAusentismoStore();
const { AusentismoEmpleado, loading, Nombre, cantidad, totalPage, totalRow } =
	storeToRefs(UseAusentismoStore());

const buscarTipoAusentismo = () => {
	clearAusentismo();
	getAusentismo(1, busquedaActual.value, Number(params.id));
};

const more = () => {
	page.value = page.value + 1;
	getAusentismo(page.value, busquedaActual.value, Number(params.id));
};

const scrollPaginate = () => {
	if (ausentismoS.value && page.value < totalPage.value) {
		if (
			ausentismoS.value.scrollTop + ausentismoS.value.clientHeight >=
			ausentismoS.value.scrollHeight
		) {
			page.value = page.value + 1;
			getAusentismo(page.value, busquedaActual.value, Number(params.id));
		}
	}
};

onMounted(async () => {
	clearAusentismo();
	getAusentismo(1, "", Number(params.id));
	getNombre(Number(params.id));
});
</script>

<style></style>
