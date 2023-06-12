import { UserApi } from '$lib/api/UserApi.js';
import { RoleController } from '$lib/api/RoleController.js';

export async function load({ cookies, fetch }) {
	const [users, roles] = await Promise.all([
		UserApi.getAllUsers(fetch),
		RoleController.getAllRoles(fetch)
	]);

	return { users, roles };
}
