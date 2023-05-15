import { User } from '$lib/components/stores';
import { get } from 'svelte/store';

class UserApi {
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

	async editUser(field, value) {
		const id = this.getId();

		const obj = { field, value };
		const response = await fetch(`${this.baseURL}/edit-user/${id}`, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		console.log(data);
		return data;
	}
}

export const apiClient = new UserApi('http://localhost/api');
