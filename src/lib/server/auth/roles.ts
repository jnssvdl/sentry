export const ROLES = ['admin', 'faculty', 'student'] as const;

export type Role = (typeof ROLES)[number];
