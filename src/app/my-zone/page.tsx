import { Book, BookOpen, ExternalLink, Lightbulb, Wrench, Code2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const learningTopics = [
  { name: "ML", url: "https://youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&si=paz51QiBiwvbZMTJ" },
  { name: "React Native", url: "https://frontendmasters.com/courses/react-native-v3/" },
]

const workingOnProjects = [
  { name: "College Nexus", url: "https://collegenexus.tech" },
  { name: "Opal", url: "https://github.com/himanshuraimau/opal-webprodigies" },
]

const offbeat = [
  { name: "Code forces", url: "https://codeforces.com/profile/enghimanshu" },
  { name: "LeetCode", url: "https://leetcode.com/u/himanshuraimau9/" },
  { name: "Kaggel", url: "https://www.kaggle.com/enghimanshu" },
]

const academicReading = [
  { name: "Data Structures and Algorithms", url: "https://www.geeksforgeeks.org/data-structures/" },
  { name: "Understanding and Using C Pointers", url: "https://www.amazon.in/Understanding-Using-Pointers-Richard-Reese/dp/9351101398/ref=sr_1_3?s=books&sr=1-3" },
  { name: "Operating Systems", url: "https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X" },
  { name: "Computer Organization", url: "https://www.flipkart.com/computer-organization-5th/p/itmfbe3mzyvzbuhr" },
]

const nonAcademicReading = [
  { name: "The Pragmatic Programmer", url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
]

const importantLinks = [
  { name: "C", url: "https://plume-recorder-e10.notion.site/C-113b34f4d07e80cf909ec16f0ef90631?pvs=4" },
]

export default function MyZone() {
  return (
    <div className="min-h-screen container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">My Zone</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800/30 dark:to-purple-900/30 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800 dark:text-purple-100">
              <Lightbulb className="mr-2" />
              Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="text-purple-900 dark:text-purple-100">
            <ul className="space-y-2">
              {learningTopics.map((topic, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={topic.url} className="hover:underline transition-colors duration-200 hover:text-purple-600 dark:hover:text-purple-300">
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800/30 dark:to-blue-900/30 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800 dark:text-blue-100">
              <Wrench className="mr-2" />
              Working On
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 dark:text-blue-100">
            <ul className="space-y-2">
              {workingOnProjects.map((project, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={project.url} className="hover:underline transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-500/60 dark:to-blue-700/30 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800 dark:text-blue-100">
              <Code2 className="mr-2" />
              Offbeat
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-900 dark:text-blue-100">
            <ul className="space-y-2">
              {offbeat.map((beat, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={beat.url} className="hover:underline transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-200">
                    {beat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/40 dark:to-green-700/70 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800 dark:text-green-100">
              <BookOpen className="mr-2" />
              Academic Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-900 dark:text-green-100">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {academicReading.map((book, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={book.url} className="hover:underline transition-colors duration-200 hover:text-green-600 dark:hover:text-green-300 line-clamp-1">
                    {book.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-500/40 dark:to-yellow-800/40 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-100">
              <Book className="mr-2" />
              Non-Academic Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-900 dark:text-yellow-100">
            <ul className="space-y-2">
              {nonAcademicReading.map((book, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={book.url} className="hover:underline transition-colors duration-200 hover:text-yellow-600 dark:hover:text-yellow-300">
                    {book.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-500/40 dark:to-red-800/40 dark:bg-gradient-to-br dark:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800 dark:text-red-100">
              <ExternalLink className="mr-2" />
              Important Links
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-900 dark:text-red-100">
            <ul className="space-y-2">
              {importantLinks.map((link, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  <Link href={link.url} className="hover:underline transition-colors duration-200 hover:text-red-600 dark:hover:text-red-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

