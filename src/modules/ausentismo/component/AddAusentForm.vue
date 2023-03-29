<template>
	<div class="w-96 h-full">
		<form @submit="handle_submit">
			<div class="flex flex-col">
				<label class="text-gray-600 font-semibold text-xs">{{ Nombre }} </label>
			</div>
			<div class="flex flex-col mt-3">
				<SelecttipoAusentismo
					placeholder="Seleccione el tipo de ausentismo"
					@buscar="buscarTipoAusentismo"
					@seleccionado="TipoAusentismoSeleccionado"
					:TipoAusentismo="tipoAsentismo">
				</SelecttipoAusentismo>
			</div>
			<div class="flex flex-col mt-3 gap-2">
				<label class="text-gray-600 font-semibold text-xs"
					>Desde
					<RequiredField />
				</label>
				<div class="flex flex-row">
					<field
						type="date"
						name="FromDate"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
					</field>
					<error-message
						name="FromDate"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
					<field
						type="time"
						name="U_hora_desde"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
					</field>
					<error-message
						name="U_hora_desde"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
				</div>
			</div>
			<div class="flex flex-col mt-3 gap-2">
				<label class="text-gray-600 font-semibold text-xs"
					>Hasta
					<RequiredField />
				</label>
				<div class="flex flex-row">
					<field
						type="date"
						name="ToDate"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
					</field>
					<error-message
						name="ToDate"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
					<field
						type="time"
						name="U_hora_hasta"
						value="0"
						class="w-full border rounded bg-white py-3 px-2 mt-2 text-sm">
					</field>
					<error-message
						name="U_hora_hasta"
						class="text-xs font-semibold text-red-600 mt-2"></error-message>
				</div>
			</div>
			<div class="flex flex-col mt-3">
				<field
					type="text"
					name="Reason"
					placeholder="Comentarios"
					class="w-full border rounded py-3 px-2 mt-2 text-sm">
				</field>
				<error-message
					name="Reason"
					class="text-xs font-semibold text-red-600 mt-2"></error-message>
			</div>

			<button class="text-white w-full rounded mt-4 py-3 bg-[#1d3557]">
				Agregar Ausentismo
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
import SelecttipoAusentismo from "../component/SelecttipoAusentismo.vue";
import { UseAusentismoStore } from "../Ausentismo.store";
import { SetAusentismo, TipoAusentismoI } from "../types/ausentismo.type";
type Emits = {
	(Event: "hide-modal"): void;
};

interface pros {
	empId: number;
	jefeId: number;
}

const { empId, jefeId } = defineProps<pros>();

const emits = defineEmits<Emits>();

const tipoAusentismo_selected = ref<TipoAusentismoI>({
	Code: 0,
	Name: "",
});

const { getTipoAusentismo, getNombre, SetAusentismo } = UseAusentismoStore();
const { tipoAsentismo, Nombre } = storeToRefs(UseAusentismoStore());

const TipoAusentismoSeleccionado = (tipoAusentismo: TipoAusentismoI) => {
	tipoAusentismo_selected.value = tipoAusentismo;
};

const validation_schema = yup.object().shape({
	FromDate: yup.string().required("Debes Seleccionar la fecha desde"),
	ToDate: yup.string().required("Debes Seleccionar la fecha hasta"),
	U_hora_desde: yup.string().required("Debes seleccioanar el rol"),
	U_hora_hasta: yup.string().required("Debes seleccioanar la posicion"),
	Reason: yup.string().required("Debes seleccioanar la posicion"),
});

const { handleSubmit, resetForm } = useForm<SetAusentismo>({
	validationSchema: validation_schema,
});

const handle_submit = handleSubmit((values) => {
	resetForm();
	emits("hide-modal");
	const data_send = {
		...values,
		EmployeeID: empId,
		U_hora_desde: getHoraNumero(values.U_hora_desde.toString()),
		U_hora_hasta: getHoraNumero(values.U_hora_hasta.toString()),
		U_tipo_absent: tipoAusentismo_selected.value.Code,
		ConfirmerNumber: jefeId,
	};
	// console.log(data_send);
	SetAusentismo(data_send);
});

const getHoraNumero = (hora: string) => {
	let response = [];
	response = hora.split(":");
	return Number(response[0] + response[1]);
};

const buscarTipoAusentismo = (search: string) => {
	getTipoAusentismo(search);
};

onMounted(() => {
	getNombre(empId);
	getTipoAusentismo("");
});
</script>
