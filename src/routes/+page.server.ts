import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const redirectMap = {
		admin: '/admin',
		faculty: '/faculty',
		student: '/student'
	} as const;

	throw redirect(303, redirectMap[locals.user.role]);
};
