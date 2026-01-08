// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Role } from '$lib/server/auth/roles';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				email: string;
				role: Role;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
