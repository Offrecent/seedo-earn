'use client';
import { useState } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Paperclip, Send } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { useCollection } from '@/firebase/firestore/use-collection';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function ChatroomPage() {
  const { user, userData, loading: userLoading } = useUser();
  const { data: messages, loading: messagesLoading } = useCollection('chatMessages');
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !userData || !firestore) return;

    try {
      await addDoc(collection(firestore, 'chatMessages'), {
        userId: user.uid,
        username: userData.username,
        content: newMessage,
        createdAt: serverTimestamp(),
        flagged: false, // AI moderation function would update this
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Could not send message.");
    }
  };

  if (userLoading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-16 h-16 animate-spin" /></div>;
  }
  
  const sortedMessages = messages?.sort((a,b) => a.createdAt?.seconds - b.createdAt?.seconds);

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
                        <AvatarImage src={msg.user?.avatar} alt={msg.username} />
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
                        {msg.createdAt?.toDate().toLocaleTimeString()}
                    </p>
                  </div>
                   {msg.userId === user?.uid && (
                     <Avatar>
                        <AvatarImage src={userData?.avatar} alt={userData?.username} />
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
