import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const bucketList = [
  { text: "learn to play the guitar", completed: false },
  { text: "travel to a different state", completed: true },
  { text: "start a company", completed: false },
  { text: "visit a beach", completed: true },
  { text: "learn to code", completed: true },
  { text: "be a one day wedding photographer", completed: false },
  { text: "learn to swim", completed: false },
  { text: "see kashmir", completed: false },
  { text: "see kerla", completed: true },
];

const List = () => {
  return (
    <div className="min-h-screen text-foreground flex justify-center p-4">
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
              <li
                key={index}
                className="text-base sm:text-lg flex items-center space-x-2 py-1"
              >
                <div className="flex-shrink-0 w-5 h-5 text-center font-bold">
                  {item.completed ? "✓" : "✗"}
                </div>
                <span
                  className={`flex-grow ${
                    item.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.text || "Untitled"}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default List;
