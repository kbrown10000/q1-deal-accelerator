import { getPipelineSummary, getSortedDeals } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { MetricCard } from "@/components/deals/metric-card"
import { DealTable } from "@/components/deals/deal-table"
import { ProgressTracker } from "@/components/deals/progress-tracker"
import { StageBreakdown } from "@/components/deals/stage-breakdown"
import { RegionBreakdown } from "@/components/deals/region-breakdown"
import { 
  DollarSign, 
  TrendingUp, 
  Target 
} from "lucide-react"

export default function Dashboard() {
  const summary = getPipelineSummary()
  const sortedDeals = getSortedDeals()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Q1 2026 Pipeline</h1>
          <p className="text-muted-foreground">
            Priority-based deal review • Stage 3 → Stage 2 → Stage 1
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Pipeline"
          value={formatCurrency(summary.totalAmount)}
          subtitle={`${summary.totalDeals} opportunities`}
          icon={DollarSign}
        />
        <MetricCard
          title="Total EGP"
          value={formatCurrency(summary.totalEgp)}
          subtitle={`${((summary.totalEgp / summary.totalAmount) * 100).toFixed(0)}% of pipeline`}
          icon={TrendingUp}
        />
        <MetricCard
          title="P1 Deals (Stage 3)"
          value={summary.byStage.stage3.length}
          subtitle={formatCurrency(summary.byStage.stage3.reduce((s, d) => s + d.amount, 0))}
          icon={Target}
        />
        <ProgressTracker 
          reviewed={summary.reviewed} 
          pending={summary.pending} 
        />
      </div>

      {/* Breakdowns */}
      <div className="grid gap-6 md:grid-cols-2">
        <StageBreakdown
          stage3={summary.byStage.stage3}
          stage2={summary.byStage.stage2}
          stage1={summary.byStage.stage1}
        />
        <RegionBreakdown
          west={summary.byRegion.west}
          east={summary.byRegion.east}
          europe={summary.byRegion.europe}
        />
      </div>

      {/* Priority Deal List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Priority Deal Queue</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Sorted by Stage (P1 → P2 → P3), then by Amount (highest first)
        </p>
        <DealTable deals={sortedDeals} />
      </div>
    </div>
  )
}
