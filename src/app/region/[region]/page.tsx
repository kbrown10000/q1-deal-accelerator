import { notFound } from "next/navigation"
import Link from "next/link"
import { getDealsByRegion, getRegionMetrics, Region } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { MetricCard } from "@/components/deals/metric-card"
import { DealTable } from "@/components/deals/deal-table"
import { 
  DollarSign, 
  TrendingUp, 
  Target,
  CheckCircle,
  ArrowLeft
} from "lucide-react"

const validRegions = ['west', 'east', 'europe'] as const

interface PageProps {
  params: {
    region: string
  }
}

export function generateStaticParams() {
  return validRegions.map((region) => ({
    region,
  }))
}

export default function RegionPage({ params }: PageProps) {
  const region = params.region as Region
  
  if (!validRegions.includes(region)) {
    notFound()
  }

  const deals = getDealsByRegion(region)
  const metrics = getRegionMetrics(region)
  const regionName = region.charAt(0).toUpperCase() + region.slice(1)

  // Sort deals by stage DESC, then amount DESC
  const sortedDeals = [...deals].sort((a, b) => {
    if (b.stage !== a.stage) return b.stage - a.stage
    return b.amount - a.amount
  })

  const avgDealSize = metrics.dealCount > 0 ? metrics.totalPipeline / metrics.dealCount : 0
  const marginPercent = metrics.totalPipeline > 0 
    ? ((metrics.totalEGP / metrics.totalPipeline) * 100).toFixed(0) 
    : '0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link 
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">{regionName} Region</h1>
        <p className="text-muted-foreground">
          Q1 2026 pipeline for {regionName} region • {metrics.dealCount} opportunities
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Pipeline"
          value={formatCurrency(metrics.totalPipeline)}
          subtitle={`${metrics.dealCount} opportunities`}
          icon={DollarSign}
        />
        <MetricCard
          title="Total EGP"
          value={formatCurrency(metrics.totalEGP)}
          subtitle={`${marginPercent}% margin`}
          icon={TrendingUp}
        />
        <MetricCard
          title="Stage 4 (Commit)"
          value={metrics.stage4Count}
          subtitle="Ready to close"
          icon={Target}
        />
        <MetricCard
          title="Avg Deal Size"
          value={formatCurrency(avgDealSize)}
          subtitle={`${metrics.stage3Count} in Stage 3`}
          icon={CheckCircle}
        />
      </div>

      {/* Stage breakdown */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
        <div className="text-sm flex gap-6">
          <span>
            <strong className="text-red-600">{metrics.stage4Count}</strong> Stage 4
          </span>
          <span>
            <strong>{metrics.stage3Count}</strong> Stage 3
          </span>
          <span>
            <strong>{metrics.stage2Count}</strong> Stage 2
          </span>
          <span>
            <strong>{metrics.stage1Count}</strong> Stage 1
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-green-600">{metrics.reviewedCount} reviewed</span>
          <span className="text-muted-foreground">{metrics.pendingCount} pending</span>
        </div>
      </div>

      {/* Deals Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{regionName} Deals ({sortedDeals.length})</h2>
        <DealTable deals={sortedDeals} showRegion={false} />
      </div>
    </div>
  )
}
