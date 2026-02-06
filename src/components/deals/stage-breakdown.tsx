import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { deals } from "@/data/deals"

interface StageData {
  count: number
  pipeline: number
  egp: number
}

interface StageBreakdownProps {
  stage4?: StageData
  stage3?: StageData
  stage2?: StageData
  stage1?: StageData
}

function StageRow({ 
  label, 
  priority,
  data, 
  variant 
}: { 
  label: string
  priority: string
  data: StageData
  variant: "default" | "secondary" | "destructive" | "outline"
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <Badge variant={variant}>{priority}</Badge>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">{data.count} deals</span>
        <span className="font-mono">{formatCurrency(data.pipeline)}</span>
        <span className="font-mono text-green-600">{formatCurrency(data.egp)} EGP</span>
      </div>
    </div>
  )
}

export function StageBreakdown({ stage4, stage3, stage2, stage1 }: StageBreakdownProps) {
  // Calculate from deals if not provided
  const getStageData = (stageNum: number): StageData => {
    const stageDeals = deals.filter(d => d.stage === stageNum)
    return {
      count: stageDeals.length,
      pipeline: stageDeals.reduce((sum, d) => sum + d.amount, 0),
      egp: stageDeals.reduce((sum, d) => sum + d.egp, 0),
    }
  }

  const s4 = stage4 || getStageData(4)
  const s3 = stage3 || getStageData(3)
  const s2 = stage2 || getStageData(2)
  const s1 = stage1 || getStageData(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stage Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <StageRow 
          label="Stage 4 (Commit)" 
          priority="🔴 NOW" 
          data={s4} 
          variant="destructive" 
        />
        <StageRow 
          label="Stage 3 (Solution)" 
          priority="P1" 
          data={s3} 
          variant="default" 
        />
        <StageRow 
          label="Stage 2 (Qualify)" 
          priority="P2" 
          data={s2} 
          variant="secondary" 
        />
        <StageRow 
          label="Stage 1 (Source)" 
          priority="P3" 
          data={s1} 
          variant="outline" 
        />
      </CardContent>
    </Card>
  )
}
