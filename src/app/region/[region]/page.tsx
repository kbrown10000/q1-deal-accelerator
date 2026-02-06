import { notFound } from "next/navigation"
import Link from "next/link"
import { getDealsByRegion, getRegionMetrics, Region } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { MetricCard } from "@/components/deals/metric-card"
import { DealTable } from "@/components/deals/deal-table"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock,
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
          Q1 2026 pipeline for {regionName} region
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
          value={formatCurrency(metrics.totalEgp)}
          subtitle={`${((metrics.totalEgp / metrics.totalPipeline) * 100).toFixed(0)}% margin`}
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Deal Size"
          value={formatCurrency(metrics.avgDealSize)}
          icon={Users}
        />
        <MetricCard
          title="Avg Days Open"
          value={Math.round(metrics.avgDaysOpen)}
          subtitle="days in pipeline"
          icon={Clock}
        />
      </div>

      {/* Review Progress */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
        <div className="text-sm">
          <span className="text-green-600 font-medium">{metrics.reviewed} reviewed</span>
          <span className="text-muted-foreground mx-2">•</span>
          <span className="text-muted-foreground">{metrics.pending} pending review</span>
        </div>
      </div>

      {/* Deals Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{regionName} Deals</h2>
        <DealTable deals={sortedDeals} showRegion={false} />
      </div>
    </div>
  )
}
