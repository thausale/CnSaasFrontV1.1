import { get } from 'svelte/store';
import { PUBLIC_URI } from '$env/static/public';

class RoleApi {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async getAllRoles(fetch) {
		const response = await fetch(`${this.baseURL}/roles`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		return data;
	}

	// async createUser(userData) {
	// 	const response = await fetch(`${this.baseURL}/create-user`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(userData),
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	});

	// 	const data = await response.json();
	// 	return data;
	// }

	// async editUser(field, value) {
	// 	const id = this.getId();

	// 	const obj = { field, value };
	// 	const response = await fetch(`${this.baseURL}/edit-user/${id}`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(obj),
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	});

	// 	const data = await response.json();
	// 	// console.log(data);
	// 	return data;
	// }
}

export const RoleController = new RoleApi(PUBLIC_URI);
