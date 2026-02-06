// Transform MCP deal data to app format
const fs = require('fs');

// Owner to region mapping based on USDM org structure
const ownerRegionMap = {
  // West
  'Mike Campbell': 'west',
  'Justin Ott': 'west',
  'Kim Guihen': 'west',
  
  // East  
  'Lisa Burgese Fry': 'east',
  'Avani Macwan': 'east',
  'Scott Pallardy': 'east',
  'Sherry De Luca': 'east',
  'Hovsep Kirikian': 'east',
  'Jim Macdonell': 'east',
  'Josh Ertmer': 'east',
  'Meghan Rutkowski': 'east',
  'Jeff Burton': 'east',
  'Vega Finucan': 'east',
  'Michelle Dias': 'east',
  'Jim Murray': 'east',
  'Cortney Whitehouse': 'east',
  
  // Europe
  'Marcus Dinan': 'europe',
  'Holger Brämer': 'europe',
};

function getRegion(ownerName) {
  return ownerRegionMap[ownerName] || 'east';
}

function getStageNumber(stageName) {
  if (!stageName) return 1;
  if (stageName.includes('1')) return 1;
  if (stageName.includes('2')) return 2;
  if (stageName.includes('3')) return 3;
  if (stageName.includes('4')) return 4;
  return 1;
}

// Read raw deals from MCP output
const rawPath = __dirname + '/raw-deals.json';
const rawContent = fs.readFileSync(rawPath, 'utf8').trim();
const rawDeals = JSON.parse(rawContent.replace(/^\uFEFF/, ''));

const deals = rawDeals.map((deal, index) => ({
  id: `deal-${String(index + 1).padStart(3, '0')}`,
  opportunityId: deal.opportunityId,
  opportunityName: deal.opportunityName,
  accountName: deal.accountName,
  amount: deal.amount || 0,
  egp: deal.eGP || 0,
  closeDate: deal.closeDate,
  stage: getStageNumber(deal.stageName),
  stageName: deal.stageName,
  owner: deal.ownerName,
  region: getRegion(deal.ownerName),
  forecastCategory: deal.forecastCategory || 'Pipeline',
  daysOpen: deal.daysOpen || 0,
  daysInStage: Math.min(deal.daysOpen || 0, 30),
  reviewed: false
}));

// Sort by stage (4 first) then by amount
deals.sort((a, b) => {
  if (b.stage !== a.stage) return b.stage - a.stage;
  return b.amount - a.amount;
});

console.log(`Transformed ${deals.length} deals`);
console.log(`Stage 4: ${deals.filter(d => d.stage === 4).length}`);
console.log(`Stage 3: ${deals.filter(d => d.stage === 3).length}`);
console.log(`Stage 2: ${deals.filter(d => d.stage === 2).length}`);
console.log(`Stage 1: ${deals.filter(d => d.stage === 1).length}`);
console.log(`West: ${deals.filter(d => d.region === 'west').length}`);
console.log(`East: ${deals.filter(d => d.region === 'east').length}`);
console.log(`Europe: ${deals.filter(d => d.region === 'europe').length}`);

// Output as TypeScript
const output = `// Q1 2026 Full Pipeline Data - Extracted from Sales MCP
// Last updated: ${new Date().toISOString().split('T')[0]}
// Total: ${deals.length} deals | $${(deals.reduce((s,d) => s + d.amount, 0) / 1000000).toFixed(1)}M pipeline | $${(deals.reduce((s,d) => s + d.egp, 0) / 1000000).toFixed(1)}M EGP

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
  meddpicc?: {
    metrics: boolean;
    economicBuyer: boolean;
    decisionCriteria: boolean;
    decisionProcess: boolean;
    paperProcess: boolean;
    identifyPain: boolean;
    champion: boolean;
    competition: boolean;
  };
  notes?: string;
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

export type Region = 'west' | 'east' | 'europe';

// Full pipeline from Sales MCP
export const deals: Deal[] = ${JSON.stringify(deals, null, 2)};

// Action items for Stage 4 deals
export const actionItems: Action[] = deals
  .filter(d => d.stage === 4)
  .slice(0, 20)
  .map((deal, i) => ({
    id: \`action-\${String(i + 1).padStart(3, '0')}\`,
    dealId: deal.id,
    dealName: deal.opportunityName,
    action: deal.forecastCategory === 'Commit' ? 'Confirm close date with customer' : 'Complete MEDDPICC review',
    owner: deal.owner,
    dueDate: new Date(Date.now() + (i + 1) * 86400000).toISOString().split('T')[0],
    status: 'pending' as const
  }));

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
    totalPipeline: regionDeals.reduce((sum, d) => sum + d.amount, 0),
    totalEGP: regionDeals.reduce((sum, d) => sum + d.egp, 0),
    dealCount: regionDeals.length,
    stage4Count: regionDeals.filter(d => d.stage === 4).length,
    stage3Count: regionDeals.filter(d => d.stage === 3).length,
    stage2Count: regionDeals.filter(d => d.stage === 2).length,
    stage1Count: regionDeals.filter(d => d.stage === 1).length,
    reviewedCount: regionDeals.filter(d => d.reviewed).length,
    pendingCount: regionDeals.filter(d => !d.reviewed).length,
  };
}

export function getActionsByDeal(dealId: string): Action[] {
  return actionItems.filter(a => a.dealId === dealId);
}

export function getPipelineSummary() {
  return {
    totalPipeline: deals.reduce((sum, d) => sum + d.amount, 0),
    totalEGP: deals.reduce((sum, d) => sum + d.egp, 0),
    dealCount: deals.length,
    byStage: {
      stage1: deals.filter(d => d.stage === 1).length,
      stage2: deals.filter(d => d.stage === 2).length,
      stage3: deals.filter(d => d.stage === 3).length,
      stage4: deals.filter(d => d.stage === 4).length,
    },
    byRegion: {
      west: deals.filter(d => d.region === 'west').length,
      east: deals.filter(d => d.region === 'east').length,
      europe: deals.filter(d => d.region === 'europe').length,
    },
    reviewedCount: deals.filter(d => d.reviewed).length,
    pendingCount: deals.filter(d => !d.reviewed).length,
  };
}

export function getSortedDeals(sortBy: 'amount' | 'egp' | 'closeDate' | 'stage' = 'stage'): Deal[] {
  return [...deals].sort((a, b) => {
    switch (sortBy) {
      case 'amount': return b.amount - a.amount;
      case 'egp': return b.egp - a.egp;
      case 'closeDate': return new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime();
      case 'stage': 
      default:
        if (b.stage !== a.stage) return b.stage - a.stage;
        return b.amount - a.amount;
    }
  });
}
`;

const outPath = __dirname + '/../src/data/deals.ts';
fs.writeFileSync(outPath, output);
console.log('\\nOutput written to ' + outPath);
