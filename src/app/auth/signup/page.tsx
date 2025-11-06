'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GoogleLogo } from '@/components/icons/google-logo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the sign-up logic (API call, etc.)
    // On success, you might redirect to a confirmation page or directly to the app
    router.push('/');
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Access your intelligent workspace</h2>
        <p className="mt-2 text-muted-foreground">
          Sign up to design, connect, and automate your AI systems, all in one place.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" name="first-name" autoComplete="given-name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" name="last-name" autoComplete="family-name" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone number</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <select
                id="country-code"
                name="country-code"
                className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
              >
                <option>US +1</option>
                <option>CA +1</option>
                <option>EU +44</option>
              </select>
            </div>
            <Input id="phone-number" name="phone-number" type="tel" className="pl-24" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Checkbox id="terms" required />
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-muted-foreground">
                By creating an account, I agree to our{' '}
                <Link href="#" className="font-medium text-primary hover:underline">
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-medium text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <Checkbox id="marketing" />
            <div className="ml-3 text-sm">
              <label htmlFor="marketing" className="text-muted-foreground">
                By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions.
              </label>
            </div>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div>
        <Button variant="outline" className="w-full">
          <GoogleLogo className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
