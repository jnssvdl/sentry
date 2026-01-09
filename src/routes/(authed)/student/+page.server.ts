import { requireRole } from '$lib/server/auth/guards';
import { db } from '$lib/server/db/index.js';
import { categoriesTable, submissionsTable, usersTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const studentUser = requireRole(locals, ['student']);

	const submissions = await db
		.select({
			submissionId: submissionsTable.id,
			reason: submissionsTable.reason,
			createdAt: submissionsTable.createdAt,
			categoryId: categoriesTable.id,
			categoryName: categoriesTable.name,
			facultyId: usersTable.id,
			facultyFirstName: usersTable.firstName,
			facultyLastName: usersTable.lastName,
			facultyEmail: usersTable.email
		})
		.from(submissionsTable)
		.innerJoin(categoriesTable, eq(submissionsTable.categoryId, categoriesTable.id))
		.innerJoin(usersTable, eq(categoriesTable.facultyId, usersTable.id))
		.where(eq(submissionsTable.studentId, studentUser.id));

	return { submissions };
};
