'use client'

import Link from "next/link"
import { deals } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, TrendingUp, Target } from "lucide-react"
import { MetricCard } from "@/components/deals/metric-card"

interface OwnerSummary {
  owner: string
  dealCount: number
  totalPipeline: number
  totalEGP: number
  avgDealSize: number
  avgDaysOpen: number
  stages: { [key: number]: number }
  regions: { [key: string]: number }
  stage4Pipeline: number
}

export default function OwnersPage() {
  // Group deals by owner
  const ownerMap = new Map<string, OwnerSummary>()
  
  deals.forEach(deal => {
    const existing = ownerMap.get(deal.owner)
    if (existing) {
      existing.dealCount++
      existing.totalPipeline += deal.amount
      existing.totalEGP += deal.egp
      existing.avgDaysOpen += deal.daysOpen || 0
      existing.stages[deal.stage] = (existing.stages[deal.stage] || 0) + 1
      existing.regions[deal.region] = (existing.regions[deal.region] || 0) + 1
      if (deal.stage === 4) existing.stage4Pipeline += deal.amount
    } else {
      ownerMap.set(deal.owner, {
        owner: deal.owner,
        dealCount: 1,
        totalPipeline: deal.amount,
        totalEGP: deal.egp,
        avgDealSize: deal.amount,
        avgDaysOpen: deal.daysOpen || 0,
        stages: { [deal.stage]: 1 },
        regions: { [deal.region]: 1 },
        stage4Pipeline: deal.stage === 4 ? deal.amount : 0
      })
    }
  })

  // Calculate averages and sort
  const owners = Array.from(ownerMap.values())
    .map(o => ({
      ...o,
      avgDealSize: o.totalPipeline / o.dealCount,
      avgDaysOpen: Math.round(o.avgDaysOpen / o.dealCount),
      marginPercent: o.totalPipeline > 0 ? (o.totalEGP / o.totalPipeline * 100) : 0
    }))
    .sort((a, b) => b.totalPipeline - a.totalPipeline)

  const totalOwners = owners.length
  const topOwner = owners[0]
  const totalStage4 = owners.reduce((s, o) => s + o.stage4Pipeline, 0)

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
        <h1 className="text-3xl font-bold">Pipeline by Owner</h1>
        <p className="text-muted-foreground">
          {totalOwners} opportunity owners • Performance breakdown
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Owners"
          value={totalOwners}
          subtitle="Active sellers"
          icon={User}
        />
        <MetricCard
          title="Top Owner"
          value={topOwner?.owner || 'N/A'}
          subtitle={formatCurrency(topOwner?.totalPipeline || 0)}
          icon={TrendingUp}
        />
        <MetricCard
          title="Stage 4 Pipeline"
          value={formatCurrency(totalStage4)}
          subtitle="Ready to close"
          icon={Target}
        />
        <MetricCard
          title="Avg per Owner"
          value={formatCurrency(deals.reduce((s, d) => s + d.amount, 0) / totalOwners)}
          subtitle={`${Math.round(deals.length / totalOwners)} deals avg`}
        />
      </div>

      {/* Owner Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Owner Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Owner</th>
                  <th className="text-right py-3 px-2">Deals</th>
                  <th className="text-right py-3 px-2">Pipeline</th>
                  <th className="text-right py-3 px-2">EGP</th>
                  <th className="text-right py-3 px-2">Margin</th>
                  <th className="text-right py-3 px-2">Avg Size</th>
                  <th className="text-right py-3 px-2">Avg Days</th>
                  <th className="text-center py-3 px-2">Stages</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, i) => (
                  <tr key={owner.owner} className="border-b hover:bg-muted/30">
                    <td className="py-2 px-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-2">
                      <div className="font-medium">{owner.owner}</div>
                      <div className="text-xs text-muted-foreground">
                        {Object.entries(owner.regions).map(([r, c]) => `${r}: ${c}`).join(' • ')}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right">{owner.dealCount}</td>
                    <td className="py-2 px-2 text-right font-mono font-medium">{formatCurrency(owner.totalPipeline)}</td>
                    <td className="py-2 px-2 text-right font-mono text-green-600">{formatCurrency(owner.totalEGP)}</td>
                    <td className="py-2 px-2 text-right">
                      <span className={owner.marginPercent >= 40 ? 'text-green-600' : owner.marginPercent >= 25 ? 'text-yellow-600' : 'text-red-600'}>
                        {owner.marginPercent.toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(owner.avgDealSize)}</td>
                    <td className="py-2 px-2 text-right">
                      <span className={owner.avgDaysOpen > 300 ? 'text-red-600' : owner.avgDaysOpen > 150 ? 'text-yellow-600' : ''}>
                        {owner.avgDaysOpen}d
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex gap-1 justify-center flex-wrap">
                        {owner.stages[4] && <Badge variant="destructive" className="text-xs">4:{owner.stages[4]}</Badge>}
                        {owner.stages[3] && <Badge className="text-xs">3:{owner.stages[3]}</Badge>}
                        {owner.stages[2] && <Badge variant="secondary" className="text-xs">2:{owner.stages[2]}</Badge>}
                        {owner.stages[1] && <Badge variant="outline" className="text-xs">1:{owner.stages[1]}</Badge>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
