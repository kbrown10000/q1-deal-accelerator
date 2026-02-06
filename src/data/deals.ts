// Q1 2026 Real Pipeline Data - Extracted from Sales MCP
// Last updated: 2026-02-05

export interface Deal {
  id: string;
  opportunityId?: string;
  opportunityName: string;
  accountName: string;
  amount: number;
  egp: number;
  closeDate: string;
  stage: number;
  stageName?: string;
  owner: string;
  region: 'west' | 'east' | 'europe';
  forecastCategory?: string;
  daysOpen?: number;
  daysInStage?: number;
  reviewed: boolean;
}

export interface Action {
  id: string;
  dealId: string;
  dealName: string;
  action: string;
  owner: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
}

// Real Q1 2026 deals from Sales MCP
export const deals: Deal[] = [
  {
    id: "deal-001",
    opportunityId: "006Vo00000qORIwIAO",
    opportunityName: "Takeda Data Scientist",
    accountName: "Takeda Pharmaceuticals",
    amount: 200000,
    egp: 50000,
    closeDate: "2026-01-31",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Vega Finucan",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 125,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-002",
    opportunityId: "006Vo00000CuO0jIAF",
    opportunityName: "J&J Medtech Labvantage Implementation",
    accountName: "J&J MedTech",
    amount: 200000,
    egp: 90000,
    closeDate: "2026-03-13",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Jim Macdonell",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 450,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-003",
    opportunityId: "006Vo00000Lpnx7IAB",
    opportunityName: "Halozyme ERP Validation and Cloud Assurance",
    accountName: "Halozyme, Inc.",
    amount: 200000,
    egp: 90000,
    closeDate: "2026-03-31",
    stage: 1,
    stageName: "1 Sourcing The Lead",
    owner: "Mike Campbell",
    region: "west",
    forecastCategory: "Pipeline",
    daysOpen: 335,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-004",
    opportunityId: "006Vo00001C7yOEIAZ",
    opportunityName: "EU-Windward Bio- Microsoft Data Management & Azure AD",
    accountName: "Windward Bio AG",
    amount: 204250,
    egp: 81700,
    closeDate: "2026-03-27",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Marcus Dinan",
    region: "europe",
    forecastCategory: "Pipeline",
    daysOpen: 8,
    daysInStage: 8,
    reviewed: false
  },
  {
    id: "deal-005",
    opportunityId: "006Vo00000zlT9tIAE",
    opportunityName: "Abbott ProcessX Impact Assessment and DoEO",
    accountName: "Abbott Laboratories Pacific",
    amount: 221660,
    egp: 88664,
    closeDate: "2026-03-20",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Lisa Burgese Fry",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 80,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-006",
    opportunityId: "006Vo00000yTP8iIAG",
    opportunityName: "Cytokinetics Technical And Validation",
    accountName: "Cytokinetics, Inc.",
    amount: 200000,
    egp: 50000,
    closeDate: "2026-02-28",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Mike Campbell",
    region: "west",
    forecastCategory: "Pipeline",
    daysOpen: 87,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-007",
    opportunityId: "006Vo0000132CMDIA2",
    opportunityName: "Nektar Clinical Supply Management",
    accountName: "Nektar Therapeutics",
    amount: 200000,
    egp: 50000,
    closeDate: "2026-02-28",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Mike Campbell",
    region: "west",
    forecastCategory: "Pipeline",
    daysOpen: 62,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-008",
    opportunityId: "006Vo00001D1g3dIAB",
    opportunityName: "Regulatory Specialist 2-2026",
    accountName: "Integra Lifesciences",
    amount: 250000,
    egp: 62500,
    closeDate: "2026-02-27",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Jim Macdonell",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 3,
    daysInStage: 3,
    reviewed: false
  },
  {
    id: "deal-009",
    opportunityId: "006Vo00001A8WnfIAF",
    opportunityName: "Takeda - 2 JDE C2C resources",
    accountName: "Takeda Pharmaceuticals",
    amount: 200000,
    egp: 50000,
    closeDate: "2026-02-06",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Vega Finucan",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 20,
    daysInStage: 20,
    reviewed: false
  },
  {
    id: "deal-010",
    opportunityId: "006Vo00000o0nNQIAY",
    opportunityName: "BMS ProcessX Moda Change Control",
    accountName: "Bristol-Myers Squibb Company",
    amount: 250000,
    egp: 112500,
    closeDate: "2026-02-28",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Michelle Dias",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 140,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-011",
    opportunityId: "006Vo00000kBJhZIAW",
    opportunityName: "Ionis AI Inspection Readiness MVP - SOW25",
    accountName: "Ionis Pharmaceuticals, Inc.",
    amount: 209800,
    egp: 83920,
    closeDate: "2026-02-13",
    stage: 3,
    stageName: "4 Gaining Commitment",
    owner: "Mike Campbell",
    region: "west",
    forecastCategory: "Commit",
    daysOpen: 163,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-012",
    opportunityId: "006Vo00001CgDvwIAF",
    opportunityName: "Takeda Labware Phase III (A Nallaswami)",
    accountName: "Takeda Pharmaceuticals",
    amount: 301600,
    egp: 78416,
    closeDate: "2026-02-27",
    stage: 3,
    stageName: "4 Gaining Commitment Staffing",
    owner: "Josh Ertmer",
    region: "east",
    forecastCategory: "Commit",
    daysOpen: 6,
    daysInStage: 6,
    reviewed: false
  },
  {
    id: "deal-013",
    opportunityId: "006Vo000010RfMmIAK",
    opportunityName: "Supernus Servicenow ITSM implementation & licenses",
    accountName: "Supernus Pharmaceuticals, Inc.",
    amount: 250000,
    egp: 112500,
    closeDate: "2026-03-06",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Lisa Burgese Fry",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 77,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-014",
    opportunityId: "006Vo00000VI0vqIAD",
    opportunityName: "Arthrex - CDMS Implementation and Validation",
    accountName: "Arthrex",
    amount: 250000,
    egp: 112500,
    closeDate: "2026-03-31",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Scott Pallardy",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 254,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-015",
    opportunityId: "006Vo00000EFqpUIAT",
    opportunityName: "EU-Basilea-Managed Services",
    accountName: "Basilea Pharmaceutica International",
    amount: 279400,
    egp: 111760,
    closeDate: "2026-03-27",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Marcus Dinan",
    region: "europe",
    forecastCategory: "Pipeline",
    daysOpen: 422,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-016",
    opportunityId: "006Vo000011CFv7IAG",
    opportunityName: "Bausch Health GLIMS Platform: Deployment & Operations-CR2",
    accountName: "Bausch Health US, LLC",
    amount: 462700,
    egp: 185080,
    closeDate: "2026-02-27",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Avani Macwan",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 72,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-017",
    opportunityId: "006Vo00001BwdtUIAR",
    opportunityName: "Argenx Third Party Vendor Managed Services-CR2",
    accountName: "argenx BV",
    amount: 360000,
    egp: 144000,
    closeDate: "2026-01-27",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Lisa Burgese Fry",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 9,
    daysInStage: 9,
    reviewed: false
  },
  {
    id: "deal-018",
    opportunityId: "006Vo00000lsoPmIAI",
    opportunityName: "BioCryst - Cloud Assurance and Managed Services",
    accountName: "BioCryst Pharmaceuticals, Inc.",
    amount: 318000,
    egp: 127200,
    closeDate: "2026-03-31",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Scott Pallardy",
    region: "east",
    forecastCategory: "Best Case",
    daysOpen: 153,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-019",
    opportunityId: "006Vo000015DTwrIAG",
    opportunityName: "Biogen - Global Audits RFP - 2026",
    accountName: "Biogen U.S. Corporation",
    amount: 1000000,
    egp: 450000,
    closeDate: "2026-03-13",
    stage: 3,
    stageName: "3 Developing And Presenting Solution",
    owner: "Scott Pallardy",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 50,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-020",
    opportunityId: "006Vo00000tdihRIAQ",
    opportunityName: "Kailera - 2026 MSP Support",
    accountName: "Kailera Therapeutics",
    amount: 400000,
    egp: 180000,
    closeDate: "2026-01-30",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Hovsep Kirikian",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 108,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-021",
    opportunityId: "006Vo00000RSzLxIAL",
    opportunityName: "Ironwood - CRO Assurance",
    accountName: "Ironwood Pharmaceuticals",
    amount: 264000,
    egp: 118800,
    closeDate: "2026-02-11",
    stage: 1,
    stageName: "1 Sourcing The Lead",
    owner: "Sherry De Luca",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 283,
    daysInStage: 45,
    reviewed: false
  },
  {
    id: "deal-022",
    opportunityId: "006Vo00001Cd0tZIAR",
    opportunityName: "Aerogen Oracle SCM Cloud Assurance",
    accountName: "AEROGEN LIMITED",
    amount: 250000,
    egp: 112500,
    closeDate: "2026-03-31",
    stage: 1,
    stageName: "1 Sourcing The Lead",
    owner: "Kim Guihen",
    region: "europe",
    forecastCategory: "Pipeline",
    daysOpen: 6,
    daysInStage: 6,
    reviewed: false
  },
  {
    id: "deal-023",
    opportunityId: "006Vo00001DWDRyIAP",
    opportunityName: "Amgen - Veeva QMS Implementation Consultant",
    accountName: "Amgen Inc.",
    amount: 250000,
    egp: 62500,
    closeDate: "2026-03-06",
    stage: 2,
    stageName: "2 Qualifying Opportunity",
    owner: "Josh Ertmer",
    region: "east",
    forecastCategory: "Pipeline",
    daysOpen: 1,
    daysInStage: 1,
    reviewed: false
  }
];

