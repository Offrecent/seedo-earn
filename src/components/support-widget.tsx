'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageSquare, Send, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const widgetVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleOpen}
          variant="default"
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <HelpCircle className="h-8 w-8" />}
          <span className="sr-only">Toggle Support Widget</span>
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={widgetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm"
          >
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>Seedo Support</span>
                </CardTitle>
                <CardDescription>
                  Welcome to Seedo Customer Service! How may I help, or would you like to contact WhatsApp support?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <Phone className="h-4 w-4" />
                        Contact WhatsApp
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                        <a href="mailto:seedo.earn@gmail.com">
                            <Mail className="h-4 w-4" />
                            Email Support
                        </a>
                    </Button>
                </div>
                 <div className="flex-1 p-4 border rounded-lg h-48 overflow-y-auto bg-muted/50">
                    <p className="text-sm text-muted-foreground">AI chat placeholder...</p>
                </div>
              </CardContent>
              <CardFooter>
                 <form className="flex w-full items-center gap-2">
                    <Input placeholder="Type your message..." />
                    <Button type="submit" size="icon">
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
