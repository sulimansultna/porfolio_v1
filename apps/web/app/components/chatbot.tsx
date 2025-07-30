"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export default function Chatbot({ isOpen, onClose, isMinimized, onToggleMinimize }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Suliman's AI assistant. I can help you learn about his experience, projects, and skills. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Tell me about his projects", "What are his skills?", "How can I contact him?", "His experience?"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const getBotResponse = (input: string): { text: string; suggestions?: string[] } => {
    const lowerInput = input.toLowerCase()

    // Projects related queries
    if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("portfolio")) {
      return {
        text: "Suliman has worked on several impressive projects:\n\n🏆 **Gas Level Detection & Auto Booking System** (Final Year Project Winner)\n- IoT-based smart solution using NodeMCU, gas sensors, and GSM modules\n- Real-time monitoring with Flutter mobile app integration\n\n📱 **E-Commerce Mobile App**\n- Full-featured shopping app with Stripe payment integration\n- Real-time inventory management and Nielsen's usability principles\n\n🎓 **Academy Portal App**\n- Educational platform with student enrollment and course tracking\n- Built with Flutter and Firebase for seamless performance",
        suggestions: ["Tell me more about the IoT project", "What technologies did he use?", "Can I see the code?"],
      }
    }

    // Skills and technology queries
    if (
      lowerInput.includes("skill") ||
      lowerInput.includes("technology") ||
      lowerInput.includes("tech") ||
      lowerInput.includes("flutter") ||
      lowerInput.includes("firebase")
    ) {
      return {
        text: "Suliman is highly skilled in modern mobile development:\n\n**Core Technologies:**\n• Flutter (95% proficiency) - Cross-platform mobile development\n• Firebase (90%) - Backend services, authentication, database\n• Dart (92%) - Primary programming language\n• IoT (85%) - NodeMCU, sensors, GSM modules\n\n**Additional Skills:**\n• Git & GitHub for version control\n• UI/UX Design following Nielsen's heuristics\n• RESTful APIs and JSON parsing\n• Stripe Payment Gateway integration\n• Agile methodology and team collaboration",
        suggestions: ["What about his IoT experience?", "His education background?", "Any certifications?"],
      }
    }

    // Experience and background
    if (
      lowerInput.includes("experience") ||
      lowerInput.includes("background") ||
      lowerInput.includes("internship") ||
      lowerInput.includes("job")
    ) {
      return {
        text: "Suliman has solid professional experience:\n\n**Current:** Freelance Mobile App Developer (Mar 2023 - Present)\n• Building cross-platform apps with Flutter\n• Full-stack solutions with Firebase integration\n• IoT system development\n\n**Previous:** Mobile App Developer Intern at TechNova Solutions\n• Worked on client-based mobile applications\n• Implemented Firebase features and responsive UI\n• Participated in agile development cycles\n\n**Education:** BS Computer Science from COMSATS University (2021-2025)\n• Recipient of Fully Funded Scholarship for Afghan Students\n• Final Year Project Winner",
        suggestions: ["What was his final year project?", "Tell me about his achievements", "His contact information?"],
      }
    }

    // Contact and hiring
    if (
      lowerInput.includes("contact") ||
      lowerInput.includes("hire") ||
      lowerInput.includes("email") ||
      lowerInput.includes("phone")
    ) {
      return {
        text: "Ready to connect with Suliman? Here's how:\n\n📧 **Email:** imsulimansultan@gmail.com\n📱 **Phone:** +92 342 1900926\n📍 **Location:** Abbottabad, KPK, Pakistan\n\n**Social Links:**\n• GitHub: github.com/sulimansultna\n• LinkedIn: linkedin.com/in/suliman-sultan-a8873a2a4\n\nHe's always open to discussing new opportunities, freelance projects, or innovative ideas!",
        suggestions: ["What's his availability?", "What type of projects does he prefer?", "His rates?"],
      }
    }

    // Education queries
    if (
      lowerInput.includes("education") ||
      lowerInput.includes("university") ||
      lowerInput.includes("degree") ||
      lowerInput.includes("comsats")
    ) {
      return {
        text: "Suliman has a strong educational foundation:\n\n🎓 **Bachelor of Science in Computer Science**\nCOMSATS University Islamabad – Abbottabad Campus (2021-2025)\n\n**Highlights:**\n• Fully Funded Scholarship recipient (Allama Iqbal Scholarship)\n• Completed 42 subjects covering core CS topics\n• Specialized in Flutter development and IoT systems\n• Final Year Project Winner for IoT innovation\n\n**Key Subjects:** Algorithms, Databases, Operating Systems, AI, Human-Computer Interaction",
        suggestions: ["What was his final year project?", "Any other achievements?", "His technical skills?"],
      }
    }

    // Languages
    if (lowerInput.includes("language") || lowerInput.includes("speak") || lowerInput.includes("communication")) {
      return {
        text: "Suliman is multilingual and can communicate effectively:\n\n🗣️ **Languages:**\n• **Pashto** - Native speaker\n• **Dari** - Native speaker\n• **English** - Fluent\n• **Urdu** - Fluent\n\nThis makes him an excellent choice for international projects and diverse team collaborations!",
        suggestions: ["His technical skills?", "Work experience?", "How to contact him?"],
      }
    }

    // Availability and rates
    if (
      lowerInput.includes("available") ||
      lowerInput.includes("rate") ||
      lowerInput.includes("cost") ||
      lowerInput.includes("price")
    ) {
      return {
        text: "Suliman is currently available for new projects!\n\n**Availability:** Open to freelance work and full-time opportunities\n**Preferred Projects:**\n• Mobile app development (Flutter)\n• IoT solutions and smart systems\n• Firebase backend integration\n• Cross-platform applications\n\n**Project Types:**\n• E-commerce applications\n• Educational platforms\n• IoT monitoring systems\n• Custom mobile solutions\n\nFor specific rates and project discussions, please contact him directly!",
        suggestions: ["How to contact him?", "What's his experience?", "See his projects"],
      }
    }

    // Default responses
    const defaultResponses = [
      {
        text: "That's an interesting question! Suliman is a passionate mobile app developer specializing in Flutter and Firebase. He's also experienced with IoT solutions. What specific aspect would you like to know more about?",
        suggestions: ["His projects", "Technical skills", "Contact information", "Work experience"],
      },
      {
        text: "I'd be happy to help you learn more about Suliman! He's a Computer Science graduate with expertise in mobile development and IoT innovation. What would you like to explore?",
        suggestions: ["Recent projects", "Education background", "How to hire him", "His achievements"],
      },
      {
        text: "Great question! Suliman combines technical expertise with creative problem-solving. He's built everything from IoT systems to e-commerce apps. What interests you most?",
        suggestions: ["IoT projects", "Mobile apps", "His skills", "Get in touch"],
      },
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (!textToSend) return

    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const response = getBotResponse(textToSend)
        const botResponse: Message = {
          id: Date.now() + 1,
          text: response.text,
          sender: "bot",
          timestamp: new Date(),
          suggestions: response.suggestions,
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card
        className={`w-96 bg-background border shadow-2xl transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[600px]"
        }`}
      >
        <CardHeader
          className="flex flex-row items-center justify-between space-y-0 pb-4 cursor-pointer"
          onClick={onToggleMinimize}
        >
          <CardTitle className="text-lg flex items-center">
            <div className="relative mr-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/profile-suliman.png" alt="Suliman Sultan" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm">
                  SS
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <div>
              <p className="font-semibold">Suliman's AI Assistant</p>
              <p className="text-xs text-muted-foreground font-normal">Ask me anything!</p>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleMinimize()
              }}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col p-0 h-[calc(600px-80px)]">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={`flex items-start space-x-2 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/images/profile-suliman.png" alt="Suliman Sultan" />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-line">{message.text}</div>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-slate-600 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>

                    {/* Suggestions */}
                    {message.sender === "bot" && message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-10">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2 bg-transparent hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/profile-suliman.png" alt="Suliman Sultan" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-sm">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Suliman's experience, projects, or skills..."
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={() => handleSendMessage()} disabled={isTyping || !inputValue.trim()} className="px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
