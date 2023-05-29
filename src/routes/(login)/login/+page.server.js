import { apiClient } from '$lib/api/UserApi.js';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';

/* This code exports an object named `actions` with a single property named `login`. The `login`
property is an asynchronous function that takes an object with three parameters: `locals`,
`request`, and `cookies`. */
export const actions = {
	login: async ({ locals, request, cookies }) => {
		// Await the formdata
		const formData = Object.fromEntries(await request.formData());

		/* This code block is checking if the `formData` object has values for both `email` and `password`
	properties. If either of these properties is missing, it returns an object with `data` property set
	to the `formData` object and an `error` property set to the string `'missing required field'`. */
		if (!formData.email || !formData.password) {
			return {
				data: formData,
				error: 'missing required field'
			};
		}

		/* This code is making a request to the `login` method of an API client (`apiClient`) and passing in
	the `formData` object as a parameter. The response from the API is stored in the `data` variable.
	If the `data` object has an `error` property, it returns a 401 HTTP error response with an error
	message. */
		const data = await apiClient.login(formData);
		if (data.error) {
			return fail(401, { error: 'wrong credentials' });
		}

		/* This code block is setting two cookies (`AuthorizationToken` and `session`) with specific values
	and options. It is also throwing a redirect to the homepage with a 302 status code. The
	`AuthorizationToken` cookie is set with the value of `Bearer ${data.plainTextToken}` and has
	options for `httpOnly`, `path`, and `maxAge`. The `session` cookie is set with a value generated by
	signing a payload object with a private signature and has options for `httpOnly` and `maxAge`. */
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
