// /components/ThreadInput.tsx
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { splitIntoThreads } from '@/lib/threadutils';
import { useToast } from "@/components/ui/use-toast";
import type { Thread } from "@/components/ThreadPreview";

interface ThreadInputProps {
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThreadInput({ setThreads, isGenerating, setIsGenerating }: ThreadInputProps) {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  // Generate thread from long-form content
  const generateThread = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty content",
        description: "Please enter some content to generate a thread.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      // Use the utility function to split content into threads
      const threadSegments = splitIntoThreads(content);
      
      // Transform into thread objects
      const threadObjects = threadSegments.map(text => ({ text }));
      
      // Update state with generated threads
      setThreads(threadObjects);
      
      toast({
        title: "Thread generated",
        description: `Successfully split content into ${threadObjects.length} tweets.`,
      });
    } catch (error) {
      console.error('Error generating thread:', error);
      toast({
        title: "Failed to generate thread",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-2">Paste your article or blog post</h2>
          
          <Textarea
            placeholder="Paste your long-form content here. We'll automatically split it into tweet-sized segments..."
            className="min-h-[300px] resize-y"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isGenerating}
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={generateThread}
              disabled={isGenerating || !content.trim()}
              className="px-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Thread"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}