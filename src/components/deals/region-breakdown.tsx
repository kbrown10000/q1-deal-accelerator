import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ChevronRight, Globe } from "lucide-react"

interface RegionData {
  totalPipeline: number
  totalEgp: number
  dealCount: number
}

interface RegionBreakdownProps {
  west: RegionData
  east: RegionData
  europe: RegionData
}

function RegionRow({ 
  name, 
  href,
  data 
}: { 
  name: string
  href: string
  data: RegionData 
}) {
  return (
    <Link 
      href={href}
      className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/30 -mx-3 px-3 rounded transition-colors"
    >
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">{data.dealCount} deals</span>
        <span className="font-mono">{formatCurrency(data.totalPipeline)}</span>
        <span className="font-mono text-green-600">{formatCurrency(data.totalEgp)} EGP</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  )
}

export function RegionBreakdown({ west, east, europe }: RegionBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <RegionRow name="West" href="/region/west" data={west} />
        <RegionRow name="East" href="/region/east" data={east} />
        <RegionRow name="Europe" href="/region/europe" data={europe} />
      </CardContent>
    </Card>
  )
}
