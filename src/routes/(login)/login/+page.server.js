import { apiClient } from '$lib/api/UserApi.js';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';

export const actions = {
	login: async ({ locals, request, cookies }) => {
		// Await the formdata
		const formData = Object.fromEntries(await request.formData());

		if (!formData.email || !formData.password) {
			return {
				data: formData,
				error: 'missing required field'
			};
		}

		const data = await apiClient.login(formData);
		if (data.error) {
			return fail(401, { error: 'wrong credentials' });
		}
		// console.log(data);
		if (!data.error) {
			cookies.set('AuthorizationToken', `Bearer ${data.plainTextToken}`, {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 8
			});
			const payload = data.user;
			const authToken = jwt.sign({ payload }, PRIVATE_SIGNATURE, { expiresIn: '8h' });
			cookies.set('session', authToken, { httpOnly: true, maxAxe: 60 * 60 * 8 });
			throw redirect(302, '/');
		}

		return { error: 'something went wrong' };
	}
};
