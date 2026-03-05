import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'

// GET — public
export async function GET() {
  await connectDB()
  const services = await Service.find().sort({ order: 1 })
  return NextResponse.json({ services })
}

// POST — admin only
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, description, icon, order } = await req.json()
  if (!name || !description)
    return NextResponse.json({ error: 'Name and description are required.' }, { status: 400 })

  await connectDB()
  const service = await Service.create({ name, description, icon: icon || '✦', order: order || 0 })
  return NextResponse.json({ service }, { status: 201 })
}
