import { redirect, error } from '@sveltejs/kit';
import type { Role } from './roles';

export function requireAuth(locals: App.Locals) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	return locals.user;
}

export function requireRole(locals: App.Locals, roles: Role[]) {
	const user = requireAuth(locals);

	if (!roles.includes(user.role)) {
		throw error(403, 'Forbidden');
	}

	return user;
}
