'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { routes } from '@/kernel/routes';

import { sessionService, verifyUserPassword } from '@/entities/user/server';

export type SignInFormState = {
	formData?: FormData;
	errors?: {
		login?: string;
		password?: string;
		_errors?: string;
	};
};

const formDataSchema = z.object({
	login: z.string().min(3),
	password: z.string().min(3).max(20),
});

export const signInAction = async (
	_state: SignInFormState,
	formData: FormData
): Promise<SignInFormState> => {
	const data = Object.fromEntries(formData.entries());
	const result = formDataSchema.safeParse(data);

	if (!result.success) {
		const formatedErrors = result.error.format();
		return {
			formData,
			errors: {
				login: formatedErrors.login?._errors.join(', '),
				password: formatedErrors.password?._errors.join(', '),
				_errors: formatedErrors._errors.join(', '),
			},
		};
	}

	const verifyUserResult = await verifyUserPassword(result.data);

	if (verifyUserResult.type === 'right') {
		await sessionService.addSession(verifyUserResult.value);

		redirect(routes.home);
	}

	const errors = {
		WRONG_LOGIN_OR_PASSWORD: 'Wrong login or password',
	}[verifyUserResult.error];

	return {
		formData,
		errors: {
			_errors: errors,
		},
	};
};
