export interface EmployI {
	empID: number;
	NombreUsuario: string;
	ApellidoUsuario: string;
	nCompleto: string;
	Usuario?: string;
}

export interface GetEmployI {
	message: string;
	employe: EmployI[];
}
