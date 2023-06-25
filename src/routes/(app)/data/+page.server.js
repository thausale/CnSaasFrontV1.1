import { DataApi } from '$lib/api/DataApi.js';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';
// import { serverEventHandler } from '$lib/helpers/serverEvents.js';
import { NotificationsController } from '$lib/api/NotificationsController.js';
import { invalidate } from '$app/navigation';

export async function load({ cookies, depends }) {
	const authorization = cookies.get('AuthenticationToken');

	try {
		// Get the data from the server
		const data = await DataApi.getData(authorization);

		return data;
	} catch (error) {
		console.log(error);
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

		try {
			// Extract user details from locals
			const { id, firstName, lastName } = locals.user;
			// Extract batch and name from formData, and store the rest in the 'rest' variable
			const { batch, name, ...rest } = formData;
			// Call the DataApi.post method with the extracted data and user id
			const data = await DataApi.post(batch, name, rest, id);
			if (data.status != 201) {
				return { error: 'something wrong' };
			}
			// Add a notification to all online users
			const message = `new data has been added by ${firstName} ${lastName}`;
			// console.log(message);

			const serverResponse = await NotificationsController.postNotification('1', message);

			// Return a success message with the status and a message
			return { status: data.status, message: 'Data created! ' };
		} catch (error) {
			console.log(error);
			return { error: 'something went wrong' };
		}
	}
};
