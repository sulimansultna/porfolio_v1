"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Home, User, Settings, BarChart3, FileText, Moon, Sun, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import MinimalisticDashboard3D from "./components/minimalistic-3d"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Suliman's AI assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const { theme, setTheme } = useTheme()

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Suliman specializes in Flutter development and IoT solutions.",
        "I'd be happy to help you learn more about Suliman's projects and experience.",
        "Suliman has extensive experience with Firebase, Dart, and mobile app development.",
        "Would you like to know more about any specific project or technology?",
      ]

      const botResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputValue("")
  }

  const sidebarItems = [
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "overview", icon: Home, label: "Overview" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "projects", icon: FileText, label: "Projects" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Nielsen Heuristic 4: Consistency and standards */}
      <div className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Suliman Sultan</h1>
          <p className="text-sm text-muted-foreground">Developer Dashboard</p>
        </div>

        <nav className="flex-1 p-4" role="navigation" aria-label="Dashboard navigation">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeTab === item.id ? "page" : undefined}
              >
                <item.icon className="mr-3 h-4 w-4" aria-hidden="true" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-300 hover:scale-105"
                aria-label="Return to main portfolio"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-all duration-300 hover:scale-110 hover:rotate-12"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-500" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Nielsen Heuristic 1: Visibility of system status */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" aria-label="Current status: Online">
              Online
            </Badge>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Suliman Sultan profile picture" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {activeTab === "chat" && (
            <div className="h-full flex flex-col">
              {/* Minimalistic 3D Background */}
              <div className="absolute inset-0 z-0 opacity-20">
                <MinimalisticDashboard3D />
              </div>

              <ScrollArea className="flex-1 p-6 relative z-10">
                <div className="space-y-4 max-w-3xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-4 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className="text-xs opacity-70 mt-2"
                          aria-label={`Message sent at ${message.timestamp.toLocaleTimeString()}`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything about Suliman's work..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                      aria-label="Type your message here"
                    />
                    <Button onClick={handleSendMessage} aria-label="Send message">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="p-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Gas Detection, E-commerce, Academy Portal</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">6+</div>
                      <p className="text-xs text-muted-foreground">Core skills</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Specialization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">IoT + Mobile</div>
                      <p className="text-xs text-muted-foreground">Flutter & Firebase</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">CS Graduate</div>
                      <p className="text-xs text-muted-foreground">Computer Science</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
                        <div>
                          <p className="font-medium">Completed Gas Level Detection & Auto Booking System</p>
                          <p className="text-sm text-muted-foreground">IoT project with NodeMCU and GSM integration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
                        <div>
                          <p className="font-medium">Launched Academy Portal App</p>
                          <p className="text-sm text-muted-foreground">Educational platform with course management</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true"></div>
                        <div>
                          <p className="font-medium">Applied Nielsen's Heuristics to Portfolio</p>
                          <p className="text-sm text-muted-foreground">Enhanced UX following usability principles</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab !== "chat" && activeTab !== "overview" && (
            <div className="p-6 flex items-center justify-center h-full">
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle className="capitalize">{activeTab}</CardTitle>
                  <CardDescription>This section is coming soon!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The {activeTab} section is currently under development. Check back soon for updates!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
