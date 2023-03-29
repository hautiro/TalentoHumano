<template>
	<div>
		<Layout titulo="Manejo de personal">
			<div class="w-full">
				<div class="flex flex-row justify-center gap-6">
					<Opciones
						:icon="ausente"
						nombre="Administrar Ausentismo"
						path="HomeAusentismo"
						colors="bg-gradient-to-r from-[#B785AA] to-[#E2A5A5]">
					</Opciones>
				</div>
			</div>
		</Layout>
	</div>
</template>
<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Opciones from "../components/Global/Opciones.vue";
import ausente from "../assets/Rrhh/ausente.png";
</script>
