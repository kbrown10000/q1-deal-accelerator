'use client'

import Link from "next/link"
import { deals } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MetricCard } from "@/components/deals/metric-card"
import { ArrowLeft, Clock, AlertTriangle, TrendingDown, Calendar } from "lucide-react"

// Aging buckets
const AGING_BUCKETS = [
  { label: '0-30 days', min: 0, max: 30, color: 'bg-green-500' },
  { label: '31-90 days', min: 31, max: 90, color: 'bg-yellow-500' },
  { label: '91-180 days', min: 91, max: 180, color: 'bg-orange-500' },
  { label: '181-365 days', min: 181, max: 365, color: 'bg-red-500' },
  { label: '365+ days', min: 366, max: Infinity, color: 'bg-red-700' },
]

export default function VelocityPage() {
  // Calculate velocity metrics
  const avgDaysOpen = Math.round(deals.reduce((s, d) => s + (d.daysOpen || 0), 0) / deals.length)
  
  // By stage
  const stageMetrics = [1, 2, 3, 4].map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage)
    const avgDays = stageDeals.length > 0 
      ? Math.round(stageDeals.reduce((s, d) => s + (d.daysOpen || 0), 0) / stageDeals.length)
      : 0
    const totalPipeline = stageDeals.reduce((s, d) => s + d.amount, 0)
    return { stage, dealCount: stageDeals.length, avgDays, totalPipeline }
  })

  // Aging distribution
  const agingData = AGING_BUCKETS.map(bucket => {
    const bucketDeals = deals.filter(d => {
      const days = d.daysOpen || 0
      return days >= bucket.min && days <= bucket.max
    })
    return {
      ...bucket,
      dealCount: bucketDeals.length,
      pipeline: bucketDeals.reduce((s, d) => s + d.amount, 0),
      percent: (bucketDeals.length / deals.length) * 100
    }
  })

  // Stale deals (>180 days)
  const staleDeals = deals
    .filter(d => (d.daysOpen || 0) > 180)
    .sort((a, b) => (b.daysOpen || 0) - (a.daysOpen || 0))
  const stalePipeline = staleDeals.reduce((s, d) => s + d.amount, 0)

  // Q1 2026 closing deals (Jan-Mar)
  const q1Deals = deals.filter(d => {
    const close = new Date(d.closeDate)
    return close >= new Date('2026-01-01') && close <= new Date('2026-03-31')
  }).sort((a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime())
  const q1Pipeline = q1Deals.reduce((s, d) => s + d.amount, 0)

  // February deals
  const febDeals = deals.filter(d => {
    const close = new Date(d.closeDate)
    return close >= new Date('2026-02-01') && close <= new Date('2026-02-28')
  })
  const febPipeline = febDeals.reduce((s, d) => s + d.amount, 0)

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
        <h1 className="text-3xl font-bold">Deal Velocity</h1>
        <p className="text-muted-foreground">
          Pipeline aging and deal movement analysis
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Avg Days Open"
          value={`${avgDaysOpen} days`}
          subtitle="Across all deals"
          icon={Clock}
        />
        <MetricCard
          title="Stale Pipeline"
          value={formatCurrency(stalePipeline)}
          subtitle={`${staleDeals.length} deals >180 days`}
          icon={AlertTriangle}
        />
        <MetricCard
          title="Feb Close Target"
          value={formatCurrency(febPipeline)}
          subtitle={`${febDeals.length} deals this month`}
          icon={Calendar}
        />
        <MetricCard
          title="Q1 Pipeline"
          value={formatCurrency(q1Pipeline)}
          subtitle={`${q1Deals.length} deals Q1 2026`}
          icon={TrendingDown}
        />
      </div>

      {/* Aging Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Aging Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {agingData.map(bucket => (
            <div key={bucket.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{bucket.label}</span>
                <span className="text-muted-foreground">
                  {bucket.dealCount} deals • {formatCurrency(bucket.pipeline)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={bucket.percent} className="flex-1" />
                <span className="text-sm font-mono w-12 text-right">{bucket.percent.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stage Velocity */}
      <Card>
        <CardHeader>
          <CardTitle>Velocity by Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {stageMetrics.reverse().map(s => (
              <div key={s.stage} className="text-center p-4 rounded-lg bg-muted/50">
                <Badge variant={s.stage === 4 ? 'destructive' : s.stage === 3 ? 'default' : 'secondary'}>
                  Stage {s.stage}
                </Badge>
                <div className="text-3xl font-bold mt-2">{s.avgDays}d</div>
                <div className="text-sm text-muted-foreground">avg days open</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.dealCount} deals • {formatCurrency(s.totalPipeline)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stale Deals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Stale Deals (&gt;180 days) — {staleDeals.length} deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Deal</th>
                  <th className="text-left py-3 px-2">Account</th>
                  <th className="text-left py-3 px-2">Owner</th>
                  <th className="text-right py-3 px-2">Amount</th>
                  <th className="text-right py-3 px-2">Days Open</th>
                  <th className="text-center py-3 px-2">Stage</th>
                </tr>
              </thead>
              <tbody>
                {staleDeals.slice(0, 30).map(deal => (
                  <tr key={deal.id} className="border-b hover:bg-muted/30">
                    <td className="py-2 px-2">
                      <Link href={`/deal/${deal.id}`} className="text-blue-600 hover:underline">
                        {deal.opportunityName.substring(0, 50)}...
                      </Link>
                    </td>
                    <td className="py-2 px-2">{deal.accountName}</td>
                    <td className="py-2 px-2">{deal.owner}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(deal.amount)}</td>
                    <td className="py-2 px-2 text-right">
                      <span className={deal.daysOpen && deal.daysOpen > 365 ? 'text-red-600 font-bold' : 'text-red-500'}>
                        {deal.daysOpen}d
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <Badge variant={deal.stage === 4 ? 'destructive' : deal.stage === 3 ? 'default' : 'secondary'}>
                        S{deal.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {staleDeals.length > 30 && (
              <p className="text-center text-muted-foreground mt-4">
                + {staleDeals.length - 30} more stale deals
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Q1 Close Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Q1 2026 Close Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Close Date</th>
                  <th className="text-left py-3 px-2">Deal</th>
                  <th className="text-left py-3 px-2">Account</th>
                  <th className="text-left py-3 px-2">Owner</th>
                  <th className="text-right py-3 px-2">Amount</th>
                  <th className="text-center py-3 px-2">Stage</th>
                </tr>
              </thead>
              <tbody>
                {q1Deals.slice(0, 40).map(deal => (
                  <tr key={deal.id} className="border-b hover:bg-muted/30">
                    <td className="py-2 px-2 font-mono">{deal.closeDate}</td>
                    <td className="py-2 px-2">
                      <Link href={`/deal/${deal.id}`} className="text-blue-600 hover:underline">
                        {deal.opportunityName.substring(0, 40)}...
                      </Link>
                    </td>
                    <td className="py-2 px-2">{deal.accountName}</td>
                    <td className="py-2 px-2">{deal.owner}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(deal.amount)}</td>
                    <td className="py-2 px-2 text-center">
                      <Badge variant={deal.stage === 4 ? 'destructive' : deal.stage === 3 ? 'default' : 'secondary'}>
                        S{deal.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {q1Deals.length > 40 && (
              <p className="text-center text-muted-foreground mt-4">
                + {q1Deals.length - 40} more Q1 deals
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
