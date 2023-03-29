import { defineStore } from "pinia";
import { RoleI, RolesI } from "../types/roles.types";
import { apolloClient } from "../plugins/apollo-client";
import gql from "graphql-tag";
import { toast } from "../plugins/sweetalert2";

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [] as RoleI[],
  }),
  actions: {
    async get_all_roles() {
      apolloClient
        .query<RolesI>({
          query: gql`
            query {
              roles {
                IdRol
                NombreRol
              }
            }
          `,
        })
        .then(({ data }) => {
          this.roles = data.roles;
        })
        .catch(() => {
          toast({ title: "Ah ocurrido un error inesperado", icon: "error" });
        });
    },
  },
});
