import { requireRole } from '$lib/server/auth/guards';

export const load = ({ locals }) => {
	requireRole(locals, ['faculty']);
};
