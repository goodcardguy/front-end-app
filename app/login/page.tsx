// 'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';
// import { useState } from 'react';
// import { submitCreds } from './actions';

export default function LoginPage() {
  // ? searchParams.get('callbackUrl')
  // : 'https://f4f5-98-97-35-218.ngrok-free.app'
  //console.log('next', next)

  // const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardFooter>
          <form
            action={async (e) => {
              'use server'
              await signIn('credentials', {
                userName:e.get('userName'),
                password:e.get('password'),
                redirectTo: '/', // Replace with your desired callback URL
              });
            }}
            className="w-full"
          >
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              // value={userName}
              // onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button
            // onClick={() => submitCreds(userName, password)}
            className="w-full"
          >
            Sign in
          </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
