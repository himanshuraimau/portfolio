import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  const db = await getDb()
  const messages = await db.all('SELECT * FROM messages ORDER BY timestamp DESC')
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const { text } = await request.json()
  const db = await getDb()
  const result = await db.run('INSERT INTO messages (text) VALUES (?)', [text])
  const newMessage = await db.get('SELECT * FROM messages WHERE id = ?', result.lastID)
  return NextResponse.json(newMessage, { status: 201 })
}