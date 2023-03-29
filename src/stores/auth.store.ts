import { isAxiosError } from "axios";
import { defineStore } from "pinia";
import { LoginPayload, LoginStatus } from "../types/auth.types";
import {
	get_token,
	is_auth,
	save_local,
	delete_token,
} from "../utils/local-data";
import { useRouter } from "vue-router";
import router from "../routes/router";
import { apolloClient } from "../plugins/apollo-client";
import gql from "graphql-tag";
import { toast } from "../plugins/sweetalert2";

export const UseAuthStore = defineStore("auth", {
	state: () => ({
		token: get_token(),
		empId: 0,
		isAuth: is_auth(),
		NombreLogueado: "",
	}),
	actions: {
		MakeLoggout() {
			delete_token();
			this.isAuth = false;
			this.token = null;
			router.push("/auth");
		},
		async login_mutation(values: LoginPayload) {
			const data = (
				await apolloClient.mutate<LoginStatus>({
					mutation: gql`
						mutation ($input: LoginUserDto!) {
							login(makeLogin: $input) {
								accessToken
								ok
								message
								empId
							}
						}
					`,
					variables: { input: values },
				})
			).data;

			if (!data!.login.ok) {
				toast({ title: data!.login.message, icon: "error" });
				return;
			}
			this.saveToken(data!.login.accessToken, data!.login.empId);
		},
		saveToken(token: string, empId: number) {
			this.token = token;
			this.empId = empId;
			save_local(token, empId.toString());
			router.push("/");
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
					this.NombreLogueado = data.GetNombreSap.nCompleto;
				});
		},
	},
});
