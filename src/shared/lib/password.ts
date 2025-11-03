export const removePassword = <T extends { passwordHash: string }>(
	user: T
): Omit<T, 'passwordHash'> => {
	const { passwordHash: _, ...rest } = user;
	return rest;
};
