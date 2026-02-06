import { deals } from '@/data/deals';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Target, DollarSign, Clock, Building2, AlertTriangle, Zap, Timer } from 'lucide-react';

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

  // Velocity & Churn metrics
  const aging90 = ownerDeals.filter(d => (d.daysOpen || 0) > 90);
  const aging180 = ownerDeals.filter(d => (d.daysOpen || 0) > 180);
  const aging365 = ownerDeals.filter(d => (d.daysOpen || 0) > 365);
  
  const aging90Amount = aging90.reduce((sum, d) => sum + d.amount, 0);
  const aging180Amount = aging180.reduce((sum, d) => sum + d.amount, 0);
  const aging365Amount = aging365.reduce((sum, d) => sum + d.amount, 0);

  // Churn risk scoring
  const churnRisk = ownerDeals.map(d => {
    let riskScore = 0;
    const flags: string[] = [];
    
    if ((d.daysOpen || 0) > 365) { riskScore += 3; flags.push('365+ days'); }
    else if ((d.daysOpen || 0) > 180) { riskScore += 2; flags.push('180+ days'); }
    else if ((d.daysOpen || 0) > 90) { riskScore += 1; flags.push('90+ days'); }
    
    if ((d.daysInStage || 0) > 60) { riskScore += 2; flags.push('Stuck in stage'); }
    else if ((d.daysInStage || 0) > 30) { riskScore += 1; flags.push('Slow stage progress'); }
    
    if (d.egp === 0 && d.amount > 100000) { riskScore += 1; flags.push('No EGP set'); }
    
    return { ...d, riskScore, flags };
  }).filter(d => d.riskScore >= 2).sort((a, b) => b.riskScore - a.riskScore);

  // Stage velocity (avg days in each stage)
  const stageVelocity = [4, 3, 2, 1].map(stage => {
    const stageDeals = ownerDeals.filter(d => d.stage === stage);
    const avgDaysInStage = stageDeals.length > 0 
      ? Math.round(stageDeals.reduce((sum, d) => sum + (d.daysInStage || 0), 0) / stageDeals.length)
      : 0;
    const avgDaysOpen = stageDeals.length > 0
      ? Math.round(stageDeals.reduce((sum, d) => sum + (d.daysOpen || 0), 0) / stageDeals.length)
      : 0;
    return { stage, avgDaysInStage, avgDaysOpen, count: stageDeals.length };
  });

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

        {/* Velocity & Aging Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pipeline Aging */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">Pipeline Aging</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium text-yellow-800">90+ Days Old</div>
                  <div className="text-sm text-yellow-600">{aging90.length} deals</div>
                </div>
                <div className="text-xl font-bold text-yellow-800">{formatCurrency(aging90Amount)}</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-orange-800">180+ Days Old</div>
                  <div className="text-sm text-orange-600">{aging180.length} deals</div>
                </div>
                <div className="text-xl font-bold text-orange-800">{formatCurrency(aging180Amount)}</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">365+ Days Old</div>
                  <div className="text-sm text-red-600">{aging365.length} deals</div>
                </div>
                <div className="text-xl font-bold text-red-800">{formatCurrency(aging365Amount)}</div>
              </div>
              <div className="pt-2 border-t text-sm text-gray-500">
                {totalPipeline > 0 ? ((aging90Amount / totalPipeline) * 100).toFixed(0) : 0}% of pipeline is 90+ days old
              </div>
            </div>
          </div>

          {/* Stage Velocity */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Stage Velocity</h2>
              </div>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="text-left pb-2">Stage</th>
                    <th className="text-center pb-2">Deals</th>
                    <th className="text-center pb-2">Avg Days in Stage</th>
                    <th className="text-center pb-2">Avg Total Days</th>
                  </tr>
                </thead>
                <tbody>
                  {stageVelocity.filter(s => s.count > 0).map(({ stage, avgDaysInStage, avgDaysOpen, count }) => (
                    <tr key={stage} className="border-t">
                      <td className="py-3 font-medium">Stage {stage} - {stageLabels[stage]}</td>
                      <td className="py-3 text-center">{count}</td>
                      <td className="py-3 text-center">
                        <span className={avgDaysInStage > 45 ? 'text-red-600 font-medium' : avgDaysInStage > 30 ? 'text-orange-600' : 'text-green-600'}>
                          {avgDaysInStage} days
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={avgDaysOpen > 180 ? 'text-red-600 font-medium' : avgDaysOpen > 90 ? 'text-orange-600' : ''}>
                          {avgDaysOpen} days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Churn Risk Deals */}
        {churnRisk.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border mb-8">
            <div className="p-6 border-b bg-red-50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-red-900">Churn Risk Deals ({churnRisk.length})</h2>
              </div>
              <p className="text-sm text-red-700 mt-1">Deals with multiple risk indicators that may need attention</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Account</th>
                    <th className="text-right p-4 font-medium text-gray-600">Amount</th>
                    <th className="text-center p-4 font-medium text-gray-600">Stage</th>
                    <th className="text-center p-4 font-medium text-gray-600">Days Open</th>
                    <th className="text-left p-4 font-medium text-gray-600">Risk Flags</th>
                    <th className="text-center p-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {churnRisk.slice(0, 15).map((deal) => (
                    <tr key={deal.id} className="border-t hover:bg-red-50">
                      <td className="p-4 font-medium text-gray-900">{deal.accountName}</td>
                      <td className="p-4 text-right font-semibold">{formatCurrency(deal.amount)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${stageColors[deal.stage]}`}>
                          {deal.stage}
                        </span>
                      </td>
                      <td className="p-4 text-center text-red-600 font-medium">{deal.daysOpen}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {deal.flags.map((flag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                              {flag}
                            </span>
                          ))}
                        </div>
                      </td>
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
        )}

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
            <p className="text-sm text-gray-500 mt-1">Rows highlighted: 🟡 90+ days old | 🔴 180+ days old</p>
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
                  <th className="text-center p-4 font-medium text-gray-600">In Stage</th>
                  <th className="text-center p-4 font-medium text-gray-600">Total Days</th>
                  <th className="text-center p-4 font-medium text-gray-600">Close Date</th>
                  <th className="text-center p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {ownerDeals
                  .sort((a, b) => b.amount - a.amount)
                  .map((deal) => {
                    const daysOpen = deal.daysOpen || 0;
                    const daysInStage = deal.daysInStage || 0;
                    const rowClass = daysOpen > 180 ? 'bg-red-50' : daysOpen > 90 ? 'bg-yellow-50' : '';
                    return (
                      <tr key={deal.id} className={`border-t hover:bg-gray-100 ${rowClass}`}>
                        <td className="p-4 font-medium text-gray-900">{deal.accountName}</td>
                        <td className="p-4 text-gray-600 max-w-xs truncate" title={deal.opportunityName}>
                          {deal.opportunityName}
                        </td>
                        <td className="p-4 text-right font-semibold">{formatCurrency(deal.amount)}</td>
                        <td className="p-4 text-right">{deal.egp > 0 ? formatCurrency(deal.egp) : <span className="text-gray-400">—</span>}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${stageColors[deal.stage]}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={daysInStage > 45 ? 'text-orange-600 font-medium' : ''}>
                            {daysInStage}d
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={daysOpen > 180 ? 'text-red-600 font-bold' : daysOpen > 90 ? 'text-orange-600 font-medium' : ''}>
                            {daysOpen}d
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
                    );
                  })}
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
