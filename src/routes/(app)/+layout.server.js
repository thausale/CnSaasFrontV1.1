import { User } from '$lib/components/stores';
import { get } from 'svelte/store';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';

export function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		throw redirect(302, '/login');
	}

	try {
		const { payload } = jwt.verify(session, PRIVATE_SIGNATURE);
		const { firstName, lastName, email, role_data, id, company_id } = payload;
		const user = { firstName, lastName, email, id, company_id, role: role_data.role };

		return { role: payload.role_data.role, user };
	} catch (error) {
		throw redirect(302, '/login');
		//res.status(500).json({ status: 'failed', message: error.message });
	}
}
