export function load({ locals }) {
	const { user, role } = locals;

	return { role, user };
}
