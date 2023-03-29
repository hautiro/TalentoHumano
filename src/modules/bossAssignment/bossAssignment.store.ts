import { apolloClient } from "../../plugins/apollo-client";
import gql from "graphql-tag";
import { toast } from "../../plugins/sweetalert2";
import { defineStore } from "pinia";
import { UserI } from "../users/types/user.types";
import {
	AsignacionPaginateResponse,
	PaginationI,
} from "../../types/pagination.types";
import {
	RegisterAsignacionI,
	ResponseRegisterAsignacionI,
	asignacionI,
	asignacionStateUpdate,
	userTipoResponse,
	userTiposI,
} from "./types/asignacion.type";

export const useAsignacionStore = defineStore("asignacion", {
	state: () => ({
		pagination: {} as PaginationI,
		loading: false,
		asignaciones: [] as asignacionI[],
		jefes: [] as userTiposI[],
		empleados: [] as userTiposI[],
	}),
	actions: {
		get_asignacion(page: number, search: string, jefeId: number) {
			this.loading = true;
			console.log(page + " search: " + search + " id: " + jefeId);
			apolloClient
				.query<AsignacionPaginateResponse>({
					query: gql`
						query ($Params: ParamsAsignacionI!) {
							asignacionPages(Params: $Params) {
								ok
								AsignacionJefe {
									idAsignacion
									empId
									JefeId
									NombreEmpleado
									Estado
									FechaActualizacion
								}
								pagination {
									next_page
									prev_page
									page
									total_rows
									total_pages
								}
								message
							}
						}
					`,
					variables: { Params: { page, search, jefeId } },
				})
				.then(({ data }) => {
					if (data!.asignacionPages.ok) {
						this.asignaciones = data?.asignacionPages.AsignacionJefe;
						this.pagination = data?.asignacionPages.pagination;
					} else {
						this.asignaciones = [];
						this.pagination = {
							page: 0,
							total_rows: 0,
							total_pages: 0,
							nex_page: 0,
							prev_page: 0,
						};
					}
					this.loading = false;
				});
		},
		update_Estado(id: number, page: number, search: string) {
			apolloClient
				.mutate<asignacionStateUpdate>({
					mutation: gql`
						mutation ($id: Float!) {
							updateEstadoAsignacion(id: $id) {
								ok
								message
								JefeId
							}
						}
					`,
					variables: { id },
				})
				.then(({ data }) => {
					if (data?.updateEstadoAsignacion.ok) {
						toast({
							title: data!.updateEstadoAsignacion.message,
							icon: "success",
						});
						this.get_asignacion(
							page,
							search,
							data.updateEstadoAsignacion.JefeId
						);
					}
				});
		},
		getUsuarioJefe(nombre: string, posicion: string = "Jefe") {
			this.loading = true;
			apolloClient
				.query<userTipoResponse>({
					query: gql`
						query ($Params: ParamsUsuariosTiposI!) {
							usuariosTipos(Params: $Params) {
								ok
								users {
									empId
									NombreUsuario
									ApellidoUsuario
									nCompleto
								}
								message
								posicion
							}
						}
					`,
					variables: { Params: { nombre, posicion } },
				})
				.then(({ data }) => {
					console.log(data);
					if (data!.usuariosTipos.ok) {
						if (data.usuariosTipos.users) {
							this.jefes = data.usuariosTipos.users;
						}
					} else {
					}
					this.loading = false;
				});
		},
		getUsuarioEmpleado(nombre: string, posicion: string = "Empleado") {
			this.loading = true;
			apolloClient
				.query<userTipoResponse>({
					query: gql`
						query ($Params: ParamsUsuariosTiposI!) {
							usuariosTipos(Params: $Params) {
								ok
								users {
									empId
									NombreUsuario
									ApellidoUsuario
									nCompleto
								}
								message
								posicion
							}
						}
					`,
					variables: { Params: { nombre, posicion } },
				})
				.then(({ data }) => {
					console.log(data);
					if (data!.usuariosTipos.ok) {
						this.empleados = data.usuariosTipos.users;
					} else {
					}
					this.loading = false;
				});
		},
		set_Asignacion(data_asignacion: RegisterAsignacionI) {
			apolloClient
				.mutate<ResponseRegisterAsignacionI>({
					mutation: gql`
						mutation ($input: CreateAsignacionJefeInput!) {
							createAsignacion(createAsignacionInput: $input) {
								asignacion {
									idAsignacion
									empId
									NombreEmpleado
									JefeId
									FechaCreacion
									FechaActualizacion
									Estado
								}
								ok
								message
							}
						}
					`,
					variables: { input: data_asignacion },
				})
				.then(({ data }) => {
					console.log(data);
					if (data?.createAsignacion.ok) {
						this.get_asignacion(1, "", data.createAsignacion.asignacion.JefeId);
						toast({
							title: "Asignacion creada con exito",
							icon: "success",
						});
					} else {
						toast({ title: data!.createAsignacion.message, icon: "error" });
					}
				});
		},
	},
});
