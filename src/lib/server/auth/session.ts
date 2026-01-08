import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { sessionsTable } from '../db/schema';
import { db } from '../db';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: number) {
	const sessionId = randomUUID();

	await db.insert(sessionsTable).values({
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + SESSION_DURATION_MS)
	});

	return sessionId;
}

export async function getSession(sessionId: string) {
	const [session] = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId));

	if (!session) return null;
	if (session.expiresAt < new Date()) return null;

	return session;
}

export async function deleteSession(sessionId: string) {
	await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}
