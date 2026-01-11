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
import { fail } from '@sveltejs/kit';
import { and } from 'drizzle-orm';

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

	const facultyCategories = await db
		.select({ id: categoriesTable.id, name: categoriesTable.name })
		.from(categoriesTable)
		.where(eq(categoriesTable.facultyId, facultyUser.id));

	return { facultySubmissions, facultyCategories };
};

export const actions = {
	create: async ({ request, locals }) => {
		const facultyUser = requireRole(locals, ['faculty']);
		const formData = await request.formData();
		const name = formData.get('name')?.toString();

		if (!name) {
			return fail(422, { name, missingName: true });
		}

		await db.insert(categoriesTable).values({ name: name, facultyId: facultyUser.id });

		return { success: true };
	},

	update: async ({ request, locals }) => {
		const facultyUser = requireRole(locals, ['faculty']);
		const formData = await request.formData();

		const id = formData.get('id')?.toString();
		const name = formData.get('name')?.toString();

		if (!id) {
			return fail(422, { missingId: true });
		}

		if (!name) {
			return fail(422, { missingName: true });
		}

		await db
			.update(categoriesTable)
			.set({ name })
			.where(
				and(eq(categoriesTable.id, Number(id)), eq(categoriesTable.facultyId, facultyUser.id))
			);

		return { id: Number(id), name };
	},

	delete: async ({ request, locals }) => {
		const facultyUser = requireRole(locals, ['faculty']);
		const formData = await request.formData();
		const id = formData.get('id')?.toString();

		if (!id) {
			return fail(422, { missingId: true });
		}

		await db
			.delete(categoriesTable)
			.where(
				and(eq(categoriesTable.id, Number(id)), eq(categoriesTable.facultyId, facultyUser.id))
			);

		return { success: true };
	}
};
