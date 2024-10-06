import { getDb } from '@/lib/db'
import MyZoneClient from './MyZoneClient'

export default async function MyZone() {
  const db = await getDb()
  const todos = await db.all('SELECT * FROM todos')
  const messages = await db.all('SELECT * FROM messages ORDER BY timestamp DESC')

  return <MyZoneClient initialTodos={todos} initialMessages={messages} />
}