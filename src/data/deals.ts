export type Stage = 1 | 2 | 3

export type Region = 'west' | 'east' | 'europe'

export interface MeddpiccItem {
  id: string
  label: string
  question: string
  checked: boolean
  notes: string
}

export interface ActionItem {
  id: string
  dealId: string
  description: string
  owner: string
  dueDate: Date
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: Date
}

export interface Deal {
  id: string
  accountName: string
  opportunityName: string
  amount: number
  egp: number
  closeDate: Date
  stage: Stage
  owner: string
  region: Region
  daysInStage: number
  stageEnteredDate: Date
  reviewed: boolean
  meddpicc: MeddpiccItem[]
  notes: string
}

const createMeddpicc = (): MeddpiccItem[] => [
  { id: 'metrics', label: 'Metrics', question: 'Do we understand their success metrics?', checked: false, notes: '' },
  { id: 'economic-buyer', label: 'Economic Buyer', question: 'Have we identified the decision maker?', checked: false, notes: '' },
  { id: 'decision-criteria', label: 'Decision Criteria', question: 'Do we know how they\'ll decide?', checked: false, notes: '' },
  { id: 'decision-process', label: 'Decision Process', question: 'Do we know the timeline/steps?', checked: false, notes: '' },
  { id: 'paper-process', label: 'Paper Process', question: 'Do we understand procurement?', checked: false, notes: '' },
  { id: 'identified-pain', label: 'Identified Pain', question: 'Is there a compelling event?', checked: false, notes: '' },
  { id: 'champion', label: 'Champion', question: 'Do we have an internal advocate?', checked: false, notes: '' },
  { id: 'competition', label: 'Competition', question: 'Do we know who else they\'re talking to?', checked: false, notes: '' },
]

