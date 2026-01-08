import { verifyPassword } from '$lib/server/auth/password.js';
import { createSession } from '$lib/server/auth/session.js';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
};

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username')?.toString();
		const password = form.get('password')?.toString();

		if (!username || !password) {
			return fail(400, { error: 'Missing credentials' });
		}

		const [user] = await db.select().from(usersTable).where(eq(usersTable.username, username));

		console.log(user);

		if (!user) {
			return fail(400, { error: 'Invalid credentials' });
		}

		const valid = await verifyPassword(password, user.password);
		if (!valid) {
			return fail(400, { error: 'Invalid credentials' });
		}

		const sessionId = await createSession(user.id);

		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: import.meta.env.PROD,
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		const redirectMap = {
			admin: '/admin',
			faculty: '/faculty',
			student: '/student'
		} as const;

		throw redirect(303, redirectMap[user.role]);
	}
};
