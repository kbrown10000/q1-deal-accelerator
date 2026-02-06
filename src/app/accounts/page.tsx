'use client'

import Link from "next/link"
import { deals } from "@/data/deals"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2 } from "lucide-react"

interface AccountSummary {
  accountName: string
  dealCount: number
  totalPipeline: number
  totalEGP: number
  stages: { [key: number]: number }
  deals: typeof deals
}

export default function AccountsPage() {
  // Group deals by account
  const accountMap = new Map<string, AccountSummary>()
  
  deals.forEach(deal => {
    const existing = accountMap.get(deal.accountName)
    if (existing) {
      existing.dealCount++
      existing.totalPipeline += deal.amount
      existing.totalEGP += deal.egp
      existing.stages[deal.stage] = (existing.stages[deal.stage] || 0) + 1
      existing.deals.push(deal)
    } else {
      accountMap.set(deal.accountName, {
        accountName: deal.accountName,
        dealCount: 1,
        totalPipeline: deal.amount,
        totalEGP: deal.egp,
        stages: { [deal.stage]: 1 },
        deals: [deal]
      })
    }
  })

  // Sort by total pipeline descending
  const accounts = Array.from(accountMap.values())
    .sort((a, b) => b.totalPipeline - a.totalPipeline)

  const totalAccounts = accounts.length
  const multiDealAccounts = accounts.filter(a => a.dealCount > 1).length

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
        <h1 className="text-3xl font-bold">Pipeline by Account</h1>
        <p className="text-muted-foreground">
          {totalAccounts} accounts • {multiDealAccounts} with multiple deals
        </p>
      </div>

      {/* Top Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Top 20 Accounts by Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {accounts.slice(0, 20).map((account, i) => (
            <div 
              key={account.accountName}
              className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/30 -mx-3 px-3 rounded transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground w-6 text-right">{i + 1}.</span>
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{account.accountName}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.dealCount} deal{account.dealCount > 1 ? 's' : ''}
                    {account.stages[4] ? ` • ${account.stages[4]} in Stage 4` : ''}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-right">
                  <div className="font-mono font-medium">{formatCurrency(account.totalPipeline)}</div>
                  <div className="font-mono text-green-600 text-xs">{formatCurrency(account.totalEGP)} EGP</div>
                </div>
                <div className="flex gap-1">
                  {account.stages[4] && <Badge variant="destructive">S4: {account.stages[4]}</Badge>}
                  {account.stages[3] && <Badge>S3: {account.stages[3]}</Badge>}
                  {account.stages[2] && <Badge variant="secondary">S2: {account.stages[2]}</Badge>}
                  {account.stages[1] && <Badge variant="outline">S1: {account.stages[1]}</Badge>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Accounts ({totalAccounts})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Account</th>
                  <th className="text-right py-3 px-2">Deals</th>
                  <th className="text-right py-3 px-2">Pipeline</th>
                  <th className="text-right py-3 px-2">EGP</th>
                  <th className="text-center py-3 px-2">Stages</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, i) => (
                  <tr key={account.accountName} className="border-b hover:bg-muted/30">
                    <td className="py-2 px-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-2 font-medium">{account.accountName}</td>
                    <td className="py-2 px-2 text-right">{account.dealCount}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(account.totalPipeline)}</td>
                    <td className="py-2 px-2 text-right font-mono text-green-600">{formatCurrency(account.totalEGP)}</td>
                    <td className="py-2 px-2 text-center">
                      <div className="flex gap-1 justify-center">
                        {account.stages[4] && <Badge variant="destructive" className="text-xs">4:{account.stages[4]}</Badge>}
                        {account.stages[3] && <Badge className="text-xs">3:{account.stages[3]}</Badge>}
                        {account.stages[2] && <Badge variant="secondary" className="text-xs">2:{account.stages[2]}</Badge>}
                        {account.stages[1] && <Badge variant="outline" className="text-xs">1:{account.stages[1]}</Badge>}
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
