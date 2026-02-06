"use client"

import { useState } from "react"
import Link from "next/link"
import { actionItems, getDealById } from "@/data/deals"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { 
  ArrowLeft,
  ListChecks,
  ChevronRight,
  Filter
} from "lucide-react"

type StatusFilter = 'all' | 'pending' | 'in-progress' | 'completed'
type OwnerFilter = string

const owners = Array.from(new Set(actionItems.map(a => a.owner)))

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Completed</Badge>
    case 'in-progress':
      return <Badge variant="warning">In Progress</Badge>
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ActionsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>('all')

  const filteredActions = actionItems.filter(action => {
    if (statusFilter !== 'all' && action.status !== statusFilter) return false
    if (ownerFilter !== 'all' && action.owner !== ownerFilter) return false
    return true
  }).sort((a, b) => {
    // Sort by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const stats = {
    total: actionItems.length,
    pending: actionItems.filter(a => a.status === 'pending').length,
    inProgress: actionItems.filter(a => a.status === 'in-progress').length,
    completed: actionItems.filter(a => a.status === 'completed').length,
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
        <h1 className="text-3xl font-bold">Actions Tracker</h1>
        <p className="text-muted-foreground">
          All action items across Q1 deals
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">{stats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Owner:</span>
              <Select 
                value={ownerFilter} 
                onChange={(e) => setOwnerFilter(e.target.value)}
              >
                <option value="all">All Owners</option>
                {owners.map(owner => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Action Items
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredActions.length} items)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Deal</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Owner</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Due Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredActions.map((action) => {
                const deal = getDealById(action.dealId)
                const isOverdue = action.status !== 'completed' && 
                  new Date(action.dueDate) < new Date()
                
                return (
                  <tr 
                    key={action.id} 
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3">
                      <span className={isOverdue ? 'text-red-600' : ''}>
                        {action.action}
                      </span>
                      {isOverdue && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Overdue
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {deal?.accountName || 'Unknown'}
                    </td>
                    <td className="p-3">{action.owner}</td>
                    <td className="p-3">
                      <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                        {formatDate(action.dueDate)}
                      </span>
                    </td>
                    <td className="p-3">{getStatusBadge(action.status)}</td>
                    <td className="p-3">
                      {deal && (
                        <Link 
                          href={`/deal/${deal.id}`}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          View Deal
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No actions match the current filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
