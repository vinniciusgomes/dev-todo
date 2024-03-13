import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function POST(request: NextRequest) {
  const req = await request.json()

  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.tag.create({
    data: {
      color: req.color,
      name: req.name,
      user: { connect: { email: session.user.email } },
    },
  })

  return NextResponse.json({ status: 201 })
}

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const where: Prisma.TagWhereInput = {
    user: { email: session?.user?.email },
  }

  const result = await prisma.tag.findMany({
    where,
  })

  return NextResponse.json(result, { status: 200 })
}