export const deals: Deal[] = [
  // Stage 3 deals (P1 - highest priority) - 6 deals
  {
    id: 'deal-001',
    accountName: 'Genentech',
    opportunityName: 'Q1 Validation Suite Expansion',
    amount: 1850000,
    egp: 925000,
    closeDate: new Date('2026-01-15'),
    stage: 3,
    owner: 'Mike Campbell',
    region: 'west',
    daysInStage: 23,
    stageEnteredDate: new Date('2025-12-20'),
    reviewed: true,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 6 })),
    notes: 'Strong champion in VP of Quality. Budget approved. Legal review in progress.',
  },
  {
    id: 'deal-002',
    accountName: 'Moderna',
    opportunityName: 'Manufacturing QMS Implementation',
    amount: 1200000,
    egp: 720000,
    closeDate: new Date('2026-01-31'),
    stage: 3,
    owner: 'Sarah Johnson',
    region: 'east',
    daysInStage: 18,
    stageEnteredDate: new Date('2025-12-25'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 5 })),
    notes: 'Awaiting final signature from CFO.',
  },
  {
    id: 'deal-003',
    accountName: 'Novartis',
    opportunityName: 'EU Compliance Platform',
    amount: 980000,
    egp: 490000,
    closeDate: new Date('2026-02-05'),
    stage: 3,
    owner: 'Thomas Mueller',
    region: 'europe',
    daysInStage: 30,
    stageEnteredDate: new Date('2025-12-10'),
    reviewed: true,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 7 })),
    notes: 'Contract in legal. Minor redlines pending.',
  },
  {
    id: 'deal-004',
    accountName: 'BioMarin',
    opportunityName: 'Clinical Data Management',
    amount: 750000,
    egp: 375000,
    closeDate: new Date('2026-02-10'),
    stage: 3,
    owner: 'Justin Ott',
    region: 'west',
    daysInStage: 15,
    stageEnteredDate: new Date('2026-01-01'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 4 })),
    notes: 'Verbal commitment received. Waiting on PO.',
  },
  {
    id: 'deal-005',
    accountName: 'Vertex Pharmaceuticals',
    opportunityName: 'Lab Automation Project',
    amount: 620000,
    egp: 372000,
    closeDate: new Date('2026-02-20'),
    stage: 3,
    owner: 'Emily Chen',
    region: 'east',
    daysInStage: 12,
    stageEnteredDate: new Date('2026-01-05'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 5 })),
    notes: 'Budget allocated. Technical review complete.',
  },
  {
    id: 'deal-006',
    accountName: 'Kyverna Therapeutics',
    opportunityName: 'Quality Systems Enhancement',
    amount: 450000,
    egp: 315000,
    closeDate: new Date('2026-03-01'),
    stage: 3,
    owner: 'Mike Campbell',
    region: 'west',
    daysInStage: 8,
    stageEnteredDate: new Date('2026-01-10'),
    reviewed: true,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 6 })),
    notes: 'High growth customer. Previous project successful.',
  },

  // Stage 2 deals (P2 - medium priority) - 8 deals
  {
    id: 'deal-007',
    accountName: 'Amgen',
    opportunityName: 'Document Management Upgrade',
    amount: 890000,
    egp: 445000,
    closeDate: new Date('2026-01-25'),
    stage: 2,
    owner: 'Sarah Johnson',
    region: 'east',
    daysInStage: 35,
    stageEnteredDate: new Date('2025-12-05'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 3 })),
    notes: 'Needs executive sponsor alignment.',
  },
  {
    id: 'deal-008',
    accountName: 'Gilead Sciences',
    opportunityName: 'Regulatory Submission Platform',
    amount: 1100000,
    egp: 550000,
    closeDate: new Date('2026-02-15'),
    stage: 2,
    owner: 'Justin Ott',
    region: 'west',
    daysInStage: 28,
    stageEnteredDate: new Date('2025-12-15'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 4 })),
    notes: 'Competing with Veeva. Need to differentiate on GxP.',
  },
  {
    id: 'deal-009',
    accountName: 'Sanofi',
    opportunityName: 'Global Validation Services',
    amount: 2000000,
    egp: 800000,
    closeDate: new Date('2026-02-28'),
    stage: 2,
    owner: 'Thomas Mueller',
    region: 'europe',
    daysInStage: 45,
    stageEnteredDate: new Date('2025-11-25'),
    reviewed: true,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 5 })),
    notes: 'Large deal. Multi-site deployment. Need internal resources confirmation.',
  },
  {
    id: 'deal-010',
    accountName: 'Regeneron',
    opportunityName: 'Quality Analytics Dashboard',
    amount: 340000,
    egp: 204000,
    closeDate: new Date('2026-03-10'),
    stage: 2,
    owner: 'Emily Chen',
    region: 'east',
    daysInStage: 20,
    stageEnteredDate: new Date('2025-12-28'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 2 })),
    notes: 'New logo opportunity. Decision expected mid-Feb.',
  },
  {
    id: 'deal-011',
    accountName: 'Illumina',
    opportunityName: 'Lab Integration Project',
    amount: 560000,
    egp: 336000,
    closeDate: new Date('2026-03-15'),
    stage: 2,
    owner: 'Mike Campbell',
    region: 'west',
    daysInStage: 14,
    stageEnteredDate: new Date('2026-01-05'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 3 })),
    notes: 'Technical POC scheduled for next week.',
  },
  {
    id: 'deal-012',
    accountName: 'AstraZeneca',
    opportunityName: 'Compliance Training Platform',
    amount: 780000,
    egp: 468000,
    closeDate: new Date('2026-03-20'),
    stage: 2,
    owner: 'Sophie Williams',
    region: 'europe',
    daysInStage: 25,
    stageEnteredDate: new Date('2025-12-20'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 4 })),
    notes: 'RFP response submitted. Shortlisted to top 3.',
  },
  {
    id: 'deal-013',
    accountName: 'Bristol-Myers Squibb',
    opportunityName: 'Data Integrity Initiative',
    amount: 920000,
    egp: 552000,
    closeDate: new Date('2026-03-25'),
    stage: 2,
    owner: 'Sarah Johnson',
    region: 'east',
    daysInStage: 32,
    stageEnteredDate: new Date('2025-12-12'),
    reviewed: true,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 5 })),
    notes: 'Good momentum. Need to secure IT alignment.',
  },
  {
    id: 'deal-014',
    accountName: 'Alexion',
    opportunityName: 'Pharmacovigilance System',
    amount: 410000,
    egp: 246000,
    closeDate: new Date('2026-03-30'),
    stage: 2,
    owner: 'Justin Ott',
    region: 'west',
    daysInStage: 18,
    stageEnteredDate: new Date('2025-12-30'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 2 })),
    notes: 'Early stage but strong interest.',
  },

  // Stage 1 deals (P3 - lower priority) - 6 deals
  {
    id: 'deal-015',
    accountName: 'Bluebird Bio',
    opportunityName: 'CSV Program Development',
    amount: 280000,
    egp: 168000,
    closeDate: new Date('2026-02-12'),
    stage: 1,
    owner: 'Emily Chen',
    region: 'east',
    daysInStage: 42,
    stageEnteredDate: new Date('2025-11-20'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 1 })),
    notes: 'Initial discovery complete. Needs qualification.',
  },
  {
    id: 'deal-016',
    accountName: 'Incyte',
    opportunityName: 'Quality Consulting Engagement',
    amount: 150000,
    egp: 90000,
    closeDate: new Date('2026-02-25'),
    stage: 1,
    owner: 'Mike Campbell',
    region: 'west',
    daysInStage: 30,
    stageEnteredDate: new Date('2025-12-10'),
    reviewed: false,
    meddpicc: createMeddpicc(),
    notes: 'Inbound lead. Scheduled discovery call.',
  },
  {
    id: 'deal-017',
    accountName: 'UCB',
    opportunityName: 'Batch Record Modernization',
    amount: 520000,
    egp: 312000,
    closeDate: new Date('2026-03-05'),
    stage: 1,
    owner: 'Thomas Mueller',
    region: 'europe',
    daysInStage: 15,
    stageEnteredDate: new Date('2026-01-01'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 1 })),
    notes: 'Referral from Novartis. Good potential.',
  },
  {
    id: 'deal-018',
    accountName: 'Jazz Pharmaceuticals',
    opportunityName: 'LIMS Implementation',
    amount: 680000,
    egp: 408000,
    closeDate: new Date('2026-03-12'),
    stage: 1,
    owner: 'Sarah Johnson',
    region: 'east',
    daysInStage: 22,
    stageEnteredDate: new Date('2025-12-22'),
    reviewed: false,
    meddpicc: createMeddpicc().map((item, i) => ({ ...item, checked: i < 2 })),
    notes: 'Competitive situation. They like our approach.',
  },
  {
    id: 'deal-019',
    accountName: 'Seagen',
    opportunityName: 'Tech Transfer Support',
    amount: 95000,
    egp: 57000,
    closeDate: new Date('2026-03-18'),
    stage: 1,
    owner: 'Justin Ott',
    region: 'west',
    daysInStage: 10,
    stageEnteredDate: new Date('2026-01-08'),
    reviewed: false,
    meddpicc: createMeddpicc(),
    notes: 'Small engagement but potential for expansion.',
  },
  {
    id: 'deal-020',
    accountName: 'BioNTech',
    opportunityName: 'GxP Assessment Services',
    amount: 320000,
    egp: 192000,
    closeDate: new Date('2026-03-28'),
    stage: 1,
    owner: 'Sophie Williams',
    region: 'europe',
    daysInStage: 8,
    stageEnteredDate: new Date('2026-01-10'),
    reviewed: false,
    meddpicc: createMeddpicc(),
    notes: 'First engagement with BioNTech. High strategic value.',
  },
]

