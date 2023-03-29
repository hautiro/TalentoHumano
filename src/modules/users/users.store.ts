import { apolloClient } from "../../plugins/apollo-client";
import gql from "graphql-tag";
import { toast } from "../../plugins/sweetalert2";

import { defineStore } from "pinia";
import {
	UserI,
	RegisterUser,
	UserStateUpdate,
	ResponseRegisterUserI,
	FindUserResponseI,
} from "./types/user.types";
import {
	PaginationI,
	UserPaginateResponse,
} from "../../types/pagination.types";

import { EmployI, GetEmployI } from "./types/Employ.type";

export const UseUsersStore = defineStore("users", {
	state: () => ({
		users: [] as UserI[],
		pagination: {} as PaginationI,
		loading: false,
		emp: [] as EmployI[],
		newUser: "",
	}),
	actions: {
		//* crea un nuevo usuario
		CreateNewUser(data_user: RegisterUser) {
			apolloClient
				.mutate<ResponseRegisterUserI>({
					mutation: gql`
						mutation ($input: CreateUserInput!) {
							createUser(createUserInput: $input) {
								user {
									IdUsuario
									NombreUsuario
									ApellidoUsuario
									CorreoUsuario
									FechaCreacion
									Estado
									CreadoPor
								}
								ok
								message
							}
						}
					`,
					variables: {
						input: data_user,
					},
				})
				.then(({ data }) => {
					if (data!.createUser.ok) {
						this.get_users(1, "", "");
						toast({
							title: "Usuario creado con exito",
							icon: "success",
						});
					} else {
						toast({ title: data!.createUser.message, icon: "error" });
					}
				});
		},
		//* actualiza el estado
		update_state(id: number, page: number, search: string) {
			apolloClient
				.mutate<UserStateUpdate>({
					mutation: gql`
						mutation ($id: Float!) {
							updateEstado(id: $id) {
								ok
								message
							}
						}
					`,
					variables: { id },
				})
				.then(({ data }) => {
					if (data!.updateEstado.ok) {
						toast({
							title: data!.updateEstado.message,
							icon: "success",
						});
						this.get_users(page, search, "");
					}
				});
		},
		//* obtiene todos los usuarios
		get_users(page: number, search: string, rol: string) {
			this.loading = true;
			apolloClient
				.query<UserPaginateResponse>({
					query: gql`
						query ($Params: ParamsUsuariosI!) {
							usersPages(Params: $Params) {
								ok
								users {
									IdUsuario
									NombreUsuario
									ApellidoUsuario
									Usuario
									CorreoUsuario
									Estado
									FechaCreacion
									FechaActualizacion
									Rol {
										NombreRol
									}
									Posicion {
										NombrePosicion
									}
								}
								pagination {
									next_page
									prev_page
									page
									total_rows
									total_pages
								}
							}
						}
					`,
					variables: { Params: { page, search, rol } },
				})
				.then(({ data }) => {
					
					if (data!.usersPages.ok) {
						this.users = data?.usersPages.users;
						this.pagination = data?.usersPages.pagination;
					} else {
						this.users = [];
					}
					this.loading = false;
				});
		},
		//* obtiene todos los empleados desde SAP
		get_employ(search: string) {
			apolloClient
				.query<{ GetEmpSap: GetEmployI }>({
					query: gql`
						query ($search: String!) {
							GetEmpSap(search: $search) {
								message
								employe {
									empID
									NombreUsuario
									ApellidoUsuario
									nCompleto
									Usuario
								}
							}
						}
					`,
					variables: { search: search },
				})
				.then(({ data }) => {
					this.emp = data.GetEmpSap.employe;
				});
		},
		//* busca el usuario y si esxite crea uno nuevo agregando numero aleatorio del 1-9
		find_user(usuario: string) {
			apolloClient
				.query<FindUserResponseI>({
					query: gql`
						query ($usuario: String!) {
							BuscarUsuario(usuario: $usuario) {
								ok
								newUsuario
							}
						}
					`,
					variables: { usuario: usuario },
				})
				.then(({ data }) => {
					if (data.BuscarUsuario.ok) {
						this.newUser = data.BuscarUsuario.newUsuario;
					} else {
						this.newUser = usuario;
					}
				});
		},
	},
});
