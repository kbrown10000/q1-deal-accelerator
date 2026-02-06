import { getPipelineSummary, getSortedDeals, deals, getRegionMetrics } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { MetricCard } from "@/components/deals/metric-card"
import { DealTable } from "@/components/deals/deal-table"
import { ProgressTracker } from "@/components/deals/progress-tracker"
import { StageBreakdown } from "@/components/deals/stage-breakdown"
import { RegionBreakdown } from "@/components/deals/region-breakdown"
import Link from "next/link"
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Building2,
  MapPin
} from "lucide-react"

export default function Dashboard() {
  const summary = getPipelineSummary()
  const sortedDeals = getSortedDeals()
  
  const stage4Deals = deals.filter(d => d.stage === 4)
  const stage4Total = stage4Deals.reduce((s, d) => s + d.amount, 0)

  const westMetrics = getRegionMetrics('west')
  const eastMetrics = getRegionMetrics('east')
  const europeMetrics = getRegionMetrics('europe')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Q1 2026 Pipeline</h1>
          <p className="text-muted-foreground">
            Full pipeline • {summary.dealCount} opportunities • Priority: Stage 4 → Stage 3 → Stage 2 → Stage 1
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex gap-3 flex-wrap">
        <Link 
          href="/owners" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
        >
          <Users className="w-4 h-4" />
          By Owner
        </Link>
        <Link 
          href="/accounts" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors"
        >
          <Building2 className="w-4 h-4" />
          By Account
        </Link>
        <Link 
          href="/region/west" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium transition-colors"
        >
          <MapPin className="w-4 h-4" />
          West Region
        </Link>
        <Link 
          href="/region/east" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-medium transition-colors"
        >
          <MapPin className="w-4 h-4" />
          East Region
        </Link>
        <Link 
          href="/region/europe" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Europe
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Pipeline"
          value={formatCurrency(summary.totalPipeline)}
          subtitle={`${summary.dealCount} opportunities`}
          icon={DollarSign}
        />
        <MetricCard
          title="Total EGP"
          value={formatCurrency(summary.totalEGP)}
          subtitle={`${((summary.totalEGP / summary.totalPipeline) * 100).toFixed(0)}% margin`}
          icon={TrendingUp}
        />
        <MetricCard
          title="Stage 4 (Commit)"
          value={summary.byStage.stage4}
          subtitle={formatCurrency(stage4Total)}
          icon={AlertTriangle}
        />
        <ProgressTracker 
          reviewed={summary.reviewedCount} 
          pending={summary.pendingCount} 
        />
      </div>

      {/* Breakdowns */}
      <div className="grid gap-6 md:grid-cols-2">
        <StageBreakdown />
        <RegionBreakdown
          west={{
            totalPipeline: westMetrics.totalPipeline,
            totalEgp: westMetrics.totalEGP,
            dealCount: westMetrics.dealCount
          }}
          east={{
            totalPipeline: eastMetrics.totalPipeline,
            totalEgp: eastMetrics.totalEGP,
            dealCount: eastMetrics.dealCount
          }}
          europe={{
            totalPipeline: europeMetrics.totalPipeline,
            totalEgp: europeMetrics.totalEGP,
            dealCount: europeMetrics.dealCount
          }}
        />
      </div>

      {/* Priority Deal List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Priority Deal Queue</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Sorted by Stage (4 → 3 → 2 → 1), then by Amount (highest first). Showing top 50.
        </p>
        <DealTable deals={sortedDeals.slice(0, 50)} />
      </div>
    </div>
  )
}
