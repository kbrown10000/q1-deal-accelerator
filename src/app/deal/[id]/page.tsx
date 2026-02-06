import { notFound } from "next/navigation"
import { getDealById, getActionsByDeal, deals } from "@/data/deals"
import { DealClient } from "./deal-client"

interface PageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return deals.map((deal) => ({
    id: deal.id,
  }))
}

export default function DealPage({ params }: PageProps) {
  const deal = getDealById(params.id)
  
  if (!deal) {
    notFound()
  }

  const actions = getActionsByDeal(deal.id)

  return <DealClient deal={deal} actions={actions} />
}
