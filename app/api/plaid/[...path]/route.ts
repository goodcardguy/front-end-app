

// import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
const API_HOST = process.env.REACT_APP_API_HOST || 'https://aeiwkdklig.execute-api.us-west-1.amazonaws.com/dev';

export async function POST(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const session = await auth();
  // console.log('path', pathname);
  // console.log('req', request);

  let body:any = {};
  try {
    body = request.body ? await request.json() : null;
    // body = JSON.stringify(body)
  } catch (error) {
    console.error('Error parsing body:', error);
    body = {}
  }
  let headers = {}
  if (body){
    headers = {
      'Content-Type': 'application/json', // Ensure JSON is specified
    }
  } else{
    headers = {}

  }
  
  body['function'] = pathname.replace('/api/plaid/', '')

  body = JSON.stringify(body)
  // console.log('body', body);
  // console.log('api', API_HOST);

  // console.log(`${pathname.replace('/api/plaid/', '')}`);
  // console.log('head', request.headers);

  const response = await fetch(API_HOST, {
    method: 'POST',
    headers,
    body
  });

  // return NextResponse.json({ success: true, message: 'Hello from API!' });
  // console.log('test', response);
  const data = JSON.parse(await response.json()); // Parse the response from the external API
  // console.log("data",data)
  return NextResponse.json(data, {
    status: response.status
  });
}

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('path', pathname);

  return NextResponse.json({ success: true, message: 'Hello from API!' });
}
