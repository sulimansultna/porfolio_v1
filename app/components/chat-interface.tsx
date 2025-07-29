"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatInterfaceProps {
  onClose: () => void
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Suliman's AI assistant. How can I help you learn more about his work and experience?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputValue("")
  }

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("experience") || lowerInput.includes("work")) {
      return "Suliman has over 5 years of professional development experience, specializing in full-stack web development with modern technologies like React, Next.js, and Three.js."
    }

    if (lowerInput.includes("skills") || lowerInput.includes("technology")) {
      return "His core skills include React, TypeScript, Next.js, Three.js, Node.js, and Python. He's particularly passionate about creating immersive 3D web experiences."
    }

    if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
      return "Suliman has worked on various projects including e-commerce platforms with 3D visualization, AI chat applications, and interactive dashboards. Check out the Projects tab for more details!"
    }

    if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
      return "You can reach Suliman at suliman.sultan@email.com or through the contact form. He's always open to discussing new opportunities and exciting projects!"
    }

    return "That's a great question! Suliman is a versatile developer who loves tackling challenging projects. Is there something specific about his background or skills you'd like to know more about?"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] bg-slate-800 border-slate-700 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white flex items-center">
            <Bot className="mr-2 h-5 w-5 text-purple-400" />
            Chat with Suliman's AI
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-purple-600 text-white" : "bg-slate-700 text-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-600 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Suliman's experience..."
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
