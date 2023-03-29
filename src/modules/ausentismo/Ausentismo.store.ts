import { defineStore } from "pinia";
import { apolloClient } from "../../plugins/apollo-client";
import {
	Ausentismo,
	AusentismoResponse,
	EmpleadoXJefeI,
	ResponseAusentismoI,
	ResponseEmpleadoXJefeI,
	ResponseGetAusentismoI,
	SetAusentismo,
	TipoAusentismoI,
} from "./types/ausentismo.type";
import gql from "graphql-tag";
import { PaginationI } from "../../types/pagination.types";
import { toast } from "../../plugins/sweetalert2";

export const UseAusentismoStore = defineStore("ausentismo", {
	state: () => ({
		tipoAsentismo: [] as TipoAusentismoI[],
		empXJefe: [] as EmpleadoXJefeI[],
		AusentismoEmpleado: [] as Ausentismo[],
		pagAusentismoEmpleado: {} as PaginationI,
		loading: false,
		Nombre: "",
		totalPage: 0,
		totalRow: 0,
		cantidad: 0,
	}),
	actions: {
		getTipoAusentismo(search: string) {
			apolloClient
				.query<ResponseAusentismoI>({
					query: gql`
						query ($search: String!) {
							GetTipoAusentismo(search: $search) {
								ok
								ausentismo {
									Code
									Name
								}
							}
						}
					`,
					variables: { search: search },
				})
				.then(({ data }) => {
					if (data.GetTipoAusentismo.ok) {
						this.tipoAsentismo = data.GetTipoAusentismo.ausentismo;
					}
				});
		},
		getEmpXJefe(search: string, JefeId: number) {
			apolloClient
				.query<ResponseEmpleadoXJefeI>({
					query: gql`
						query ($Params: ParamsEmpXjefe!) {
							getEmpleadoXJefe(Params: $Params) {
								ok
								empleados {
									empID
									CodEmp
									NombreUsuario
									jobTitle
									nameDept
								}
								message
							}
						}
					`,
					variables: { Params: { search, JefeId } },
				})
				.then(({ data }) => {
					if (data.getEmpleadoXJefe.ok) {
						this.empXJefe = data.getEmpleadoXJefe.empleados;
					}
				});
		},
		clearAusentismo() {
			this.AusentismoEmpleado = [];
		},
		getAusentismo(page: number, search: string, empId: number) {
			console.log(page);
			this.loading = true;
			apolloClient
				.query<ResponseGetAusentismoI>({
					query: gql`
						query ($Params: ParamsAusentismo!) {
							GetAusentismo(Params: $Params) {
								ok
								ausentismo {
									empID
									fromDate
									toDate
									reason
									cnfrmrNum
									U_hora_desde
									U_hora_hasta
									U_tipo_absent
								}
								pagination {
									page
									total_rows
									total_pages
									next_page
									prev_page
								}
							}
						}
					`,
					variables: { Params: { page, search, empId } },
				})
				.then(({ data }) => {
					const { total_pages, total_rows } = data.GetAusentismo.pagination;
					const { ausentismo } = data.GetAusentismo;

					if (data.GetAusentismo.ok) {
						this.AusentismoEmpleado = [
							...this.AusentismoEmpleado,
							...ausentismo,
						];
						this.totalPage = total_pages;
						this.totalRow = total_rows;
						this.cantidad = this.AusentismoEmpleado.length;
					} else {
					}
					console.log(this.AusentismoEmpleado);
					this.loading = false;
				});
		},
		getNombre(Id: number) {
			apolloClient
				.query({
					query: gql`
						query ($Id: Float!) {
							GetNombreSap(Id: $Id) {
								nCompleto
							}
						}
					`,
					variables: { Id },
				})
				.then(({ data }) => {
					this.Nombre = data.GetNombreSap.nCompleto;
				});
		},
		SetAusentismo(ausentismo: SetAusentismo) {
			this.loading = true;
			apolloClient
				.mutate<{ endpoint_soap: AusentismoResponse }>({
					mutation: gql`
						mutation ($params: CreateAusentismoInput!) {
							endpoint_soap(params: $params) {
								Guardar_AbsentismoResult {
									DocNum
									Mensaje
								}
							}
						}
					`,
					variables: { params: ausentismo },
				})
				.then(({ data }) => {
					const { DocNum, Mensaje } =
						data!.endpoint_soap.Guardar_AbsentismoResult;
					toast({
						title: "Ausentismo creado con exito",
						icon: "success",
					});
					this.loading = false;
				});
		},
	},
});
