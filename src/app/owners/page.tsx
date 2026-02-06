import { deals } from '@/data/deals';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, Target } from 'lucide-react';

interface OwnerStats {
  name: string;
  region: string;
  dealCount: number;
  totalPipeline: number;
  totalEGP: number;
  avgDaysOpen: number;
  stage4: number;
  stage3: number;
  stage2: number;
  stage1: number;
}

export default function OwnersPage() {
  // Calculate stats per owner
  const ownerMap: Record<string, OwnerStats> = {};
  
  deals.forEach(deal => {
    if (!ownerMap[deal.owner]) {
      ownerMap[deal.owner] = {
        name: deal.owner,
        region: deal.region,
        dealCount: 0,
        totalPipeline: 0,
        totalEGP: 0,
        avgDaysOpen: 0,
        stage4: 0,
        stage3: 0,
        stage2: 0,
        stage1: 0
      };
    }
    const owner = ownerMap[deal.owner];
    owner.dealCount++;
    owner.totalPipeline += deal.amount;
    owner.totalEGP += deal.egp;
    owner.avgDaysOpen += deal.daysOpen || 0;
    if (deal.stage === 4) owner.stage4++;
    if (deal.stage === 3) owner.stage3++;
    if (deal.stage === 2) owner.stage2++;
    if (deal.stage === 1) owner.stage1++;
  });

  const owners = Object.values(ownerMap)
    .map(o => ({ ...o, avgDaysOpen: Math.round(o.avgDaysOpen / o.dealCount) }))
    .sort((a, b) => b.totalPipeline - a.totalPipeline);

  const totalPipeline = owners.reduce((sum, o) => sum + o.totalPipeline, 0);
  const totalEGP = owners.reduce((sum, o) => sum + o.totalEGP, 0);

  const regionColors: Record<string, string> = {
    west: 'bg-blue-100 text-blue-800',
    east: 'bg-green-100 text-green-800',
    europe: 'bg-purple-100 text-purple-800'
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
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pipeline by Owner</h1>
              <p className="text-gray-500 mt-1">Performance summary for all opportunity owners</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Owners</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{owners.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
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
          </div>
        </div>

        {/* Owners Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">All Opportunity Owners</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Owner</th>
                  <th className="text-center p-4 font-medium text-gray-600">Region</th>
                  <th className="text-center p-4 font-medium text-gray-600">Deals</th>
                  <th className="text-right p-4 font-medium text-gray-600">Pipeline</th>
                  <th className="text-right p-4 font-medium text-gray-600">EGP</th>
                  <th className="text-center p-4 font-medium text-gray-600">Margin</th>
                  <th className="text-center p-4 font-medium text-gray-600">Avg Days</th>
                  <th className="text-center p-4 font-medium text-gray-600">Stage 4</th>
                  <th className="text-center p-4 font-medium text-gray-600">Stage 3</th>
                  <th className="text-center p-4 font-medium text-gray-600">Stage 2</th>
                  <th className="text-center p-4 font-medium text-gray-600">Stage 1</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner, idx) => (
                  <tr key={owner.name} className={`border-t hover:bg-gray-50 ${idx < 3 ? 'bg-green-50' : ''}`}>
                    <td className="p-4">
                      <Link 
                        href={`/owner/${owner.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        {owner.name}
                      </Link>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${regionColors[owner.region] || 'bg-gray-100'}`}>
                        {owner.region}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">{owner.dealCount}</td>
                    <td className="p-4 text-right font-bold">{formatCurrency(owner.totalPipeline)}</td>
                    <td className="p-4 text-right">{formatCurrency(owner.totalEGP)}</td>
                    <td className="p-4 text-center">
                      <span className={owner.totalPipeline > 0 && (owner.totalEGP / owner.totalPipeline) >= 0.35 ? 'text-green-600 font-medium' : 'text-orange-600'}>
                        {owner.totalPipeline > 0 ? ((owner.totalEGP / owner.totalPipeline) * 100).toFixed(0) : 0}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={owner.avgDaysOpen > 180 ? 'text-red-600 font-medium' : ''}>
                        {owner.avgDaysOpen}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {owner.stage4 > 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                          {owner.stage4}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {owner.stage3 > 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                          {owner.stage3}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {owner.stage2 > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                          {owner.stage2}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {owner.stage1 > 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-medium">
                          {owner.stage1}
                        </span>
                      )}
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
