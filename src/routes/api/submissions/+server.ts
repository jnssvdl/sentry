import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { submissionsTable, studentsTable, categoriesTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const POST = async ({ request }) => {
	try {
		const { studentUserId, facultyUserId, categoryId } = await request.json();

		if (!studentUserId || !facultyUserId || !categoryId) {
			throw new Error('Missing required fields');
		}

		const [student] = await db
			.select()
			.from(studentsTable)
			.where(eq(studentsTable.userId, studentUserId))
			.limit(1);

		if (!student) {
			throw new Error('Student not found');
		}

		const [category] = await db
			.select()
			.from(categoriesTable)
			.where(eq(categoriesTable.id, categoryId))
			.limit(1);

		if (!category || category.facultyId !== facultyUserId) {
			throw new Error('Category not found or does not belong to the specified faculty');
		}

		const submission = await db.insert(submissionsTable).values({
			studentId: student.id,
			categoryId: category.id
		});

		return json({ success: true, submission });
	} catch (err) {
		console.error(err);
		throw error(400, 'Something went wrong');
	}
};
