<template>
	<div>
		<Layout titulo="Administracion">
			<div class="w-full">
				<div class="flex flex-row justify-center gap-6">
					<Opciones
						:icon="adminUsuarios"
						nombre="Administrar usuarios"
						path="users"
						colors="bg-gradient-to-r from-[#CBC8CA] to-[#F5F5F5]"
						text-color="text-black">
					</Opciones>
					<Opciones
						:icon="asignarJefe"
						nombre="Asignacion de jefes"
						path="asignacion"
						colors="bg-gradient-to-r from-[#F5F5F5] to-[#CBC8CA]"
						text-color="text-black">
					</Opciones>
				</div>
			</div>
		</Layout>
	</div>
</template>
<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Opciones from "../components/Global/Opciones.vue";
import adminUsuarios from "../assets/administrator/adminUsuarios.png";
import asignarJefe from "../assets/administrator/asignarJefe.png";
</script>
