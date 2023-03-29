<template>
	<div class="flex flex-col w-full">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div
					class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-[#1d3557]">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									No.
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Tipo Ausentismo
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Fecha Desde
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Hora Desde
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Fecha Hasta
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Hora Hasta
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
									Comentarios
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr v-for="(ausentismo, index) in ausentismos">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">{{ index + 1 }}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ ausentismo.U_tipo_absent }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ new Date(ausentismo.fromDate).toLocaleDateString() }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ ausentismo.U_hora_desde }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ new Date(ausentismo.toDate).toLocaleDateString() }}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ ausentismo.U_hora_hasta }}
									</div>
								</td>

								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{{ ausentismo.reason }}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Ausentismo } from "../types/ausentismo.type";

interface Props {
	ausentismos: Ausentismo[];
}

const { ausentismos } = defineProps<Props>();
</script>
