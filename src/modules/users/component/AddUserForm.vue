<template>
	<div class="w-[30vw] h-full">
		<form @submit="handle_submit">
			<div class="flex flex-col">
				<SelectEmp
					@buscar="buscar"
					@seleccionado="empleadoSeleccionado"
					:emp="emp">
				</SelectEmp>
				<input
					name="NombreUsuario"
					type="text"
					placeholder="Escribe el nombre de usuario"
					class="w-full border rounded py-3 px-2 mt-2 text-sm"
					v-model="newUser"
					disabled />
			</div>
			<div class="grid grid-cols-2 gap-2">
				<div class="flex flex-col mt-3">
					<field
						as="select"
						name="RolId"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
						<option :value="0" selected>--Selecciona el rol--</option>
						<option v-for="role in roles" :value="role.IdRol">
							{{ role.NombreRol }}
						</option>
					</field>
					<error-message
						name="RolId"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
				</div>
				<div class="flex flex-col mt-3">
					<field
						as="select"
						name="PosicionId"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
						<option :value="0" selected>--Selecciona la posicion--</option>
						<option v-for="posicion in posiciones" :value="posicion.IdPosicion">
							{{ posicion.NombrePosicion }}
						</option>
					</field>
					<error-message
						name="PosicionId"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
				</div>
			</div>

			<div class="flex flex-col mt-3">
				<field
					type="email"
					name="CorreoUsuario"
					placeholder="Escribe el correo de usuario"
					class="w-full border rounded py-3 px-2 mt-2 text-sm">
				</field>
				<error-message
					name="CorreoUsuario"
					class="text-xs font-semibold text-red-600 mt-2"></error-message>
			</div>
			<div class="flex flex-col mt-3">
				<field
					type="password"
					name="Contrasenia"
					placeholder="Escribe la contraseña de usuario"
					class="w-full border rounded py-3 px-2 mt-2 text-sm"></field>
				<error-message
					name="Contrasenia"
					class="text-xs font-semibold text-red-600 mt-2"></error-message>
			</div>
			<div class="flex flex-col mt-3">
				<field
					type="password"
					name="ReContrasenia"
					placeholder="Confirma la contraseña de usuario"
					class="w-full border rounded py-3 px-2 mt-2 text-sm"></field>
				<error-message
					name="ReContrasenia"
					class="text-xs font-semibold text-red-600 mt-2"></error-message>
			</div>
			<button
				class="text-white w-full rounded mt-4 py-3 bg-sky-600 hover:bg-sky-700">
				Crear Usuario
			</button>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import * as yup from "yup";
import RequiredField from "../../../components/Global/RequiredField.vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { EmployI } from "../types/Employ.type";
import { RegisterUser } from "../types/user.types";
import { UseUsersStore } from "../../users/users.store";
import { useRolesStore } from "../../../stores/roles.store";
import SelectEmp from "../../../components/Global/SelectEmp.vue";
import { usePosicionesStore } from "../../../stores/posiciones.store";
type Emits = {
	(Event: "hide-modal"): void;
};

const emits = defineEmits<Emits>();

const user_selected = ref<EmployI>({
	empID: 0,
	NombreUsuario: "",
	ApellidoUsuario: "",
	nCompleto: "",
	Usuario: "",
});

//llamada a los endPoint

const { CreateNewUser, find_user } = UseUsersStore();
const { newUser, emp } = storeToRefs(UseUsersStore());

const { get_all_roles } = useRolesStore();
const { roles } = storeToRefs(useRolesStore());

const { get_all_posiciones } = usePosicionesStore();
const { posiciones } = storeToRefs(usePosicionesStore());

const empleadoSeleccionado = (empleado: EmployI) => {
	user_selected.value = empleado;
	if (user_selected.value.Usuario) {
		find_user(user_selected.value.Usuario);
	}
};

const validation_schema = yup.object().shape({
	//NombreUsuario: yup.string().required("Debes escribir el nombre del usuario"),
	CorreoUsuario: yup
		.string()
		.email("Este correo es invalido")
		.required("Debes escribir el correo del usuario"),
	Contrasenia: yup.string().required("Debes escribir la contraseña"),
	ReContrasenia: yup
		.string()
		.required("Debes confirmar la contraseña")
		.oneOf([yup.ref("Contrasenia")], "Las contraseñas no coinciden"),
	RolId: yup
		.number()
		.required("Debes seleccioanar el rol")
		.typeError("Debes seleccionar el rol")
		.min(1, "Debes seleccionar el rol"),
	PosicionId: yup
		.number()
		.required("Debes seleccioanar la posicion")
		.typeError("Debes seleccionar la posicion")
		.min(1, "Debes seleccionar la posicion"),
});

const { handleSubmit, resetForm } = useForm<RegisterUser>({
	validationSchema: validation_schema,
});

const handle_submit = handleSubmit((values) => {
	resetForm();
	emits("hide-modal");

	const data_send = {
		...values,
		empId: user_selected.value.empID,
		NombreUsuario: user_selected.value.NombreUsuario,
		ApellidoUsuario: user_selected.value.ApellidoUsuario,
		Usuario: user_selected.value.Usuario,
		CreadoPor: "",
		Rol: {
			IdRol: values.RolId,
		},
		Posicion: {
			IdPosicion: values.PosicionId,
		},
	};
	delete data_send.ReContrasenia;
	delete data_send.RolId;
	delete data_send.PosicionId;
	// console.log(user_selected.value);
	CreateNewUser(data_send);
});

const buscar = (search: string) => {
	get_employ(search);
};

const { get_employ } = UseUsersStore();
onMounted(() => {
	get_employ("");
	get_all_posiciones();
	get_all_roles();
});
</script>
