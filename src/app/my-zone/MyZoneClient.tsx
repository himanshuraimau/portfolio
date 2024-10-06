"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckSquare, MessageSquare, Trash2, Plus } from 'lucide-react';

// Define types for props
interface Todo {
  id: string;
  text: string;
  completed: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
}

interface MyZoneClientProps {
  initialTodos: Todo[];
  initialMessages: Message[];
}

export default function MyZoneClient({ initialTodos, initialMessages }: MyZoneClientProps) {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });
      const newMessage: Message = await response.json();
      setMessages([newMessage, ...messages]);
      setMessage('');
    }
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todo }),
      });
      const newTodo: Todo = await response.json();
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const toggleTodo = async (id: string, completed: number) => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, completed: !completed }),
    });
    const updatedTodo: Todo = await response.json();
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-3xl sm:text-4xl text-center mb-12">
          My Zone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                <CheckSquare className="h-6 w-6" />
                Quick Todos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addTodo} className="flex gap-2 mb-6">
                <Input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="Add a todo"
                  className="flex-grow bg-white/50 dark:bg-gray-700/50"
                />
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Plus className="h-5 w-5" />
                </Button>
              </form>
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li key={todo.id} className="flex items-center gap-3 bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={todo.completed === 1}
                      onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="rounded text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className={`flex-grow ${todo.completed === 1 ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                <MessageSquare className="h-6 w-6" />
                Leave a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addMessage} className="space-y-4">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full bg-white/50 dark:bg-gray-700/50 resize-none"
                  rows={4}
                />
                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                  Send Message
                </Button>
              </form>
              <div className="mt-6 space-y-4 max-h-80 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-800 dark:text-gray-200">{msg.text}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
