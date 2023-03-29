import { paginate } from "../../../utils/functions";
import { PaginationI } from "../../../types/pagination.types";
export interface ResponseAusentismoI {
	GetTipoAusentismo: {
		ausentismo: TipoAusentismoI[];
		ok: boolean;
		message: string;
	};
}

export interface TipoAusentismoI {
	Code: number;
	Name: string;
}

export interface EmpleadoXJefeI {
	empID: number;
	NombreUsuario: string;
	CodEmp: number;
	jobTitle: string;
	nameDept: string;
}

export interface ResponseEmpleadoXJefeI {
	getEmpleadoXJefe: {
		ok: boolean;
		message: string;
		empleados: EmpleadoXJefeI[];
	};
}

export interface SetAusentismo {
	EmployeeID: number;
	FromDate: string;
	U_hora_desde: number;
	ToDate: string;
	U_hora_hasta: number;
	U_tipo_absent: number;
	ConfirmerNumber: number;
	Reason: string;
}
export interface Ausentismo {
	empID: number;
	fromDate: string;
	U_hora_desde: number;
	toDate: string;
	U_hora_hasta: number;
	U_tipo_absent: number;
	cnfrmrNum: number;
	reason: string;
}
export interface ResponseGetAusentismoI {
	GetAusentismo: {
		ok: boolean;
		message: string;
		ausentismo: Ausentismo[];
		pagination: PaginationI;
	};
}

export interface AusentismoR {
	DocNum: string;
	Mensaje: string;
}

export interface AusentismoResponse {
	Guardar_AbsentismoResult: AusentismoR;
}
