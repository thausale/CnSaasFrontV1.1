import { User } from '$lib/components/stores';
import { get } from 'svelte/store';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';

export function load({ cookies }) {
	const session = cookies.get('session');

	try {
		const { payload } = jwt.verify(session, PRIVATE_SIGNATURE);
		const { firstName, lastName, email, role_data, id, company_id } = payload;
		const user = { firstName, lastName, email, id, company_id, role: role_data.role };

		return { role: payload.role_data.role, user };
	} catch (error) {
		return {
			status: 401,
			message: 'unauthorized',
			redirect: 'login'
		};
		//res.status(500).json({ status: 'failed', message: error.message });
	}
}
