import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { is_auth } from "../utils/local-data";

import Home from "../pages/Home.vue";
import Auth from "../pages/Auth.vue";
import Users from "../modules/users/Users.vue";
import Administrator from "../pages/Administrator.vue";
import bossAssigment from "../modules/bossAssignment/bossAssigment.vue";
import Rrhh from "../pages/Rrhh.vue";
import AusentismoFather from "../modules/ausentismo/AusentismoFather.vue";
// import ProductList from "../pages/ListProduct.vue"
// import ClientsProduct from "../pages/ClientsProduct.vue";

const routes: RouteRecordRaw[] = [
	{
		name: "Home",
		path: "/",
		component: Home,
		meta: {
			required_auth: true,
		},
	},
	{
		name: "Auth",
		path: "/auth",
		component: Auth,
		meta: {
			required_auth: false,
		},
	},
	{
		name: "Users",
		path: "/users",
		component: Users,
		meta: {
			required_auth: true,
		},
	},
	{
		name: "Administrator",
		path: "/administration",
		component: Administrator,
		meta: {
			required_auth: true,
			roles:['Administrador','Jefe']
		},
	},
	{
		name: "AsignacionJefe",
		path: "/asignacion",
		component: bossAssigment,
		meta: {
			required_auth: true,
		},
	},
	{
		name: "Rrhh",
		path: "/RRHH",
		component: Rrhh,
		meta: {
			required_auth: true,
		},
	},
	{
		path: "/HomeAusentismo",
		component: AusentismoFather,
		meta: {
			required_auth: true,
		},
		children: [
			{
				path: "",
				name: "HomeAusentismo",
				component: () => import("../modules/ausentismo/HomeAusentismo.vue"),
			},
			{
				path: "/Ausentismo/:id",
				name: "Ausentismo",
				component: () => import("../modules/ausentismo/Ausentismo.vue"),
			},
		],
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

router.beforeEach((to, _, next) => {
	if (to.meta?.required_auth && !is_auth()) {
		return next("/auth");
	} else if (!to.meta?.required_auth && is_auth()) {
		return next("/");
	}
	return next();
});

export default router;
