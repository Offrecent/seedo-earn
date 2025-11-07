'use client';
import { useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Paperclip, Send } from 'lucide-react';

export default function ChatroomPage() {
  const [newMessage, setNewMessage] = useState('');
  
  // Placeholder data
  const user = { uid: 'current-user-id', username: 'You' }; 
  const userData = { username: 'You' };
  const userLoading = false;
  
  const [messages, setMessages] = useState([
    { id: '1', userId: 'other-user-1', username: 'Alice', content: 'Hey everyone!', createdAt: { toDate: () => new Date(Date.now() - 60000 * 5) } },
    { id: '2', userId: 'other-user-2', username: 'Bob', content: 'What\'s up?', createdAt: { toDate: () => new Date(Date.now() - 60000 * 4) } },
    { id: '3', userId: user.uid, username: user.username, content: 'Just checking out the chat.', createdAt: { toDate: () => new Date(Date.now() - 60000 * 3) } },
  ]);
  const messagesLoading = false;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !userData) return;
    
    const newMessageObj = {
      id: `${Date.now()}`,
      userId: user.uid,
      username: userData.username,
      content: newMessage,
      createdAt: { toDate: () => new Date() },
    };

    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage('');
  };

  if (userLoading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-16 h-16 animate-spin" /></div>;
  }
  
  const sortedMessages = messages?.sort((a,b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime());

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
              {messagesLoading ? (
                <div className="text-center text-muted-foreground p-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                </div>
              ) : sortedMessages && sortedMessages.length > 0 ? sortedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.userId === user?.uid ? 'justify-end' : ''
                  }`}
                >
                  {msg.userId !== user?.uid && (
                     <Avatar>
                        <AvatarFallback>{msg.username?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-xs md:max-w-md ${
                      msg.userId === user?.uid
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.userId !== user?.uid && (
                        <p className="text-xs font-semibold mb-1">{msg.username}</p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.userId === user?.uid ? 'text-primary-foreground/70' : 'text-muted-foreground/70'} text-right`}>
                        {msg.createdAt.toDate().toLocaleTimeString()}
                    </p>
                  </div>
                   {msg.userId === user?.uid && (
                     <Avatar>
                        <AvatarFallback>{userData?.username?.charAt(0).toUpperCase()}</AvatarFallback>
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
              <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                   <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={!user}
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim() || !user}>
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
