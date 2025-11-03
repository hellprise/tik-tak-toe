'use client';

import { routes } from '@/kernel/routes';

import { useActionState } from '@/shared/lib/react';

import { SignUpFormState, signUpAction } from '../actions/sign-up';
import { AuthFormLayout } from '../ui/auth-form-layout';
import { ErrorMessage } from '../ui/error-message';
import { AuthFields } from '../ui/fields';
import { BottomLink } from '../ui/link';
import { SubmitButton } from '../ui/submit-button';

export function SignUpForm() {
	const [formState, action, isPending] = useActionState(signUpAction, {} as SignUpFormState);

	return (
		<AuthFormLayout
			title="Sign Up"
			description="Create your account to get started"
			action={action}
			fields={<AuthFields {...formState} />}
			actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
			error={<ErrorMessage error={formState.errors?._errors} />}
			link={<BottomLink text="Already have an account?" linkText="Sign in" url={routes.signIn} />}
		/>
	);
}
