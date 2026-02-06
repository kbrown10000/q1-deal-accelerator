import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressTrackerProps {
  reviewed: number
  pending: number
}

export function ProgressTracker({ reviewed, pending }: ProgressTrackerProps) {
  const total = reviewed + pending
  const percentage = total > 0 ? (reviewed / total) * 100 : 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Review Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress value={percentage} />
          <div className="flex justify-between text-sm">
            <span className="text-green-600 font-medium">
              {reviewed} reviewed
            </span>
            <span className="text-muted-foreground">
              {pending} pending
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}% complete ({total} total deals)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
