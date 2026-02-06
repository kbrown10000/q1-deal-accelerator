'use client'

import Link from "next/link"
import { deals } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, MapPin } from "lucide-react"

// Growth team structure based on USDM org
const teamStructure = {
  west: {
    name: 'West Region',
    evp: 'Justin Ott',
    members: ['Justin Ott', 'Mike Campbell', 'Kim Guihen']
  },
  east: {
    name: 'East Region', 
    evp: 'Lisa Burgese Fry',
    members: [
      'Lisa Burgese Fry', 'Avani Macwan', 'Scott Pallardy', 
      'Sherry De Luca', 'Hovsep Kirikian', 'Jim Macdonell',
      'Josh Ertmer', 'Meghan Rutkowski', 'Jeff Burton',
      'Vega Finucan', 'Michelle Dias', 'Cortney Whitehouse'
    ]
  },
  europe: {
    name: 'Europe Region',
    evp: 'Holger Brämer',
    members: ['Marcus Dinan', 'Holger Brämer']
  }
}

interface MemberStats {
  name: string
  region: string
  isEVP: boolean
  dealCount: number
  totalPipeline: number
  totalEGP: number
  stage4Count: number
  stage4Pipeline: number
  avgDaysOpen: number
}

export default function TeamPage() {
  // Calculate stats for each team member
  const memberStats = new Map<string, MemberStats>()

  // Initialize all known team members
  Object.entries(teamStructure).forEach(([region, team]) => {
    team.members.forEach(member => {
      memberStats.set(member, {
        name: member,
        region: region,
        isEVP: member === team.evp,
        dealCount: 0,
        totalPipeline: 0,
        totalEGP: 0,
        stage4Count: 0,
        stage4Pipeline: 0,
        avgDaysOpen: 0
      })
    })
  })

  // Aggregate deal data
  deals.forEach(deal => {
    const existing = memberStats.get(deal.owner)
    if (existing) {
      existing.dealCount++
      existing.totalPipeline += deal.amount
      existing.totalEGP += deal.egp
      existing.avgDaysOpen += deal.daysOpen || 0
      if (deal.stage === 4) {
        existing.stage4Count++
        existing.stage4Pipeline += deal.amount
      }
    } else {
      // Unknown team member - add to east as default
      memberStats.set(deal.owner, {
        name: deal.owner,
        region: 'east',
        isEVP: false,
        dealCount: 1,
        totalPipeline: deal.amount,
        totalEGP: deal.egp,
        stage4Count: deal.stage === 4 ? 1 : 0,
        stage4Pipeline: deal.stage === 4 ? deal.amount : 0,
        avgDaysOpen: deal.daysOpen || 0
      })
    }
  })

  // Finalize averages
  const members = Array.from(memberStats.values())
    .filter(m => m.dealCount > 0)
    .map(m => ({
      ...m,
      avgDaysOpen: m.dealCount > 0 ? Math.round(m.avgDaysOpen / m.dealCount) : 0,
      avgDealSize: m.dealCount > 0 ? m.totalPipeline / m.dealCount : 0,
      marginPercent: m.totalPipeline > 0 ? (m.totalEGP / m.totalPipeline * 100) : 0
    }))
    .sort((a, b) => b.totalPipeline - a.totalPipeline)

  const westMembers = members.filter(m => m.region === 'west')
  const eastMembers = members.filter(m => m.region === 'east')
  const europeMembers = members.filter(m => m.region === 'europe')

  const RegionCard = ({ region, members }: { region: typeof teamStructure.west, members: typeof westMembers }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {region.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">EVP: {region.evp}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map(member => (
            <div key={member.name} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {member.name}
                    {member.isEVP && <Badge variant="outline" className="text-xs">EVP</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {member.dealCount} deals • {member.avgDaysOpen}d avg
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium">{formatCurrency(member.totalPipeline)}</div>
                <div className="text-xs">
                  <span className="text-green-600">{formatCurrency(member.totalEGP)} EGP</span>
                  {member.stage4Count > 0 && (
                    <span className="text-red-600 ml-2">• {member.stage4Count} S4</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-muted-foreground text-sm">No active pipeline</p>
          )}
        </div>
      </CardContent>
    </Card>
  )

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
        <h1 className="text-3xl font-bold">Growth Team</h1>
        <p className="text-muted-foreground">
          {members.length} active team members across 3 regions
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-50 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{westMembers.length}</div>
              <div className="text-sm text-muted-foreground">West Region</div>
              <div className="font-mono mt-1">{formatCurrency(westMembers.reduce((s, m) => s + m.totalPipeline, 0))}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{eastMembers.length}</div>
              <div className="text-sm text-muted-foreground">East Region</div>
              <div className="font-mono mt-1">{formatCurrency(eastMembers.reduce((s, m) => s + m.totalPipeline, 0))}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{europeMembers.length}</div>
              <div className="text-sm text-muted-foreground">Europe Region</div>
              <div className="font-mono mt-1">{formatCurrency(europeMembers.reduce((s, m) => s + m.totalPipeline, 0))}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Breakdowns */}
      <div className="grid gap-6 md:grid-cols-3">
        <RegionCard region={teamStructure.west} members={westMembers} />
        <RegionCard region={teamStructure.east} members={eastMembers} />
        <RegionCard region={teamStructure.europe} members={europeMembers} />
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Region</th>
                  <th className="text-right py-3 px-2">Deals</th>
                  <th className="text-right py-3 px-2">Pipeline</th>
                  <th className="text-right py-3 px-2">EGP</th>
                  <th className="text-right py-3 px-2">Stage 4</th>
                  <th className="text-right py-3 px-2">Avg Days</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <tr key={member.name} className="border-b hover:bg-muted/30">
                    <td className="py-2 px-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        {member.name}
                        {member.isEVP && <Badge variant="outline" className="text-xs">EVP</Badge>}
                      </div>
                    </td>
                    <td className="py-2 px-2 capitalize">{member.region}</td>
                    <td className="py-2 px-2 text-right">{member.dealCount}</td>
                    <td className="py-2 px-2 text-right font-mono font-medium">{formatCurrency(member.totalPipeline)}</td>
                    <td className="py-2 px-2 text-right font-mono text-green-600">{formatCurrency(member.totalEGP)}</td>
                    <td className="py-2 px-2 text-right">
                      {member.stage4Count > 0 ? (
                        <span className="text-red-600 font-medium">{member.stage4Count} ({formatCurrency(member.stage4Pipeline)})</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <span className={member.avgDaysOpen > 300 ? 'text-red-600' : member.avgDaysOpen > 150 ? 'text-yellow-600' : ''}>
                        {member.avgDaysOpen}d
                      </span>
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
