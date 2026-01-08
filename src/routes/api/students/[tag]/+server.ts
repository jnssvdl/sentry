import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { studentsTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async ({ params }) => {
	const tag = params.tag;

	const [user] = await db
		.select({
			id: studentsTable.id,
			userId: usersTable.id,
			firstName: usersTable.firstName,
			lastName: usersTable.lastName,
			email: usersTable.email
		})
		.from(studentsTable)
		.leftJoin(usersTable, eq(studentsTable.userId, usersTable.id))
		.where(eq(studentsTable.tag, tag))
		.limit(1);

	if (!user) {
		return json({ error: 'Student not found' }, { status: 404 });
	}

	return json(user);
};
