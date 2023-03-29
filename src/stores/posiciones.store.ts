import { defineStore } from "pinia";
import { apolloClient } from "../plugins/apollo-client";
import gql from "graphql-tag";
import { toast } from "../plugins/sweetalert2";
import { PosicionI, PosicionesI } from "../types/posiciones.types";

export const usePosicionesStore = defineStore("Posiciones", {
	state: () => ({
		posiciones: [] as PosicionI[],
	}),
	actions: {
		async get_all_posiciones() {
			apolloClient
				.query<PosicionesI>({
					query: gql`
						query {
							positions {
								IdPosicion
								NombrePosicion
							}
						}
					`,
				})
				.then(({ data }) => {
					console.log(data);
					this.posiciones = data.positions;
				})
				.catch(() => {
					toast({ title: "Ah ocurrido un error inesperado", icon: "error" });
				});
		},
	},
});
