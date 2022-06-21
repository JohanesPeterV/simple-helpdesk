import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const role = req.headers.get('authorization');

  return NextResponse.next();
}
