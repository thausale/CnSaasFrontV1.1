import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	// console.log(event);

	if (event.url.pathname == '/login') {
		return resolve(event);
	}

	const session = event.cookies.get('session');
	// console.log(session);

	if (!session) {
		throw redirect(302, '/login');
	}

	// event.locals.hook = 'testing hook data';

	try {
		const { payload } = jwt.verify(session, PRIVATE_SIGNATURE);
		const { firstName, lastName, email, role_data, id } = payload;
		event.locals.user = { firstName, lastName, email, id, role: role_data.name };
		event.locals.role = role_data.name;
		return resolve(event);
	} catch (error) {
		// throw redirect(302, '/login');
		console.log(error);
		return { error: 'unverified' };
	}
};
