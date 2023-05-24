import { apiClient } from '$lib/api/UserApi.js';

export async function load({ cookies }) {
	const data = await apiClient.getAllUsers();
	console.log(data);
	// const { users } = data;
	// console.log(users);
	return { users: data };
}
