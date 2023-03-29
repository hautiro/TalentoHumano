export interface LoginResponse {
	username: string;
	accessToken: string;
}

export interface LoginPayload {
	Usuario: string;
	Contrasenia: string;
}

export interface LoginStatus {
	login: {
		ok: boolean;
		accessToken: string;
		username: string;
		message: string;
		empId: number;
	};
}
