"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFlow } from "@genkit-ai/next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bot,
  CircleUser,
  Loader2,
  Mail,
  MessageSquarePlus,
  Send,
  X,
} from "lucide-react";
import { aiAssistantHandler, type AiAssistantInput } from "@/ai/flows/ai-powered-support-chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const WHATSAPP_SUPPORT_LINK = "https://chat.whatsapp.com/your-group-link";
const SUPPORT_EMAIL = "seedo.earn@gmail.com";

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [flow] = useFlow(aiAssistantHandler);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: "Welcome to Seedo Customer Service! How may I help you, or would you like to contact WhatsApp support?",
        },
      ]);
    }
    scrollToBottom();
  }, [open, messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const flowInput: AiAssistantInput = {
      userId: "mock-user-id", // Replace with actual user ID
      message: input,
    };

    try {
        const response = await flow(flowInput);
        if(response) {
            const aiMessage: Message = { sender: "ai", text: response.response };
            setMessages((prev) => [...prev, aiMessage]);
        }
    } catch (error) {
        const errorMessage: Message = { sender: "ai", text: "Sorry, I'm having trouble connecting. Please try again later." };
        setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        >
          {open ? <X className="h-8 w-8"/> : <MessageSquarePlus className="h-8 w-8" />}
          <span className="sr-only">Open Support Chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 rounded-lg border-2 p-0 sm:w-96"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-[60vh] flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">Seedo Support</h3>
          </div>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                        {msg.sender === 'ai' && <Avatar className="w-8 h-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>}
                        <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm", msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            {msg.text}
                        </div>
                         {msg.sender === 'user' && <Avatar className="w-8 h-8"><AvatarFallback><CircleUser/></AvatarFallback></Avatar>}
                    </div>
                ))}
                {flow.running && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="w-8 h-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin"/> Typing...
                        </div>
                    </div>
                )}
            </div>
          </ScrollArea>
          <div className="border-t p-2 space-y-2">
            <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={WHATSAPP_SUPPORT_LINK} target="_blank" rel="noopener noreferrer">Contact WhatsApp</a>
                </Button>
                 <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={`mailto:${SUPPORT_EMAIL}`}>Email Support</a>
                </Button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={flow.running}
              />
              <Button type="submit" size="icon" disabled={flow.running || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
