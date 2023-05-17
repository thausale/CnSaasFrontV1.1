import { User } from '$lib/components/stores';
import { get } from 'svelte/store';
import jwt from 'jsonwebtoken';
import { PRIVATE_SIGNATURE } from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';

export function load({ cookies }) {
	const session = cookies.get('session');

	try {
		const claims = jwt.verify(session, PRIVATE_SIGNATURE);
		console.log(claims);
		return { role: claims.payload.role_data.role };
	} catch (error) {
		return {
			status: 401,
			message: 'unauthorized',
			redirect: 'login'
		};
		//res.status(500).json({ status: 'failed', message: error.message });
	}
}