export const actionItems: ActionItem[] = [
  {
    id: 'action-001',
    dealId: 'deal-001',
    description: 'Follow up on legal redlines with procurement',
    owner: 'Mike Campbell',
    dueDate: new Date('2026-01-12'),
    status: 'in-progress',
    createdAt: new Date('2026-01-08'),
  },
  {
    id: 'action-002',
    dealId: 'deal-002',
    description: 'Schedule CFO meeting for final approval',
    owner: 'Sarah Johnson',
    dueDate: new Date('2026-01-14'),
    status: 'pending',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'action-003',
    dealId: 'deal-003',
    description: 'Send revised pricing proposal',
    owner: 'Thomas Mueller',
    dueDate: new Date('2026-01-11'),
    status: 'completed',
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'action-004',
    dealId: 'deal-004',
    description: 'Coordinate with delivery team on resource availability',
    owner: 'Justin Ott',
    dueDate: new Date('2026-01-15'),
    status: 'pending',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'action-005',
    dealId: 'deal-007',
    description: 'Identify executive sponsor',
    owner: 'Sarah Johnson',
    dueDate: new Date('2026-01-18'),
    status: 'pending',
    createdAt: new Date('2026-01-08'),
  },
  {
    id: 'action-006',
    dealId: 'deal-008',
    description: 'Prepare competitive analysis vs Veeva',
    owner: 'Justin Ott',
    dueDate: new Date('2026-01-16'),
    status: 'in-progress',
    createdAt: new Date('2026-01-06'),
  },
  {
    id: 'action-007',
    dealId: 'deal-009',
    description: 'Confirm internal staffing for multi-site deployment',
    owner: 'Thomas Mueller',
    dueDate: new Date('2026-01-20'),
    status: 'pending',
    createdAt: new Date('2026-01-12'),
  },
  {
    id: 'action-008',
    dealId: 'deal-011',
    description: 'Prepare POC environment and demo script',
    owner: 'Mike Campbell',
    dueDate: new Date('2026-01-14'),
    status: 'in-progress',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'action-009',
    dealId: 'deal-005',
    description: 'Send SOW for signature',
    owner: 'Emily Chen',
    dueDate: new Date('2026-01-13'),
    status: 'pending',
    createdAt: new Date('2026-01-11'),
  },
  {
    id: 'action-010',
    dealId: 'deal-006',
    description: 'Review contract terms with legal',
    owner: 'Mike Campbell',
    dueDate: new Date('2026-01-15'),
    status: 'pending',
    createdAt: new Date('2026-01-12'),
  },
]

