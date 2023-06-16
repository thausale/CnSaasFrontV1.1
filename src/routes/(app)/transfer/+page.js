import { DataApi } from '$lib/api/DataApi.js';
import { RoleController } from '$lib/api/RoleController.js';

export async function load({ cookies, fetch, depends }) {
	const [entries, roles] = await Promise.all([
		DataApi.getData(),
		RoleController.getAllRoles(fetch)
	]);

	return { entries, roles };
}
