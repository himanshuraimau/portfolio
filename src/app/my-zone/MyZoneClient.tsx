"use client";
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckSquare, MessageSquare } from 'lucide-react'

export default function MyZoneClient({ initialTodos, initialMessages }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(initialTodos)

  const addMessage = async (e) => {
    e.preventDefault()
    if (message.trim()) {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      })
      const newMessage = await response.json()
      setMessages([newMessage, ...messages])
      setMessage('')
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (todo.trim()) {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todo }),
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setTodo('')
    }
  }

  const toggleTodo = async (id, completed) => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, completed: !completed }),
    })
    const updatedTodo = await response.json()
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-3 lg:px-3 py-8 sm:py-12">
      <h2 className="font-mono text-2xl sm:text-3xl text-center text-cyan-800 dark:text-cyan-50 mb-8">
        My Zone
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Quick Todos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addTodo} className="flex gap-2 mb-4">
              <Input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a todo"
                className="flex-grow"
              />
              <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed === 1}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className={todo.completed === 1 ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Leave a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addMessage} className="space-y-4">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full"
              />
              <Button type="submit">Send Message</Button>
            </form>
            <div className="mt-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  {msg.text}
                  <div className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        .glow-effect {
          text-shadow: 0 0 4px rgba(34, 211, 238, 0.6);
        }
        .glow-effect:hover {
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  )
}