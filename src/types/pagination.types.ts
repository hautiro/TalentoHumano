import { UserI } from "../modules/users/types/user.types";
import { asignacionI } from "../modules/bossAssignment/types/asignacion.type";

export interface PaginationI {
	page: number;
	total_rows: number;
	total_pages: number;
	next_page: number;
	prev_page: number;
}

export interface UserPaginateResponse {
	usersPages: {
		ok: boolean;
		pagination: PaginationI;
		users: UserI[];
	};
}
export interface AsignacionPaginateResponse {
	asignacionPages: {
		ok: boolean;
		pagination: PaginationI;
		AsignacionJefe: asignacionI[];
	};
}
