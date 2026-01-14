import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { hashPassword, verifyPassword } from '$lib/server/auth/password.js';

export const load: PageServerLoad = async () => {
	const facultyUsers = await db.select().from(usersTable).where(eq(usersTable.role, 'faculty'));

	return { facultyUsers };
};

export const actions = {
	add: async ({ request }) => {
		const form = await request.formData();

		const firstName = form.get('first-name')?.toString();
		const lastName = form.get('last-name')?.toString();
		const email = form.get('email')?.toString();
		const username = form.get('username')?.toString();
		const password = form?.get('password')?.toString();
		const confirmPassword = form?.get('confirm-password')?.toString();

		if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
			return fail(400, { missing: true });
		}

		const [emailExists] = await db.select().from(usersTable).where(eq(usersTable.email, email));

		if (emailExists) {
			return fail(400, { emailExists: true });
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

		await db
			.insert(usersTable)
			.values({ firstName, lastName, email, username, password: hashed, role: 'faculty' });

		return { success: true };
	}
};
