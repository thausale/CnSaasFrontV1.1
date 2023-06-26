import { DataApi } from '$lib/api/DataApi.js';
import { RoleController } from '$lib/api/RoleController.js';

export async function load({ cookies, fetch, depends }) {
	const authorization = cookies.get('AuthenticationToken');

	const [entries, roles] = await Promise.all([
		DataApi.getData(authorization),
		RoleController.getAllRoles(fetch)
	]);

	return { entries, roles };
}
