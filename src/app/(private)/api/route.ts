import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      env: process.env.DATABASE_URL,
    },
    { status: 200 },
  )
}
