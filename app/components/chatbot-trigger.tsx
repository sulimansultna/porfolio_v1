"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Chatbot from "./chatbot"

export default function ChatbotTrigger() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggleChat = () => {
    if (isChatOpen && !isMinimized) {
      setIsChatOpen(false)
      setIsMinimized(false)
    } else {
      setIsChatOpen(true)
      setIsMinimized(false)
    }
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
    setIsMinimized(false)
  }

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              onClick={handleToggleChat}
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-purple-600"
              aria-label="Open chat with Suliman's AI assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping pointer-events-none"></div>

            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Component */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        isMinimized={isMinimized}
        onToggleMinimize={handleToggleMinimize}
      />
    </>
  )
}
