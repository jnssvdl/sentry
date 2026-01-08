import type { Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getSession } from './lib/server/auth/session';
import { usersTable } from './lib/server/db/schema';
import { db } from './lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	event.locals.user = null;

	if (sessionId) {
		const session = await getSession(sessionId);

		if (session) {
			const [user] = await db
				.select({
					id: usersTable.id,
					email: usersTable.email,
					role: usersTable.role
				})
				.from(usersTable)
				.where(eq(usersTable.id, session.userId));

			if (user) {
				event.locals.user = user;
			} else {
				event.cookies.delete('session', { path: '/' });
			}
		} else {
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};
