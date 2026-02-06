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

// Scott Pallardy Comprehensive Profile
const scottProfile = {
  gongStats: {
    totalCalls: 73,
    dateRange: 'Aug 2025 - Jan 2026',
    peakWeek: '11/30/2025 (6 calls)',
    avgDuration: '20 min',
  },
  sellingStrengths: [
    'Technical depth - comfortable with complex systems (Codebeamer, Veeva, SAP)',
    'Consultative approach - focuses on lightweight assessments before big commitments',
    'Team selling - brings specialists (Rathina, John, Jim) into calls',
    'AI/Governance expertise - multiple AI governance conversations',
    'Partner relationships - works well with PTC, integrates into partner deals'
  ],
  handoffConcerns: [
    'Long sales cycles - 80% of deals aging 90+ days',
    'Follow-up gaps - dormant accounts suggest relationship maintenance needed',
    'Pipeline hygiene - many Stage 1 deals may need qualification review'
  ],
  topServices: ['AI Governance & Training', 'Validation & Compliance', 'Managed Services (Veeva)', 'UDI/MDR Compliance'],
  internalTeam: [
    { name: 'Rathina G.', role: 'Technical Lead', involvement: 'High' },
    { name: 'John', role: 'Solutions Architect', involvement: 'High' },
    { name: 'Jim Macdonell', role: 'Senior AM', involvement: 'Medium' },
    { name: 'Hovsep Kirikian', role: 'CGO', involvement: 'Medium' },
  ],
  externalContacts: [
    { name: 'Dallis', account: 'Arthrex', note: 'Going on parental leave - get AI list first' },
    { name: 'Ryan', account: 'Enable Injections', note: 'Training Jan 29 - URGENT' },
    { name: 'Mike', account: 'PTC/Zimmer', note: 'Codebeamer expert, partner' },
  ],
};

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

        {/* Scott Pallardy Profile - Selling Style & Relationships */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b bg-indigo-50">
            <h2 className="text-xl font-semibold text-indigo-900 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              Scott Pallardy - Seller Profile Analysis
            </h2>
            <p className="text-sm text-indigo-700 mt-1">Selling style, strengths, and relationship map for seamless handoff</p>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gong Stats */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-3">📊 Gong Activity Summary</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-600">Total Calls:</span> <strong>{scottProfile.gongStats.totalCalls}</strong></div>
                <div><span className="text-gray-600">Period:</span> <strong>{scottProfile.gongStats.dateRange}</strong></div>
                <div><span className="text-gray-600">Peak Week:</span> <strong>{scottProfile.gongStats.peakWeek}</strong></div>
                <div><span className="text-gray-600">Avg Duration:</span> <strong>{scottProfile.gongStats.avgDuration}</strong></div>
              </div>
            </div>

            {/* Top Services */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">🎯 Primary Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {scottProfile.topServices.map((service, i) => (
                  <span key={i} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">{service}</span>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">💪 Selling Strengths</h3>
              <ul className="space-y-2 text-sm">
                {scottProfile.sellingStrengths.map((strength, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Handoff Concerns */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-3">⚠️ Handoff Considerations</h3>
              <ul className="space-y-2 text-sm">
                {scottProfile.handoffConcerns.map((concern, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500">!</span>
                    <span className="text-gray-700">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relationship Map */}
          <div className="p-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">🤝 Key Relationships</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Internal Team */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">USDM Team (involve in handoff calls)</h4>
                <div className="space-y-2">
                  {scottProfile.internalTeam.map((person, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                      <div>
                        <span className="font-medium">{person.name}</span>
                        <span className="text-gray-500 text-sm ml-2">{person.role}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        person.involvement === 'High' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>{person.involvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Contacts */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Key Customer Contacts (critical for transition)</h4>
                <div className="space-y-2">
                  {scottProfile.externalContacts.map((contact, i) => (
                    <div key={i} className="bg-gray-50 rounded px-3 py-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-sm text-indigo-600">{contact.account}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{contact.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salesforce Account Data Export */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b bg-blue-50">
            <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Salesforce Account Summary - Top 15 Accounts
            </h2>
            <p className="text-sm text-blue-700 mt-1">Customer relationships, pipeline status, and handoff notes</p>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Account Name</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Pipeline</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Stage</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Key Contact</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Last Activity</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900">Handoff Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">BioCryst Pharmaceuticals</td>
                  <td className="py-3 px-3 text-red-600 font-semibold">$89K</td>
                  <td className="py-3 px-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Stage 4</span></td>
                  <td className="py-3 px-3 text-gray-600">Jim Burton</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">DocuSign pending</td>
                  <td className="py-3 px-3 text-xs text-gray-600">Close 2/13 - Lisa or Josh</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Therakos</td>
                  <td className="py-3 px-3 text-red-600 font-semibold">$24K</td>
                  <td className="py-3 px-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Stage 4</span></td>
                  <td className="py-3 px-3 text-gray-600">UDI contacts</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">UDI commercials</td>
                  <td className="py-3 px-3 text-xs text-gray-600">Close 2/13 - Jim Macdonell</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">BioAgilytix Labs</td>
                  <td className="py-3 px-3 text-red-600 font-semibold">$70K</td>
                  <td className="py-3 px-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Stage 4</span></td>
                  <td className="py-3 px-3 text-gray-600">QA Mgr</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">Close 2/28</td>
                  <td className="py-3 px-3 text-xs text-gray-600">Expand from existing</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Arthrex</td>
                  <td className="py-3 px-3 text-yellow-600 font-semibold">$56.5K</td>
                  <td className="py-3 px-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Stage 2</span></td>
                  <td className="py-3 px-3 text-gray-600">Dallis (Parental Leave)</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">AI governance proposal</td>
                  <td className="py-3 px-3 text-xs text-gray-600">Project start July - watch for Dallis return</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Enable Injections</td>
                  <td className="py-3 px-3 text-gray-500 font-semibold">$70.9K</td>
                  <td className="py-3 px-3"><span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">LOST</span></td>
                  <td className="py-3 px-3 text-gray-600">Ryan (Enable)</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">No decision on AI training</td>
                  <td className="py-3 px-3 text-xs text-red-600 font-semibold">URGENT: Reach out before Jan 29 training</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Zimmer Biomet</td>
                  <td className="py-3 px-3 text-yellow-600 font-semibold">$35K</td>
                  <td className="py-3 px-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Stage 3</span></td>
                  <td className="py-3 px-3 text-gray-600">Mike (PTC)</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">Codebeamer upgrade</td>
                  <td className="py-3 px-3 text-xs text-gray-600">Technical validation positioning</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-red-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Biogen</td>
                  <td className="py-3 px-3 text-gray-500 font-semibold">$1.5M</td>
                  <td className="py-3 px-3"><span className="bg-red-200 text-red-900 px-2 py-1 rounded text-xs font-semibold">NO PIPELINE</span></td>
                  <td className="py-3 px-3 text-gray-600">Unknown</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">2024 revenue only</td>
                  <td className="py-3 px-3 text-xs text-red-600">⚠️ At-risk account - schedule intro call</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-red-50">
                  <td className="py-3 px-3 font-medium text-gray-900">AbbVie</td>
                  <td className="py-3 px-3 text-gray-500 font-semibold">$744K</td>
                  <td className="py-3 px-3"><span className="bg-red-200 text-red-900 px-2 py-1 rounded text-xs font-semibold">NO PIPELINE</span></td>
                  <td className="py-3 px-3 text-gray-600">Unknown</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">2024 revenue only</td>
                  <td className="py-3 px-3 text-xs text-red-600">⚠️ At-risk account - schedule intro call</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-red-50">
                  <td className="py-3 px-3 font-medium text-gray-900">Atara Biotherapeutics</td>
                  <td className="py-3 px-3 text-gray-500 font-semibold">$1.08M</td>
                  <td className="py-3 px-3"><span className="bg-red-200 text-red-900 px-2 py-1 rounded text-xs font-semibold">NO PIPELINE</span></td>
                  <td className="py-3 px-3 text-gray-600">TBD</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">Dormant</td>
                  <td className="py-3 px-3 text-xs text-red-600">⚠️ Dormant ($1.08M risk) - research contacts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t bg-blue-50 text-sm text-blue-800">
            <p className="font-semibold mb-2">📊 Key Metrics for Transition:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Top 3 Accounts at Risk:</strong> Biogen ($1.5M), Atara ($1.08M), Shire ($1.00M)</li>
              <li><strong>Active Opportunity Window:</strong> 3 Stage 4 deals close within 5 weeks (Feb 13-28)</li>
              <li><strong>Key Contacts Needed:</strong> Enable Injections (Ryan), Arthrex (Dallis), Biogen/AbbVie (TBD)</li>
              <li><strong>Recommended Reassignment:</strong> Lisa Burgese Fry (Enterprise/MedTech) → Biogen + AbbVie intro calls</li>
            </ul>
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
