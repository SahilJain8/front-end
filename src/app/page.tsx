'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function DevHomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Development Navigation</CardTitle>
          <CardDescription>
            Use these links to navigate to different parts of the application during development.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/chat" passHref>
            <Button className="w-full justify-between">
              <span>Go to Chat Interface</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/login" passHref>
            <Button variant="outline" className="w-full justify-between">
               <span>Go to Login Page</span>
               <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button variant="outline" className="w-full justify-between">
              <span>Go to Sign-up Page</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
