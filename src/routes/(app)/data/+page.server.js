import { DataApi } from '$lib/api/DataApi.js';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';
import { serverEventHandler } from '$lib/helpers/serverEvents.js';

export async function load({ cookies, depends }) {
	// Get the session cookie
	const session = cookies.get('session');

	try {
		// Verify the session cookie
		const { payload } = jwt.verify(session, PRIVATE_SIGNATURE);

		// Get the data from the server
		const data = await DataApi.getData();

		return data;
	} catch (error) {
		if ((error.name = 'TokenExpiredError')) {
			// Redirect to login if token is expired
			throw redirect(302, '/login');
		} else {
			console.log('token verification failed');
		}
	}

	// The name for this load function to use in invalidating
	// After adding a new entry you can call invalidate("getData") to make this load run again
	depends('getData');
}

export const actions = {
	default: async ({ locals, request, cookies }) => {
		// Await the formdata
		const formData = Object.fromEntries(await request.formData());
		// console.log(formData);

		// Check for the required fields in the form
		if (!formData.name) {
			return { error: 'Name is needed' };
		}
		if (!formData.batch) {
			return { error: 'Batch is needed' };
		}

		//Get the session jwt from the cookies
		const session = cookies.get('session');

		try {
			const { id, firstName, lastName } = locals.user;
			const { batch, name, ...rest } = formData;
			const data = await DataApi.post(batch, name, rest, id);

			// Add a notification to all online users
			const message = `new data has been added by ${firstName} ${lastName}`;
			serverEventHandler.addNotification(message, 'operator');
			return { status: data.status, message: 'Data created! ' };
		} catch (error) {
			if ((error.name = 'TokenExpiredError')) {
				throw redirect(302, '/login');
			} else {
				console.log('token verification failed');
			}
		}

		return { error: 'something went wrong' };
	}
};
