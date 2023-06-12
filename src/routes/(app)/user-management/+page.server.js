import { UserApi } from '$lib/api/UserApi.js';
import { RoleController } from '$lib/api/RoleController.js';

export async function load({ cookies, fetch, depends }) {
	const [users, roles] = await Promise.all([
		UserApi.getAllUsers(fetch),
		RoleController.getAllRoles(fetch)
	]);

	depends('Users');
	return { users, roles };
}

// export const actions = {
// 	update: async ({ locals, request, cookies }) => {
// 		const formData = Object.fromEntries(await request.formData());
// 		const filteredFormData = {};
// 		Object.keys(formData).forEach((key) => {
// 			const value = formData[key].trim();
// 			if (value !== '') {
// 				filteredFormData[key] = value;
// 			}
// 		});
// 		console.log(filteredFormData);

// 		const response = await UserApi.editUser(filteredFormData);
// 		console.log(response);
// 		return response;
// 	}
// };
