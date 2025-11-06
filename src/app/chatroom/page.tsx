'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Send } from 'lucide-react';

export default function ChatroomPage() {
  const messages: any[] = [
    // {
    //   id: 1,
    //   user: { name: 'Admin', avatar: '/avatars/01.png' },
    //   text: 'Welcome to the Seedo chatroom! Feel free to discuss tasks, share tips, or ask questions.',
    //   time: '10:00 AM',
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Global Chatroom</h1>
            <p className="text-muted-foreground">
              Connect with the Seedo community.
            </p>
          </div>

          <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {messages.length > 0 ? messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.isCurrentUser ? 'justify-end' : ''
                  }`}
                >
                  {!msg.isCurrentUser && (
                     <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-xs md:max-w-md ${
                      msg.isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {!msg.isCurrentUser && (
                        <p className="text-xs font-semibold mb-1">{msg.user.name}</p>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70'} text-right`}>
                        {msg.time}
                    </p>
                  </div>
                   {msg.isCurrentUser && (
                     <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )) : (
                <div className="text-center text-muted-foreground p-8">
                    <p>No messages yet. Be the first to start a conversation!</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-muted/50 border-t">
              <form className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                   <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
