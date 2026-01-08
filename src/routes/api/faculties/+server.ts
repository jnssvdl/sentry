import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async () => {
	const result = await db.query.usersTable.findMany({
		where: eq(usersTable.role, 'faculty'),
		columns: {
			id: true,
			firstName: true,
			lastName: true,
			email: true
		},
		with: {
			categories: {
				columns: {
					id: true,
					name: true
				}
			}
		}
	});

	return json(result);
};