// Action items for Q1 deals - to be populated during reviews
export const actions: Action[] = [
  {
    id: "action-001",
    dealId: "deal-009",
    dealName: "Takeda - 2 JDE C2C resources",
    action: "URGENT: Close date is tomorrow (2/6) - confirm go/no-go with Vega",
    owner: "Vega Finucan",
    dueDate: "2026-02-05",
    status: "overdue"
  },
  {
    id: "action-002",
    dealId: "deal-020",
    dealName: "Kailera - 2026 MSP Support",
    action: "PAST DUE: Close date was 1/30 - get status from Hovsep",
    owner: "Hovsep Kirikian",
    dueDate: "2026-02-05",
    status: "overdue"
  },
  {
    id: "action-003",
    dealId: "deal-017",
    dealName: "Argenx Managed Services",
    action: "PAST DUE: Close date was 1/27 - update forecast or close",
    owner: "Lisa Burgese Fry",
    dueDate: "2026-02-05",
    status: "overdue"
  },
  {
    id: "action-004",
    dealId: "deal-011",
    dealName: "Ionis AI Inspection Readiness",
    action: "Commit deal closing 2/13 - confirm signature timeline",
    owner: "Mike Campbell",
    dueDate: "2026-02-10",
    status: "pending"
  },
  {
    id: "action-005",
    dealId: "deal-012",
    dealName: "Takeda Labware Phase III",
    action: "Commit deal closing 2/27 - confirm staffing availability",
    owner: "Josh Ertmer",
    dueDate: "2026-02-15",
    status: "pending"
  },
  {
    id: "action-006",
    dealId: "deal-019",
    dealName: "Biogen Global Audits RFP",
    action: "$1M deal - schedule executive sponsor call",
    owner: "Scott Pallardy",
    dueDate: "2026-02-12",
    status: "pending"
  },
  {
    id: "action-007",
    dealId: "deal-002",
    dealName: "J&J Medtech Labvantage",
    action: "STALE: 450 days open - validate or kill",
    owner: "Jim Macdonell",
    dueDate: "2026-02-10",
    status: "pending"
  },
  {
    id: "action-008",
    dealId: "deal-015",
    dealName: "EU-Basilea Managed Services",
    action: "STALE: 422 days open - validate or kill",
    owner: "Marcus Dinan",
    dueDate: "2026-02-10",
    status: "pending"
  }
];

