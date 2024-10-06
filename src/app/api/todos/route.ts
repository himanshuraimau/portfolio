import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  const db = await getDb()
  const todos = await db.all('SELECT * FROM todos')
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { text } = await request.json()
  const db = await getDb()
  const result = await db.run('INSERT INTO todos (text, completed) VALUES (?, ?)', [text, 0])
  const newTodo = await db.get('SELECT * FROM todos WHERE id = ?', result.lastID)
  return NextResponse.json(newTodo, { status: 201 })
}

export async function PUT(request: Request) {
  const { id, completed } = await request.json()
  const db = await getDb()
  await db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id])
  const updatedTodo = await db.get('SELECT * FROM todos WHERE id = ?', id)
  return NextResponse.json(updatedTodo)
}