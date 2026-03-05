import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Portfolio from '@/models/Portfolio'

// GET — public, used by portfolio page
export async function GET() {
  await connectDB()
  const items = await Portfolio.find().sort({ createdAt: -1 })
  return NextResponse.json({ items })
}

// POST — admin only, add new portfolio item
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, imageUrl, category, featured } = await req.json()
  if (!title || !imageUrl || !category)
    return NextResponse.json({ error: 'Title, image URL and category are required.' }, { status: 400 })

  await connectDB()
  const item = await Portfolio.create({ title, imageUrl, category, featured: featured || false })
  return NextResponse.json({ item }, { status: 201 })
}
