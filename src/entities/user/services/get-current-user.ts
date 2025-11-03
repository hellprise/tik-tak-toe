import { sessionService } from './session';
import { userRepository } from '../repositories/user';

export const getCurrentUser = async (getCookies?: () => Promise<string | undefined>) => {
	const { session } = await sessionService.verifySession(getCookies);
	return userRepository.getUser({ id: session.id });
};
