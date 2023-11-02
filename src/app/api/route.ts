"use server";

import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await kv.scan(0);
  return NextResponse.json(data[1]);
}
