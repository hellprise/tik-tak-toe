import cuid from 'cuid';

import { left, right } from '@/shared/lib/either';

import { DEFAULT_RATING } from '../domain';
import { passwordService } from './password';
import { userRepository } from '../repositories/user';

export const createUser = async ({ login, password }: { login: string; password: string }) => {
	const userWithSameLogin = await userRepository.getUser({ login });

	if (userWithSameLogin) {
		return left('USER_LOGIN_EXISTS' as const);
	}

	const { hash, salt } = await passwordService.hashPassword(password);

	const user = await userRepository.saveUser({
		id: cuid(),
		login,
		rating: DEFAULT_RATING,
		passwordHash: hash,
		salt,
	});

	return right(user);
};