// Helper functions
export function getDealById(id: string): Deal | undefined {
  return deals.find(deal => deal.id === id)
}

export function getDealsByRegion(region: Region): Deal[] {
  return deals.filter(deal => deal.region === region)
}

export function getDealsByStage(stage: Stage): Deal[] {
  return deals.filter(deal => deal.stage === stage)
}

export function getActionsByDeal(dealId: string): ActionItem[] {
  return actionItems.filter(action => action.dealId === dealId)
}

export function getSortedDeals(): Deal[] {
  return [...deals].sort((a, b) => {
    // First sort by stage DESC (3 > 2 > 1)
    if (b.stage !== a.stage) return b.stage - a.stage
    // Then by amount DESC
    return b.amount - a.amount
  })
}

export function getRegionMetrics(region: Region) {
  const regionDeals = getDealsByRegion(region)
  const totalPipeline = regionDeals.reduce((sum, deal) => sum + deal.amount, 0)
  const totalEgp = regionDeals.reduce((sum, deal) => sum + deal.egp, 0)
  const avgDealSize = regionDeals.length > 0 ? totalPipeline / regionDeals.length : 0
  const avgDaysToClose = regionDeals.length > 0 
    ? regionDeals.reduce((sum, deal) => sum + daysUntilClose(deal.closeDate), 0) / regionDeals.length 
    : 0
  
  return {
    totalPipeline,
    totalEgp,
    dealCount: regionDeals.length,
    avgDealSize,
    avgDaysToClose: Math.round(avgDaysToClose),
    reviewed: regionDeals.filter(d => d.reviewed).length,
    pending: regionDeals.filter(d => !d.reviewed).length,
  }
}

function daysUntilClose(closeDate: Date): number {
  const now = new Date()
  const diff = closeDate.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function getPipelineSummary() {
  const totalPipeline = deals.reduce((sum, deal) => sum + deal.amount, 0)
  const totalEgp = deals.reduce((sum, deal) => sum + deal.egp, 0)
  const reviewed = deals.filter(d => d.reviewed).length
  const pending = deals.filter(d => !d.reviewed).length

  const byStage = {
    stage3: getDealsByStage(3),
    stage2: getDealsByStage(2),
    stage1: getDealsByStage(1),
  }

  const byRegion = {
    west: getRegionMetrics('west'),
    east: getRegionMetrics('east'),
    europe: getRegionMetrics('europe'),
  }

  return {
    totalPipeline,
    totalEgp,
    dealCount: deals.length,
    reviewed,
    pending,
    byStage,
    byRegion,
  }
}
