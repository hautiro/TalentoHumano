import { PaginationI } from "../../../types/pagination.types";

export interface UserStateUpdate {
	updateEstado: {
		ok: boolean;
		message: string;
	};
}

export interface UserI {
	IdUsuario: number;
	NombreUsuario: string;
	ApellidoUsuario: string;
	Usuario: string;
	CreadoPor: string;
	CorreoUsuario: string;
	FechaCreacion: Date;
	FechaActualizacion: Date;
	Estado: boolean;
	Rol: {
		Id: number;
		Nombre: string;
	};
	Posicion: {
		IdPosicion?: number;
		NombrePosicion?: string;
	};
}

export interface RegisterUser {
	NombreUsuario: string;
	CorreoUsuario: string;
	Contrasenia: string;
	ReContrasenia?: string;
	RolId?: number;
	PosicionId?: number;
}

export interface GetUser {
	ok: boolean;
	user: UserI;
}

export interface ResponseRegisterUserI {
	createUser: {
		user: UserI;
		ok: boolean;
		message: string;
	};
}

export interface FindUserResponseI {
	BuscarUsuario: {
		newUsuario: string;
		ok: boolean;
	};
}

export interface UserTipoI {
	empId: number;
	NombreUsuario: string;
	ApellidoUsuario: string;
	Posicion: {
		NombrePosicion: string;
	};
}
