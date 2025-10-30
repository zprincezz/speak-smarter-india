import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnalysisResults from "./AnalysisResults";

const RecordingInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly in English",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(",")[1];
        
        // Mock analysis for now - will be replaced with actual API calls
        setTimeout(() => {
          setAnalysisData({
            transcription: "This is sample transcribed text from your speech.",
            grammarErrors: [
              {
                original: "I goes to school",
                corrected: "I go to school",
                type: "Subject-verb agreement",
              },
            ],
            pronunciationIssues: [
              {
                word: "schedule",
                phonetic: "/ˈʃedjuːl/",
                tip: "In Indian English, pronounce as 'she-dyool' not 'sked-yool'",
              },
            ],
            stats: {
              totalWords: 25,
              grammarErrors: 2,
              pronunciationIssues: 3,
              errorPercentage: 20,
            },
          });
          setIsProcessing(false);
          toast({
            title: "Analysis complete",
            description: "Check your results below",
          });
        }, 2000);
      };
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to process audio",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Recording Control */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? "bg-gradient-hero animate-pulse-glow shadow-glow"
                : "bg-muted"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-16 h-16 text-primary-foreground animate-spin" />
            ) : (
              <div className="relative">
                {isRecording && (
                  <div className="absolute inset-0 w-16 h-16 bg-primary-glow rounded-full animate-ping opacity-30" />
                )}
                <Mic
                  className={`w-16 h-16 ${
                    isRecording ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            {isRecording
              ? "Recording..."
              : isProcessing
              ? "Analyzing..."
              : "Ready to Practice"}
          </h2>
          <p className="text-muted-foreground">
            {isRecording
              ? "Speak clearly and naturally"
              : isProcessing
              ? "Processing your speech"
              : "Tap the button to start recording"}
          </p>
        </div>

        <Button
          variant={isRecording ? "destructive" : "hero"}
          size="lg"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className="px-8"
        >
          {isRecording ? (
            <>
              <Square className="w-5 h-5 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </>
          )}
        </Button>
      </div>

      {/* Analysis Results */}
      {analysisData && <AnalysisResults data={analysisData} />}
    </div>
  );
};

export default RecordingInterface;
