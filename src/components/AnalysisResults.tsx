import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Volume2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  data: {
    transcription: string;
    grammarErrors: Array<{
      original: string;
      corrected: string;
      type: string;
    }>;
    pronunciationIssues: Array<{
      word: string;
      phonetic: string;
      tip: string;
    }>;
    stats: {
      totalWords: number;
      grammarErrors: number;
      pronunciationIssues: number;
      errorPercentage: number;
    };
  };
}

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const accuracy = 100 - data.stats.errorPercentage;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats Overview */}
      <Card className="border-2 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Performance Summary
          </CardTitle>
          <CardDescription>Your speech analysis results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Accuracy Score</span>
              <span className="font-bold text-lg">{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-2xl font-bold text-foreground">{data.stats.totalWords}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Words</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning/10">
              <div className="text-2xl font-bold text-warning">{data.stats.grammarErrors}</div>
              <div className="text-xs text-muted-foreground mt-1">Grammar Errors</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-destructive/10">
              <div className="text-2xl font-bold text-destructive">
                {data.stats.pronunciationIssues}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Pronunciation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcription */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Transcription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed bg-muted p-4 rounded-lg">
            {data.transcription}
          </p>
        </CardContent>
      </Card>

      {/* Grammar Errors */}
      {data.grammarErrors.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Grammar Corrections
            </CardTitle>
            <CardDescription>
              Found {data.grammarErrors.length} grammar issue(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.grammarErrors.map((error, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-2">
                <Badge variant="outline" className="mb-2">
                  {error.type}
                </Badge>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-destructive font-mono text-sm line-through">
                      {error.original}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-success font-mono text-sm font-medium">
                      {error.corrected}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Pronunciation Issues */}
      {data.pronunciationIssues.length > 0 && (
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Pronunciation Feedback
            </CardTitle>
            <CardDescription>
              {data.pronunciationIssues.length} word(s) to improve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.pronunciationIssues.map((issue, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-foreground">{issue.word}</span>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {issue.phonetic}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{issue.tip}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen to Correct Pronunciation
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
