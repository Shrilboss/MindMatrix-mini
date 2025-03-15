
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AIChatbotProps {
  expanded: boolean;
  fixed?: boolean;
  onToggle: () => void;
}

const AIChatbot = ({ expanded, fixed = false, onToggle }: AIChatbotProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{
    id: number;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }[]>([
    {
      id: 1,
      content: "Hello! I'm your MindMatrix AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  // For demo purposes, let's add a welcome message specific to certain pages if fixed is true
  useEffect(() => {
    if (fixed && messages.length === 1) {
      setTimeout(() => {
        setMessages([
          ...messages,
          {
            id: 2,
            content: fixed ? 
              "I see you're exploring our learning pathway. Would you like recommendations based on your career interests in AI and Data Science?" 
              : "I can help you find information about any of our programs or answer questions about your learning journey.",
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    }
  }, [fixed, messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      content: input,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've found some great resources related to your question about AI learning paths.",
        "Based on your interests, I recommend checking out our Machine Learning certification.",
        "Your progress is impressive! You're ahead of 75% of peers in completing Python modules.",
        "I see you haven't attempted the latest assessment. Would you like to schedule that now?",
        "The upcoming workshop on Data Visualization would complement your current learning path perfectly."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      }]);
    }, 1000);
  };

  if (!expanded) {
    return (
      <Button 
        onClick={onToggle}
        className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-300 z-50",
      fixed 
        ? "fixed top-[5.5rem] bottom-20 right-4 w-[350px] flex flex-col" 
        : "fixed bottom-20 right-6 w-[350px] h-[500px] shadow-lg flex flex-col"
    )}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/20 p-1 rounded-full">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-sm">MindMatrix AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggle}>
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  message.sender === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form 
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="sm" className="h-9 px-3">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChatbot;
