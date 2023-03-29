import { EmployI } from "../../users/types/Employ.type";

export interface asignacionI {
	idAsignacion: number;
	empId: number;
	NombreEmpleado: string;
	JefeId: number;
	Estado: boolean;
	FechaCreacion: Date;
	FechaActualizacion: Date;
}

export interface asignacionStateUpdate {
	updateEstadoAsignacion: {
		ok: boolean;
		message: string;
		JefeId: number;
	};
}

export interface userTipoResponse {
	usuariosTipos: {
		ok: boolean;
		users: userTiposI[];
		message: string;
		posicion: string;
	};
}

export interface userTiposI {
	empId: number;
	NombreUsuario: string;
	ApellidoUsuario: string;
	nCompleto: string;
}

export interface RegisterAsignacionI {
	empId: number;
	NombreEmpleado: string;
	JefeId: number;
}

export interface ResponseRegisterAsignacionI {
	createAsignacion: {
		asignacion: asignacionI;
		ok: boolean;
		message: string;
	};
}
