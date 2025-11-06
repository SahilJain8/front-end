import { Logo } from '@/components/icons/logo';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-background flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        {/* Decorative spheres */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-black rounded-full opacity-50 blur-2xl" />
        <div className="absolute -bottom-32 -right-10 w-96 h-96 bg-black rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-black rounded-full opacity-30 blur-2xl" />

        <div className="z-10 flex flex-col items-center">
          <div className="mb-6 bg-black text-white p-5 rounded-full">
            <Logo className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Flowting.ai</h1>
          <p className="text-muted-foreground text-lg">
            Where every chat becomes a workflow.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-card">
        {children}
      </div>
    </div>
  );
}
