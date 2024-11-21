import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const bucketList = [
  { text: 'Learn to play the guitar', completed: false },
  { text: 'Travel to different State', completed: true },
  // Add more items here to reach 100
]

const List = () => {
  return (
    <div className='min-h-screen bg-background text-foreground flex justify-center  p-4'>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">List 100</CardTitle>
          <CardDescription>
            Things I want to do before I die. Here's my progress so far!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            {bucketList.map((item, index) => (
              <li key={index} className="text-base sm:text-lg flex items-center space-x-2 py-1">
                <div className={`flex-shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center ${item.completed ? 'bg-primary border-primary' : 'border-input'}`}>
                  {item.completed && <Check className="h-4 w-4 text-primary-foreground" />}
                </div>
                <span className={`flex-grow ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

export default List

