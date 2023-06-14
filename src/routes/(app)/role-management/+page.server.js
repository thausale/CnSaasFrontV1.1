import { UserApi } from '$lib/api/UserApi.js';
import { RoleController } from '$lib/api/RoleController.js';

export async function load({ cookies, fetch, depends }) {
	const roles = RoleController.getAllRoles(fetch);

	depends('Roles');
	return { roles };
}
