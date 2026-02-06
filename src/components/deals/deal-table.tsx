"use client"

import Link from "next/link"
import { Deal } from "@/data/deals"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  CheckCircle2, 
  Circle 
} from "lucide-react"

interface DealTableProps {
  deals: Deal[]
  showRegion?: boolean
}

function getStageBadge(stage: number) {
  switch (stage) {
    case 3:
      return <Badge variant="success">P1 - Stage 3</Badge>
    case 2:
      return <Badge variant="warning">P2 - Stage 2</Badge>
    case 1:
      return <Badge variant="info">P3 - Stage 1</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export function DealTable({ deals, showRegion = true }: DealTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Account</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Opportunity</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
            <th className="text-right p-3 font-medium text-muted-foreground">EGP</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Close Date</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Stage</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Owner</th>
            {showRegion && (
              <th className="text-left p-3 font-medium text-muted-foreground">Region</th>
            )}
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr 
              key={deal.id} 
              className="border-b hover:bg-muted/30 transition-colors"
            >
              <td className="p-3">
                {deal.reviewed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </td>
              <td className="p-3 font-medium">{deal.accountName}</td>
              <td className="p-3 text-muted-foreground max-w-[200px] truncate">
                {deal.opportunityName}
              </td>
              <td className="p-3 text-right font-mono">{formatCurrency(deal.amount)}</td>
              <td className="p-3 text-right font-mono text-green-600">
                {formatCurrency(deal.egp)}
              </td>
              <td className="p-3">{formatDate(deal.closeDate)}</td>
              <td className="p-3">{getStageBadge(deal.stage)}</td>
              <td className="p-3">{deal.owner}</td>
              {showRegion && (
                <td className="p-3 capitalize">{deal.region}</td>
              )}
              <td className="p-3">
                <Link 
                  href={`/deal/${deal.id}`}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Review
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deals.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No deals found
        </div>
      )}
    </div>
  )
}
