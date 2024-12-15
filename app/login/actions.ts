'use server'

import { signIn } from '@/lib/auth';



export const submitCreds = (userName: string, password: string) => {
    console.log("testing")
    signIn('credentials', {
        userName:userName,
        password:password,
        redirectTo: '/', // Replace with your desired callback URL
      });
}