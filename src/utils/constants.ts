export const API_URL = `http://10.0.5.2:3002`;

export const return_image = (name: string) => {
	return API_URL + `/public/products/${name}`;
};