// Alias for backwards compatibility
export const actionItems = actions;

// Type exports
export type Region = 'west' | 'east' | 'europe';

// Helper functions
export function getDealById(id: string): Deal | undefined {
  return deals.find(d => d.id === id);
}

export function getDealsByRegion(region: Region): Deal[] {
  return deals.filter(d => d.region === region);
}

export function getRegionMetrics(region: Region) {
  const regionDeals = getDealsByRegion(region);
  return {
    dealCount: regionDeals.length,
    totalAmount: regionDeals.reduce((sum, d) => sum + d.amount, 0),
    totalEgp: regionDeals.reduce((sum, d) => sum + d.egp, 0),
    avgDealSize: regionDeals.length > 0 
      ? regionDeals.reduce((sum, d) => sum + d.amount, 0) / regionDeals.length 
      : 0,
    avgDaysOpen: regionDeals.length > 0
      ? regionDeals.reduce((sum, d) => sum + (d.daysOpen || 0), 0) / regionDeals.length
      : 0,
    byStage: {
      stage1: regionDeals.filter(d => d.stage === 1).length,
      stage2: regionDeals.filter(d => d.stage === 2).length,
      stage3: regionDeals.filter(d => d.stage === 3).length,
    }
  };
}

export function getActionsByDeal(dealId: string): Action[] {
  return actions.filter(a => a.dealId === dealId);
}

export function getPipelineSummary() {
  return pipelineSummary;
}

export function getSortedDeals(): Deal[] {
  return [...deals].sort((a, b) => {
    // Sort by stage descending (3 first, then 2, then 1)
    if (b.stage !== a.stage) return b.stage - a.stage;
    // Then by amount descending
    return b.amount - a.amount;
  });
}

// Summary stats
export const pipelineSummary = {
  totalDeals: deals.length,
  totalAmount: deals.reduce((sum, d) => sum + d.amount, 0),
  totalEgp: deals.reduce((sum, d) => sum + d.egp, 0),
  byStage: {
    stage1: deals.filter(d => d.stage === 1).length,
    stage2: deals.filter(d => d.stage === 2).length,
    stage3: deals.filter(d => d.stage === 3).length,
  },
  byRegion: {
    west: deals.filter(d => d.region === 'west').length,
    east: deals.filter(d => d.region === 'east').length,
    europe: deals.filter(d => d.region === 'europe').length,
  },
  commitDeals: deals.filter(d => d.forecastCategory === 'Commit'),
  staleDeals: deals.filter(d => (d.daysOpen || 0) > 200),
  urgentDeals: deals.filter(d => {
    const closeDate = new Date(d.closeDate);
    const today = new Date();
    const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilClose <= 7;
  })
};
