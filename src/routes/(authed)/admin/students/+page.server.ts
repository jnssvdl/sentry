import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { usersTable, studentsTable } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { hashPassword, verifyPassword } from '$lib/server/auth/password.js';

export const load: PageServerLoad = async () => {
	const studentUsers = await db.select().from(usersTable).where(eq(usersTable.role, 'student'));

	return { studentUsers };
};

export const actions = {
	add: async ({ request }) => {
		const form = await request.formData();

		const firstName = form.get('first-name')?.toString();
		const lastName = form.get('last-name')?.toString();
		const email = form.get('email')?.toString();
		const tag = form.get('tag')?.toString();
		const username = form.get('username')?.toString();
		const password = form?.get('password')?.toString();
		const confirmPassword = form?.get('confirm-password')?.toString();

		if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !tag) {
			return fail(400, { missing: true });
		}

		const [emailExists] = await db.select().from(usersTable).where(eq(usersTable.email, email));

		if (emailExists) {
			return fail(400, { emailExists: true });
		}

		const [tagExists] = await db.select().from(studentsTable).where(eq(studentsTable.tag, tag));

		if (tagExists) {
			return fail(400, { tagExists: true });
		}

		const [usernameExists] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, username));

		if (usernameExists) {
			return fail(400, { usernameExists: true });
		}

		const hashed = await hashPassword(password);
		const valid = await verifyPassword(confirmPassword, hashed);

		if (!valid) {
			return fail(400, { mismatchPassword: true });
		}

		const [result] = await db
			.insert(usersTable)
			.values({ firstName, lastName, email, username, password: hashed, role: 'student' })
			.returning();

		await db.insert(studentsTable).values({ userId: result.id, tag });

		return { success: true };
	}
};
