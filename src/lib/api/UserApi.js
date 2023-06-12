import { User } from '$lib/components/stores';
import { get } from 'svelte/store';
import { PUBLIC_URI } from '$env/static/public';

class UserHandler {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	getId() {
		const user = get(User);
		return user.id;
	}

	async login(credentials) {
		const response = await fetch(`${this.baseURL}/login`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		return data;
	}

	async createUser(userData) {
		const response = await fetch(`${this.baseURL}/create-user`, {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		return data;
	}

	async getAllUsers(fetch) {
		const response = await fetch(`${this.baseURL}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		return data;
	}

	async editUser(body, id) {
		console.log(JSON.stringify(body));
		const response = await fetch(`${this.baseURL}/edit-user/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		// console.log(data);
		return data;
	}
}

export const UserApi = new UserHandler(PUBLIC_URI);
