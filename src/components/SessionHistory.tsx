import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Award } from "lucide-react";

const SessionHistory = () => {
  // Mock data - will be replaced with actual data from backend
  const sessions = [
    {
      id: 1,
      date: "Today, 10:30 AM",
      accuracy: 85,
      totalWords: 45,
      grammarErrors: 3,
      pronunciationIssues: 2,
    },
    {
      id: 2,
      date: "Yesterday, 3:15 PM",
      accuracy: 78,
      totalWords: 38,
      grammarErrors: 5,
      pronunciationIssues: 4,
    },
    {
      id: 3,
      date: "2 days ago, 11:00 AM",
      accuracy: 72,
      totalWords: 32,
      grammarErrors: 6,
      pronunciationIssues: 5,
    },
  ];

  const averageAccuracy = Math.round(
    sessions.reduce((acc, s) => acc + s.accuracy, 0) / sessions.length
  );

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-3xl font-bold text-foreground">{averageAccuracy}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold text-foreground">{sessions.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              <span className="text-3xl font-bold text-foreground">Rising Star</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Practice History</CardTitle>
          <CardDescription>Your recent practice sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-foreground">{session.date}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {session.totalWords} words spoken
                  </div>
                </div>
                <Badge
                  variant={session.accuracy >= 80 ? "default" : "secondary"}
                  className="text-base px-3 py-1"
                >
                  {session.accuracy}%
                </Badge>
              </div>

              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-muted-foreground">
                    {session.grammarErrors} grammar
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">
                    {session.pronunciationIssues} pronunciation
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full mt-3">
                View Details
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Improvement Tips */}
      <Card className="shadow-soft bg-gradient-success border-0">
        <CardHeader>
          <CardTitle className="text-success-foreground">Keep Improving! 🎯</CardTitle>
        </CardHeader>
        <CardContent className="text-success-foreground/90">
          <ul className="space-y-2 text-sm">
            <li>• Practice daily for 10-15 minutes for best results</li>
            <li>• Focus on words you commonly mispronounce</li>
            <li>• Review your grammar corrections regularly</li>
            <li>• Try reading news articles aloud to practice</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionHistory;
