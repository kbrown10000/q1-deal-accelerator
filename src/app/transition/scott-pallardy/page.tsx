'use client';

import { deals } from '@/data/deals';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { 
  ArrowLeft, AlertTriangle, Users, Building2, Clock, UserMinus, CheckCircle
} from 'lucide-react';

// Scott's deals
const scottDeals = deals.filter(d => d.owner === 'Scott Pallardy');
const totalPipeline = scottDeals.reduce((sum, d) => sum + d.amount, 0);
const totalEGP = scottDeals.reduce((sum, d) => sum + d.egp, 0);

// Stage breakdown
const stage4 = scottDeals.filter(d => d.stage === 4);
const stage3 = scottDeals.filter(d => d.stage === 3);
const stage2 = scottDeals.filter(d => d.stage === 2);
const stage1 = scottDeals.filter(d => d.stage === 1);

// Account concentration
const byAccount: Record<string, { deals: typeof scottDeals; amount: number; egp: number }> = {};
scottDeals.forEach(d => {
  if (!byAccount[d.accountName]) {
    byAccount[d.accountName] = { deals: [], amount: 0, egp: 0 };
  }
  byAccount[d.accountName].deals.push(d);
  byAccount[d.accountName].amount += d.amount;
  byAccount[d.accountName].egp += d.egp;
});

const topAccounts = Object.entries(byAccount)
  .sort((a, b) => b[1].amount - a[1].amount)
  .slice(0, 15);

// Urgent deals (closing soon or high value)
const urgentDeals = scottDeals
  .filter(d => d.stage >= 3 || d.amount >= 200000)
  .sort((a, b) => b.stage - a.stage || b.amount - a.amount);

// Aging analysis
const aging90 = scottDeals.filter(d => (d.daysOpen || 0) > 90);
const aging180 = scottDeals.filter(d => (d.daysOpen || 0) > 180);

// Dormant accounts (2024 revenue, no pipeline) - hardcoded from analysis
const dormantAccounts = [
  { name: 'Atara Biotherapeutics', revenue2024: 1078000 },
  { name: 'Shire US Inc.', revenue2024: 1003000 },
  { name: 'Becton Dickinson and Company', revenue2024: 619000 },
  { name: 'Autolus, LTD', revenue2024: 605000 },
  { name: 'Spectranetics Corporation', revenue2024: 396000 },
  { name: 'Santen Incorporated', revenue2024: 352000 },
];

// Recommended assignees based on East region reps
const recommendedAssignees = [
  { name: 'Lisa Burgese Fry', strength: 'Enterprise accounts, MedTech' },
  { name: 'Avani Macwan', strength: 'Pharma, emerging biotech' },
  { name: 'Josh Ertmer', strength: 'Technical sales, Takeda relationship' },
  { name: 'Jim Macdonell', strength: 'Large deals, complex negotiations' },
];

// Gong call insights (extracted from Gong search)
const gongInsights = [
  {
    account: 'Arthrex',
    callTitle: 'AI Readiness and Regulatory Strategy Discussion',
    date: 'Jan 16, 2026',
    duration: '18m',
    participants: 'Scott, Rathina, John, Hovsep + Dallis (Arthrex)',
    deal: '$56,520 Stage 2',
    keyInsight: 'AI governance proposal. Project start July due to Dallis parental leave. Dallis will provide AI solutions list.',
    actionItems: ['Prepare lightweight AI assessment proposal', 'Wait for AI solutions list from Arthrex'],
    risk: 'medium'
  },
  {
    account: 'Enable Injections',
    callTitle: 'Kick-Off Meeting - AI Governance',
    date: 'Jan 8, 2026',
    duration: '21m',
    participants: 'Scott, Aqeel, John + Ryan (Enable)',
    deal: '$70,900 LOST - No Decision',
    keyInsight: 'AI governance and training support project. Live training target Jan 29th.',
    actionItems: ['Live training session Jan 29', 'Weekly calls scheduled', 'SAP Analytics Cloud validation inquiry'],
    risk: 'high'
  },
  {
    account: 'Zimmer Biomet',
    callTitle: 'PTC Codebeamer alignment',
    date: 'Jan 8, 2026',
    duration: '34m',
    participants: 'Scott, Jim, Joe + Mike (PTC)',
    deal: '$35,000 Stage 3',
    keyInsight: 'Codebeamer upgrade complexity, working sets feature, transition to Codebeamer Plus and Windchill Plus.',
    actionItems: ['Validation and compliance expertise positioning'],
    risk: 'low'
  },
  {
    account: 'Therakos',
    callTitle: 'USDM UDI Commercials',
    date: 'Jan 16, 2026',
    duration: '17m',
    participants: 'Jim Macdonell + 4 more',
    deal: 'Mallinckrodt Pharma related',
    keyInsight: 'UDI commercials discussion',
    actionItems: ['Follow up on UDI requirements'],
    risk: 'medium'
  }
];

