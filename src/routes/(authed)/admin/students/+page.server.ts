import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const studentUsers = await db.select().from(usersTable).where(eq(usersTable.role, 'student'));

	return { studentUsers };
};
