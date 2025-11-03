'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { routes } from '@/kernel/routes';

import { createUser } from '@/entities/user/server';
import { sessionService } from '@/entities/user/services/session';

type SignUpFormErrors = {
	login?: string;
	password?: string;
	_errors?: string;
};

export type SignUpFormState = {
	formData?: FormData;
	errors?: SignUpFormErrors;
};

const formDataSchema = z.object({
	login: z.string().min(3),
	password: z.string().min(3).max(20),
});

export const signUpAction = async (
	_state: SignUpFormState,
	formData: FormData
): Promise<SignUpFormState> => {
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

	const createUserResult = await createUser(result.data);

	if (createUserResult.type === 'right') {
		await sessionService.addSession(createUserResult.value);

		redirect(routes.home);
	}

	const errors = {
		USER_LOGIN_EXISTS: 'User with this login already exists',
	}[createUserResult.error];

	return {
		formData,
		errors: {
			_errors: errors,
		},
	};
};
