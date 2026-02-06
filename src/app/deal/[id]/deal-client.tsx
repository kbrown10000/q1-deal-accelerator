"use client"

import { useState } from "react"
import Link from "next/link"
import { Deal, Action } from "@/data/deals"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  Building2,
  Calendar,
  User,
  Clock,
  Target,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  BarChart3
} from "lucide-react"

interface DealClientProps {
  deal: Deal
  actions: Action[]
}

function getStageBadge(stage: number) {
  switch (stage) {
    case 3:
      return <Badge variant="success" className="text-base px-3 py-1">P1 - Stage 3</Badge>
    case 2:
      return <Badge variant="warning" className="text-base px-3 py-1">P2 - Stage 2</Badge>
    case 1:
      return <Badge variant="info" className="text-base px-3 py-1">P3 - Stage 1</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const defaultMeddpicc = [
  { id: 'metrics', label: 'Metrics', question: 'Do we understand their success metrics?', checked: false, notes: '' },
  { id: 'economic-buyer', label: 'Economic Buyer', question: 'Have we identified the decision maker?', checked: false, notes: '' },
  { id: 'decision-criteria', label: 'Decision Criteria', question: 'Do we know how they will decide?', checked: false, notes: '' },
  { id: 'decision-process', label: 'Decision Process', question: 'Do we know the timeline and steps?', checked: false, notes: '' },
  { id: 'paper-process', label: 'Paper Process', question: 'Do we understand procurement?', checked: false, notes: '' },
  { id: 'identified-pain', label: 'Identified Pain', question: 'Is there a compelling event?', checked: false, notes: '' },
  { id: 'champion', label: 'Champion', question: 'Do we have an internal advocate?', checked: false, notes: '' },
  { id: 'competition', label: 'Competition', question: 'Do we know who else they are talking to?', checked: false, notes: '' },
]

export function DealClient({ deal, actions }: DealClientProps) {
  const [meddpicc, setMeddpicc] = useState(defaultMeddpicc)
  const [notes, setNotes] = useState('')

  const completedItems = meddpicc.filter(item => item.checked).length
  const qualificationScore = Math.round((completedItems / meddpicc.length) * 100)

  const handleMeddpiccChange = (id: string, checked: boolean) => {
    setMeddpicc(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked } : item
      )
    )
  }

  const handleNotesChange = (id: string, notesText: string) => {
    setMeddpicc(prev => 
      prev.map(item => 
        item.id === id ? { ...item, notes: notesText } : item
      )
    )
  }

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
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{deal.accountName}</h1>
              {getStageBadge(deal.stage)}
            </div>
            <p className="text-lg text-muted-foreground">{deal.opportunityName}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{formatCurrency(deal.amount)}</div>
            <div className="text-lg text-green-600">{formatCurrency(deal.egp)} EGP</div>
          </div>
        </div>
      </div>

      {/* Deal Snapshot */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Close Date</span>
            </div>
            <div className="font-semibold">{formatDate(deal.closeDate)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <User className="h-4 w-4" />
              <span className="text-sm">Owner</span>
            </div>
            <div className="font-semibold">{deal.owner}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Region</span>
            </div>
            <div className="font-semibold capitalize">{deal.region}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Days in Stage</span>
            </div>
            <div className="font-semibold">{deal.daysInStage} days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Target className="h-4 w-4" />
              <span className="text-sm">Qualification</span>
            </div>
            <div className="font-semibold">{qualificationScore}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* MEDDPICC Checklist - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                MEDDPICC Qualification
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {completedItems}/{meddpicc.length} complete
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meddpicc.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={item.checked}
                        onCheckedChange={(checked) => 
                          handleMeddpiccChange(item.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{item.label}</span>
                          {item.checked && (
                            <Badge variant="success" className="text-xs">✓</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.question}
                        </p>
                        <Textarea
                          placeholder="Add notes..."
                          value={item.notes}
                          onChange={(e) => handleNotesChange(item.id, e.target.value)}
                          className="min-h-[60px] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {actions.length > 0 ? (
                <ul className="space-y-2">
                  {actions.map((action) => (
                    <li key={action.id} className="flex items-start gap-2 text-sm">
                      <span className={
                        action.status === 'completed' 
                          ? 'text-green-500' 
                          : action.status === 'in-progress'
                            ? 'text-yellow-500'
                            : 'text-muted-foreground'
                      }>•</span>
                      <div>
                        <p>{action.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {action.owner} • Due {formatDate(action.dueDate)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No action items yet. AI recommendations coming soon.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Similar Deals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Similar Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered deal matching coming soon. Will show similar won/lost 
                deals to help predict outcome and identify winning strategies.
              </p>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Notes & Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add deal notes, insights, or collaboration comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Changes are saved locally. Integration with CRM coming soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
