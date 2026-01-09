import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Tables
export const usersTable = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(), // Do not forget to hash!
	role: text('role', { enum: ['student', 'faculty', 'admin'] })
		.notNull()
		.default('student'),
	createdAt: integer('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const studentsTable = sqliteTable('students', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.notNull()
		.unique()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	tag: text('tag').notNull().unique()
});

export const categoriesTable = sqliteTable('categories', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	facultyId: integer('faculty_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});

export const submissionsTable = sqliteTable('submissions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	createdAt: integer('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categoriesTable.id, { onDelete: 'cascade' }),
	studentId: integer('student_id')
		.notNull()
		.references(() => studentsTable.id, { onDelete: 'cascade' }),
	reason: text('reason')
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
	categories: many(categoriesTable)
}));

export const categoriesRelations = relations(categoriesTable, ({ one }) => ({
	faculty: one(usersTable, {
		fields: [categoriesTable.facultyId],
		references: [usersTable.id]
	})
}));
