'use client';

import { authClient } from '@/lib/auth-client';
import { registerSchema } from '@/lib/schemas/register';
import { flattenErrors } from '@/lib/utils/flattenErrors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthCard from '@/components/ui/AuthCard';
import FormField from '@/components/ui/FormField';
import SubmitButton from '@/components/ui/SubmitButton';

type FieldErrors = Partial<Record<'name' | 'email' | 'password', string>>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = registerSchema.safeParse(raw);
    if (!result.success) {
      setFieldErrors(flattenErrors<keyof FieldErrors>(result.error));
      return;
    }

    await authClient.signUp.email(
      {
        email: result.data.email,
        password: result.data.password,
        name: result.data.name,
        callbackURL: '/concerts',
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push('/concerts');
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  }

  const hasLength = password.length >= 8;

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join GigTrack and never miss a concert again."
      footer={{
        text: 'Already have an account?',
        linkText: 'Log In',
        href: '/login',
      }}
      error={error}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          label="Name"
          name="name"
          placeholder="Your name"
          error={fieldErrors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={fieldErrors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          error={fieldErrors.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <p
            className={`font-body mt-2 text-xs ${hasLength ? 'text-green-400' : 'text-gray-500'}`}
          >
            {hasLength ? '✓' : '○'} At least 8 characters
          </p>
        </FormField>
        <SubmitButton
          loading={loading}
          label="Create Account"
          loadingLabel="Creating Account..."
        />
      </form>
    </AuthCard>
  );
}
