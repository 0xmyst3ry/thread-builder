// /pages/thread-builder.tsx
import { useState } from 'react';
import Head from 'next/head';
import ThreadInput from '../components/ThreadInput';
import ThreadPreview, { type Thread } from '../components/ThreadPreview';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Main Thread Builder Page
export default function ThreadBuilder() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  // Handle posting the thread to the API
  const handlePostThread = async (schedule = false) => {
    try {
      setIsPosting(true);
      // Check if we have threads to post
      if (threads.length === 0) {
        toast({
          title: "No thread to post",
          description: "Please generate a thread first.",
          variant: "destructive",
        });
        return;
      }

      // Mock API call
      const response = await fetch('/api/post-thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threads,
          schedule,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post thread,try again :)');
      }

      // Show success message
      toast({
        title: schedule ? "Thread Scheduled" : "Thread Posted",
        description: schedule 
          ? "Your thread has been scheduled successfully." 
          : "Your thread has been posted successfully.",
      });
    } catch (error) {
      console.error('Error posting thread:', error);
      toast({
        title: "Failed to post thread",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Thread Builder</title>
        <meta name="description" content="Build and schedule your Twitter threads" />
      </Head>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Thread Builder</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Thread Input */}
          <div className="space-y-6">
            <ThreadInput
              setThreads={setThreads}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </div>

          {/* Right column: Thread Preview */}
          <div className="space-y-6">
            <div className="bg-card text-card-foreground border-2 border-foreground p-6 shadow-brutal">
              <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-4">Your Thread Preview</h2>
              
              {threads.length > 0 ? (
                <>
                  <ThreadPreview 
                    threads={threads}
                    setThreads={setThreads}
                  />
                  
                  {/* Action buttons */}
                  <div className="mt-6 flex gap-4">
                    <Button 
                      onClick={() => handlePostThread(false)}
                      disabled={isPosting || threads.length === 0}
                      className="px-6"
                    >
                      {isPosting ? "Posting..." : "Post Now"}
                    </Button>
                    <Button 
                      onClick={() => handlePostThread(true)}
                      disabled={isPosting || threads.length === 0}
                      variant="outline"
                      className="px-6"
                    >
                      {isPosting ? "Scheduling..." : "Schedule Post"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Your thread preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
