import { deleteSession } from '$lib/server/auth/session.js';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (sessionId) {
		await deleteSession(sessionId);
	}

	cookies.delete('session', { path: '/' });

	throw redirect(303, '/login');
};
