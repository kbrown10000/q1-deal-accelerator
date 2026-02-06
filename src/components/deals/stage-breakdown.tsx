import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Deal } from "@/data/deals"

interface StageBreakdownProps {
  stage3: Deal[]
  stage2: Deal[]
  stage1: Deal[]
}

function StageRow({ 
  label, 
  priority,
  deals, 
  variant 
}: { 
  label: string
  priority: string
  deals: Deal[]
  variant: "success" | "warning" | "info"
}) {
  const total = deals.reduce((sum, d) => sum + d.amount, 0)
  const egp = deals.reduce((sum, d) => sum + d.egp, 0)

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <Badge variant={variant}>{priority}</Badge>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">{deals.length} deals</span>
        <span className="font-mono">{formatCurrency(total)}</span>
        <span className="font-mono text-green-600">{formatCurrency(egp)} EGP</span>
      </div>
    </div>
  )
}

export function StageBreakdown({ stage3, stage2, stage1 }: StageBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stage Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <StageRow 
          label="Stage 3 (Closing)" 
          priority="P1" 
          deals={stage3} 
          variant="success" 
        />
        <StageRow 
          label="Stage 2 (Proposal)" 
          priority="P2" 
          deals={stage2} 
          variant="warning" 
        />
        <StageRow 
          label="Stage 1 (Discovery)" 
          priority="P3" 
          deals={stage1} 
          variant="info" 
        />
      </CardContent>
    </Card>
  )
}