export default function ScottTransitionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Header */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <UserMinus className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">TRANSITION ALERT: Scott Pallardy</h1>
              <p className="text-red-100">Account Executive - East Region | Resignation Effective</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Executive Summary */}
        <div className="bg-white rounded-xl shadow-sm border mb-8 overflow-hidden">
          <div className="bg-red-50 p-6 border-b border-red-100">
            <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Executive Summary
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-900">{scottDeals.length}</div>
                <div className="text-sm text-blue-700">Open Deals</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-900">{formatCurrency(totalPipeline)}</div>
                <div className="text-sm text-green-700">Total Pipeline</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-900">{formatCurrency(totalEGP)}</div>
                <div className="text-sm text-purple-700">Total EGP</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-900">{Object.keys(byAccount).length}</div>
                <div className="text-sm text-orange-700">Accounts</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚡ Immediate Actions Required</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• <strong>Stage 4 deals ({stage4.length})</strong>: Assign immediately - {formatCurrency(stage4.reduce((s,d) => s+d.amount, 0))} at risk</li>
                <li>• <strong>Customer intros</strong>: Schedule transition calls for top 10 accounts within 5 business days</li>
                <li>• <strong>Knowledge transfer</strong>: Document account histories, key contacts, active negotiations</li>
                <li>• <strong>Gong review</strong>: Export all Scott&apos;s call recordings for reference</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pipeline by Stage */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-l-4 border-l-green-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Stage 4 - Commit</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">CRITICAL</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stage4.length} deals</div>
            <div className="text-lg text-green-600">{formatCurrency(stage4.reduce((s,d) => s+d.amount, 0))}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Stage 3 - Solution</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">HIGH</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stage3.length} deals</div>
            <div className="text-lg text-blue-600">{formatCurrency(stage3.reduce((s,d) => s+d.amount, 0))}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-l-4 border-l-yellow-500">
            <div className="text-sm font-medium text-gray-500 mb-2">Stage 2 - Qualify</div>
            <div className="text-2xl font-bold text-gray-900">{stage2.length} deals</div>
            <div className="text-lg text-yellow-600">{formatCurrency(stage2.reduce((s,d) => s+d.amount, 0))}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-l-4 border-l-gray-400">
            <div className="text-sm font-medium text-gray-500 mb-2">Stage 1 - Source</div>
            <div className="text-2xl font-bold text-gray-900">{stage1.length} deals</div>
            <div className="text-lg text-gray-600">{formatCurrency(stage1.reduce((s,d) => s+d.amount, 0))}</div>
          </div>
        </div>

        {/* Recommended Assignees */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Recommended Transition Assignees
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedAssignees.map((assignee, idx) => (
                <div key={assignee.name} className={`p-4 rounded-lg border-2 ${idx === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{assignee.name}</div>
                      <div className="text-sm text-gray-600">{assignee.strength}</div>
                    </div>
                    {idx === 0 && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">PRIMARY</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gong Call Insights */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Gong Call Intelligence - 73 Total Calls
            </h2>
            <p className="text-sm text-purple-700 mt-1">Recent customer conversations with critical transition insights</p>
          </div>
          <div className="p-6 space-y-6">
            {gongInsights.map((call, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-2 ${
                call.risk === 'high' ? 'border-red-300 bg-red-50' : 
                call.risk === 'medium' ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{call.account}</h3>
                    <p className="text-sm text-gray-600">{call.callTitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{call.date}</div>
                    <div className="text-xs text-gray-500">{call.duration}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">Participants: {call.participants}</div>
                <div className="text-sm mb-2"><strong>Deal:</strong> {call.deal}</div>
                <div className="bg-white p-3 rounded border mb-2">
                  <div className="text-sm"><strong>💡 Key Insight:</strong> {call.keyInsight}</div>
                </div>
                <div className="text-sm">
                  <strong>Action Items:</strong>
                  <ul className="list-disc list-inside ml-2 mt-1">
                    {call.actionItems.map((item, i) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="text-center pt-4 border-t">
              <a 
                href="https://us-43678.app.gong.io/conversations?workspace-id=4064186953102049058&callSearch=%7B%22search%22%3A%7B%22type%22%3A%22And%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22Participants%22%2C%22userIds%22%3A%5B%22scott%22%5D%7D%5D%7D%7D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View all 73 calls in Gong →
              </a>
            </div>
          </div>
        </div>

        {/* Urgent Deals - Stage 4 & High Value */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b bg-red-50">
            <h2 className="text-xl font-semibold text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Priority Deals for Immediate Transition ({urgentDeals.length})
            </h2>
            <p className="text-sm text-red-700 mt-1">Stage 3+ or $200K+ - requires immediate assignment</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Account</th>
                  <th className="text-left p-4 font-medium text-gray-600">Opportunity</th>
                  <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                  <th className="text-right p-4 font-medium text-gray-600">EGP</th>
                  <th className="text-center p-4 font-medium text-gray-600">Stage</th>
                  <th className="text-center p-4 font-medium text-gray-600">Close Date</th>
                  <th className="text-center p-4 font-medium text-gray-600">Days Open</th>
                  <th className="text-center p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {urgentDeals.slice(0, 20).map((deal) => (
                  <tr key={deal.id} className={`border-t ${deal.stage === 4 ? 'bg-green-50' : deal.stage === 3 ? 'bg-blue-50' : ''}`}>
                    <td className="p-4 font-medium text-gray-900">{deal.accountName}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={deal.opportunityName}>
                      {deal.opportunityName}
                    </td>
                    <td className="p-4 text-right font-semibold">{formatCurrency(deal.amount)}</td>
                    <td className="p-4 text-right">{deal.egp > 0 ? formatCurrency(deal.egp) : '—'}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        deal.stage === 4 ? 'bg-green-600 text-white' : 
                        deal.stage === 3 ? 'bg-blue-600 text-white' : 'bg-yellow-500 text-white'
                      }`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="p-4 text-center">{deal.closeDate}</td>
                    <td className="p-4 text-center">
                      <span className={(deal.daysOpen || 0) > 90 ? 'text-red-600 font-medium' : ''}>
                        {deal.daysOpen}d
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link href={`/deal/${deal.id}`} className="text-blue-600 hover:underline font-medium">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Accounts */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              Top 15 Accounts by Pipeline
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Account</th>
                  <th className="text-center p-4 font-medium text-gray-600">Deals</th>
                  <th className="text-right p-4 font-medium text-gray-600">Pipeline</th>
                  <th className="text-right p-4 font-medium text-gray-600">EGP</th>
                  <th className="text-center p-4 font-medium text-gray-600">Top Stage</th>
                  <th className="text-left p-4 font-medium text-gray-600">Transition Notes</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map(([account, data], idx) => {
                  const topStage = Math.max(...data.deals.map(d => d.stage));
                  return (
                    <tr key={account} className={`border-t ${idx < 5 ? 'bg-yellow-50' : ''}`}>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{account}</div>
                        {idx < 5 && <span className="text-xs text-yellow-700">Top 5 Account</span>}
                      </td>
                      <td className="p-4 text-center">{data.deals.length}</td>
                      <td className="p-4 text-right font-semibold">{formatCurrency(data.amount)}</td>
                      <td className="p-4 text-right">{formatCurrency(data.egp)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          topStage === 4 ? 'bg-green-600 text-white' : 
                          topStage === 3 ? 'bg-blue-600 text-white' : 
                          topStage === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'
                        }`}>
                          Stage {topStage}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {topStage >= 3 ? '⚠️ Active deal - intro call needed' : 'Standard transition'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dormant Accounts - Churn Risk */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b bg-orange-50">
            <h2 className="text-xl font-semibold text-orange-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Dormant Accounts - Churn Risk
            </h2>
            <p className="text-sm text-orange-700 mt-1">2024 revenue but NO current pipeline - need reactivation outreach</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Account</th>
                  <th className="text-right p-4 font-medium text-gray-600">2024 Revenue</th>
                  <th className="text-left p-4 font-medium text-gray-600">Risk Level</th>
                  <th className="text-left p-4 font-medium text-gray-600">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {dormantAccounts.map((acct) => (
                  <tr key={acct.name} className="border-t">
                    <td className="p-4 font-medium text-gray-900">{acct.name}</td>
                    <td className="p-4 text-right font-semibold text-orange-600">{formatCurrency(acct.revenue2024)}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                        HIGH - No Pipeline
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      Immediate outreach to maintain relationship
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-orange-50 border-t">
              <div className="text-lg font-semibold text-orange-900">
                Total At-Risk Revenue: {formatCurrency(dormantAccounts.reduce((s, a) => s + a.revenue2024, 0))}
              </div>
            </div>
          </div>
        </div>

        {/* Transition Checklist */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Transition Checklist
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📋 Immediate (Days 1-3)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Assign all Stage 4 deals to new owner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Export Gong call recordings for top 10 accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Schedule knowledge transfer sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Document key contact relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Transfer Salesforce opportunity ownership</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📞 Week 1 Customer Outreach</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Biogen - $1.5M pipeline, active RFP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>AbbVie - $744K pipeline, multiple deals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Arthrex - $731K pipeline, 5 opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>BioCryst - $632K pipeline, CA expansion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Zimmer Biomet - $400K pipeline, strategic</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Aging Analysis */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              Pipeline Health Warning
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-900">{aging90.length} deals</div>
                <div className="text-sm text-yellow-700">90+ days old</div>
                <div className="text-lg font-semibold text-yellow-800 mt-1">
                  {formatCurrency(aging90.reduce((s,d) => s+d.amount, 0))}
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-900">{aging180.length} deals</div>
                <div className="text-sm text-red-700">180+ days old</div>
                <div className="text-lg font-semibold text-red-800 mt-1">
                  {formatCurrency(aging180.reduce((s,d) => s+d.amount, 0))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> {((aging90.length / scottDeals.length) * 100).toFixed(0)}% of Scott&apos;s pipeline is 90+ days old. 
              New owner should prioritize qualifying or closing these aging deals to prevent further decay.
            </p>
          </div>
        </div>

        {/* Data Source */}
        <div className="text-center text-sm text-gray-400 mb-8">
          Data source: Sales MCP → get_open_pipeline_deals | Finance MCP → get_customer_ltv | Generated: Feb 6, 2026
        </div>
      </div>
    </div>
  );
}
