import { requireRole } from '$lib/server/auth/guards';
import { db } from '$lib/server/db';
import {
	categoriesTable,
	studentsTable,
	submissionsTable,
	usersTable
} from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const facultyUser = requireRole(locals, ['faculty']);

	const facultySubmissions = await db
		.select({
			submissionId: submissionsTable.id,
			createdAt: submissionsTable.createdAt,
			reason: submissionsTable.reason,
			categoryId: categoriesTable.id,
			categoryName: categoriesTable.name,
			studentTag: studentsTable.tag,
			studentFirstName: usersTable.firstName,
			studentLastName: usersTable.lastName,
			studentEmail: usersTable.email
		})
		.from(submissionsTable)
		.innerJoin(categoriesTable, eq(submissionsTable.categoryId, categoriesTable.id))
		.innerJoin(studentsTable, eq(submissionsTable.studentId, studentsTable.id))
		.innerJoin(usersTable, eq(studentsTable.userId, usersTable.id))
		.where(eq(categoriesTable.facultyId, facultyUser.id));

	return { facultySubmissions };
};
