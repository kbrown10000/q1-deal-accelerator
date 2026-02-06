import { deals } from '@/data/deals';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Target, DollarSign, Clock, Building2 } from 'lucide-react';

// Generate static params for all owners
export function generateStaticParams() {
  const owners = Array.from(new Set(deals.map(d => d.owner)));
  return owners.map(owner => ({
    name: owner.toLowerCase().replace(/\s+/g, '-')
  }));
}

function getOwnerFromSlug(slug: string): string | null {
  const owners = Array.from(new Set(deals.map(d => d.owner)));
  return owners.find(o => o.toLowerCase().replace(/\s+/g, '-') === slug) || null;
}

export default async function OwnerPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const ownerName = getOwnerFromSlug(name);
  
  if (!ownerName) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600">Owner not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const ownerDeals = deals.filter(d => d.owner === ownerName);
  const totalPipeline = ownerDeals.reduce((sum, d) => sum + d.amount, 0);
  const totalEGP = ownerDeals.reduce((sum, d) => sum + d.egp, 0);
  const avgDaysOpen = Math.round(ownerDeals.reduce((sum, d) => sum + (d.daysOpen || 0), 0) / ownerDeals.length);
  
  // Stage breakdown
  const byStage = [4, 3, 2, 1].map(stage => {
    const stageDeals = ownerDeals.filter(d => d.stage === stage);
    return {
      stage,
      count: stageDeals.length,
      amount: stageDeals.reduce((sum, d) => sum + d.amount, 0),
      egp: stageDeals.reduce((sum, d) => sum + d.egp, 0)
    };
  }).filter(s => s.count > 0);

  // Account concentration
  const byAccount: Record<string, { count: number; amount: number; egp: number }> = {};
  ownerDeals.forEach(d => {
    if (!byAccount[d.accountName]) {
      byAccount[d.accountName] = { count: 0, amount: 0, egp: 0 };
    }
    byAccount[d.accountName].count++;
    byAccount[d.accountName].amount += d.amount;
    byAccount[d.accountName].egp += d.egp;
  });
  const topAccounts = Object.entries(byAccount)
    .sort((a, b) => b[1].amount - a[1].amount)
    .slice(0, 10);

  // Aging analysis
  const agingDeals = ownerDeals.filter(d => (d.daysOpen || 0) > 90);
  const agingAmount = agingDeals.reduce((sum, d) => sum + d.amount, 0);

  const stageLabels: Record<number, string> = {
    4: 'Commit',
    3: 'Solution',
    2: 'Qualify',
    1: 'Source'
  };

  const stageColors: Record<number, string> = {
    4: 'bg-green-100 text-green-800 border-green-200',
    3: 'bg-blue-100 text-blue-800 border-blue-200',
    2: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    1: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{ownerName}</h1>
              <p className="text-gray-500 mt-1">Pipeline Performance Summary</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Region</div>
              <div className="text-lg font-semibold capitalize">{ownerDeals[0]?.region || 'Unknown'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Deals</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{ownerDeals.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Total Pipeline</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalPipeline)}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Total EGP</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(totalEGP)}</div>
            <div className="text-sm text-gray-500 mt-1">
              {totalPipeline > 0 ? ((totalEGP / totalPipeline) * 100).toFixed(0) : 0}% margin
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500">Avg Days Open</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{avgDaysOpen}</div>
            {agingDeals.length > 0 && (
              <div className="text-sm text-red-500 mt-1">
                {agingDeals.length} deals aging ({formatCurrency(agingAmount)})
              </div>
            )}
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Pipeline by Stage</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {byStage.map(({ stage, count, amount, egp }) => (
                <div key={stage} className={`p-4 rounded-lg border-2 ${stageColors[stage]}`}>
                  <div className="text-sm font-medium opacity-75">Stage {stage} - {stageLabels[stage]}</div>
                  <div className="text-2xl font-bold mt-1">{count} deals</div>
                  <div className="text-lg font-semibold mt-2">{formatCurrency(amount)}</div>
                  <div className="text-sm opacity-75">{formatCurrency(egp)} EGP</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Accounts */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Top 10 Accounts</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Account</th>
                  <th className="text-center p-4 font-medium text-gray-600">Deals</th>
                  <th className="text-right p-4 font-medium text-gray-600">Pipeline</th>
                  <th className="text-right p-4 font-medium text-gray-600">EGP</th>
                  <th className="text-right p-4 font-medium text-gray-600">Margin</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map(([account, data]) => (
                  <tr key={account} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{account}</td>
                    <td className="p-4 text-center">{data.count}</td>
                    <td className="p-4 text-right font-semibold">{formatCurrency(data.amount)}</td>
                    <td className="p-4 text-right">{formatCurrency(data.egp)}</td>
                    <td className="p-4 text-right">
                      <span className={data.amount > 0 && (data.egp / data.amount) >= 0.35 ? 'text-green-600' : 'text-orange-600'}>
                        {data.amount > 0 ? ((data.egp / data.amount) * 100).toFixed(0) : 0}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Deals */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">All Deals ({ownerDeals.length})</h2>
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
                  <th className="text-center p-4 font-medium text-gray-600">Days Open</th>
                  <th className="text-center p-4 font-medium text-gray-600">Close Date</th>
                  <th className="text-center p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {ownerDeals
                  .sort((a, b) => b.amount - a.amount)
                  .map((deal) => (
                    <tr key={deal.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{deal.accountName}</td>
                      <td className="p-4 text-gray-600 max-w-xs truncate" title={deal.opportunityName}>
                        {deal.opportunityName}
                      </td>
                      <td className="p-4 text-right font-semibold">{formatCurrency(deal.amount)}</td>
                      <td className="p-4 text-right">{formatCurrency(deal.egp)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${stageColors[deal.stage]}`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={(deal.daysOpen || 0) > 90 ? 'text-red-600 font-medium' : ''}>
                          {deal.daysOpen || 0}
                        </span>
                      </td>
                      <td className="p-4 text-center text-gray-600">{deal.closeDate}</td>
                      <td className="p-4 text-center">
                        <Link 
                          href={`/deal/${deal.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Data source: Sales MCP → get_open_pipeline_deals | Last updated: Feb 2026
        </div>
      </div>
    </div>
  );
}
