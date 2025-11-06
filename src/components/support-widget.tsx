'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <Card className="w-80 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter your email" type="email" />
            <Input placeholder="Describe your issue" type="text" />
            <Button>Submit</Button>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)} className="shadow-lg">
          <HelpCircle className="mr-2 h-4 w-4" /> Support
        </Button>
      )}
    </div>
  );
}
