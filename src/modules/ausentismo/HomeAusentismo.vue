<template>
	<div>
		<Layout titulo="Control Ausentismo">
			<div
				class="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
				<Empleado v-for="(emp, index) in empXJefe" :empleado="emp"> </Empleado>
			</div>
		</Layout>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Layout from "../../components/Layout.vue";
import Empleado from "./component/Empleado.vue";
import { UseAusentismoStore } from "./Ausentismo.store";
import { empIdLogueado } from "../../utils/local-data";

const { getEmpXJefe } = UseAusentismoStore();
const { empXJefe } = storeToRefs(UseAusentismoStore());

onMounted(async () => {
	await getEmpXJefe("", empIdLogueado());
});
</script>

<style lang="scss"></style>
