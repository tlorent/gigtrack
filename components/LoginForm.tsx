'use client';

import { authClient } from '@/lib/auth-client';
import { loginSchema } from '@/lib/schemas/login';
import { flattenErrors } from '@/lib/utils/flattenErrors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthCard from '@/components/ui/AuthCard';
import FormField from '@/components/ui/FormField';
import SubmitButton from '@/components/ui/SubmitButton';

type FieldErrors = Partial<Record<'email' | 'password', string>>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = loginSchema.safeParse(raw);
    if (!result.success) {
      setFieldErrors(flattenErrors<keyof FieldErrors>(result.error));
      return;
    }

    await authClient.signIn.email(
      {
        email: result.data.email,
        password: result.data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.refresh();
          router.push('/concerts');
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      },
    );
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your GigTrack account."
      footer={{
        text: 'Don\u2019t have an account?',
        linkText: 'Sign up',
        href: '/register',
      }}
      error={error}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          placeholder="Your password"
          error={fieldErrors.password}
        />
        <SubmitButton
          loading={loading}
          label="Log In"
          loadingLabel="Logging in..."
        />
      </form>
    </AuthCard>
  );
}
