import { useState } from "react";
import RecordingInterface from "@/components/RecordingInterface";
import SessionHistory from "@/components/SessionHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, History, Info } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("record");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                SpeakRight
              </h1>
              <p className="text-sm text-muted-foreground">Master English with Indian Accent Support</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="record" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="record" className="animate-slide-up">
            <RecordingInterface />
          </TabsContent>

          <TabsContent value="history" className="animate-slide-up">
            <SessionHistory />
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-card-foreground">How it works</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Speak naturally in English - we understand Indian accents perfectly</li>
                  <li>• Get instant feedback on grammar and pronunciation</li>
                  <li>• Track your progress over time with detailed analytics</li>
                  <li>• Practice recommended words and phrases to improve faster</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
