'use client';

import Link from 'next/link';

// Scott's account locations with coordinates
const accountLocations = [
  // Active Pipeline Accounts
  { name: 'Arthrex', city: 'Naples, FL', lat: 26.1420, lng: -81.7948, pipeline: 56520, status: 'active', contact: 'Dallis', risk: 'high' },
  { name: 'BioCryst Pharmaceuticals', city: 'Birmingham, AL', lat: 33.5207, lng: -86.8025, pipeline: 89000, status: 'stage4', contact: 'Unknown', risk: 'critical' },
  { name: 'BioAgilytix Labs', city: 'Durham, NC', lat: 35.9940, lng: -78.8986, pipeline: 70000, status: 'stage4', contact: 'Teresa Neal', risk: 'high' },
  { name: 'Zimmer Biomet', city: 'Warsaw, IN', lat: 41.2381, lng: -85.8530, pipeline: 35000, status: 'active', contact: 'Mayank Mahajan', risk: 'low' },
  { name: 'Therakos/Mallinckrodt', city: 'Bedminster, NJ', lat: 40.6807, lng: -74.6454, pipeline: 24000, status: 'stage4', contact: 'Legal Team', risk: 'medium' },
  { name: 'Bicara Therapeutics', city: 'Boston, MA', lat: 42.3601, lng: -71.0589, pipeline: 50000, status: 'active', contact: 'David', risk: 'medium' },
  { name: 'CellCarta', city: 'Montreal, QC', lat: 45.5017, lng: -73.5673, pipeline: 40000, status: 'active', contact: 'Unknown', risk: 'high' },
  { name: 'Harmony Biosciences', city: 'Plymouth Meeting, PA', lat: 40.1023, lng: -75.2735, pipeline: 30000, status: 'active', contact: 'Unknown', risk: 'low' },
  { name: 'Humacyte', city: 'Durham, NC', lat: 36.0014, lng: -78.9100, pipeline: 25000, status: 'proposal', contact: 'Unknown', risk: 'medium' },
  { name: 'Enable Injections', city: 'Cincinnati, OH', lat: 39.1031, lng: -84.5120, pipeline: 0, status: 'lost', contact: 'Ryan', risk: 'critical' },
  
  // Dormant Accounts (2024 revenue, no current pipeline)
  { name: 'Biogen', city: 'Cambridge, MA', lat: 42.3736, lng: -71.1097, pipeline: 0, revenue2024: 1500000, status: 'dormant', contact: 'TBD', risk: 'critical' },
  { name: 'Atara Biotherapeutics', city: 'Thousand Oaks, CA', lat: 34.1706, lng: -118.8376, pipeline: 0, revenue2024: 1080000, status: 'dormant', contact: 'TBD', risk: 'critical' },
  { name: 'Shire/Takeda', city: 'Cambridge, MA', lat: 42.3656, lng: -71.1050, pipeline: 0, revenue2024: 1000000, status: 'dormant', contact: 'TBD', risk: 'critical' },
  { name: 'AbbVie', city: 'North Chicago, IL', lat: 42.3256, lng: -87.8412, pipeline: 0, revenue2024: 744000, status: 'dormant', contact: 'TBD', risk: 'high' },
  { name: 'Becton Dickinson', city: 'Franklin Lakes, NJ', lat: 41.0176, lng: -74.2057, pipeline: 0, revenue2024: 619000, status: 'dormant', contact: 'TBD', risk: 'high' },
  { name: 'Autolus', city: 'London, UK', lat: 51.5074, lng: -0.1278, pipeline: 0, revenue2024: 605000, status: 'dormant', contact: 'TBD', risk: 'high' },
  { name: 'Spectranetics', city: 'Colorado Springs, CO', lat: 38.8339, lng: -104.8214, pipeline: 0, revenue2024: 396000, status: 'dormant', contact: 'TBD', risk: 'medium' },
  { name: 'Santen', city: 'Emeryville, CA', lat: 37.8313, lng: -122.2852, pipeline: 0, revenue2024: 352000, status: 'dormant', contact: 'TBD', risk: 'medium' },
];

const statusColors: Record<string, string> = {
  stage4: '#dc2626', // red
  active: '#2563eb', // blue
  proposal: '#7c3aed', // purple
  lost: '#6b7280', // gray
  dormant: '#f59e0b', // amber
};

const statusLabels: Record<string, string> = {
  stage4: 'Stage 4 (Closing)',
  active: 'Active Pipeline',
  proposal: 'Proposal Stage',
  lost: 'Lost Deal',
  dormant: 'Dormant (No Pipeline)',
};

export default function AccountMapPage() {
  // Group accounts by status
  const activeAccounts = accountLocations.filter(a => ['stage4', 'active', 'proposal', 'lost'].includes(a.status));
  const dormantAccounts = accountLocations.filter(a => a.status === 'dormant');

  // Calculate totals
  const totalPipeline = activeAccounts.reduce((sum, a) => sum + a.pipeline, 0);
  const totalDormant = dormantAccounts.reduce((sum, a) => sum + (a.revenue2024 || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/transition/scott-pallardy" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                ← Back to Transition Page
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Scott Pallardy - Account Map</h1>
              <p className="text-gray-600">Geographic distribution of accounts requiring transition</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Accounts</div>
              <div className="text-3xl font-bold text-gray-900">{accountLocations.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Active Pipeline</div>
            <div className="text-2xl font-bold text-blue-600">${(totalPipeline / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-400">{activeAccounts.length} accounts</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Dormant Revenue</div>
            <div className="text-2xl font-bold text-amber-600">${(totalDormant / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-400">{dormantAccounts.length} accounts at risk</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Stage 4 (Feb Closes)</div>
            <div className="text-2xl font-bold text-red-600">$183K</div>
            <div className="text-xs text-gray-400">3 deals closing</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Geographic Spread</div>
            <div className="text-2xl font-bold text-gray-900">3 Countries</div>
            <div className="text-xs text-gray-400">US, Canada, UK</div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-900">Account Locations</h2>
          </div>
          <div className="relative" style={{ height: '500px' }}>
            {/* Static Map Image with markers overlay */}
            <iframe
              src={`https://www.google.com/maps/d/embed?mid=1-placeholder&z=4&ll=39.8283,-98.5795`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Account Map"
            />
            {/* Fallback: SVG Map of US */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-full h-full max-w-4xl mx-auto" viewBox="0 0 960 600" fill="none">
                  {/* Simple US outline */}
                  <path d="M150,100 L850,100 L900,300 L850,500 L150,500 L100,300 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                  
                  {/* Plot account markers */}
                  {accountLocations.map((account, idx) => {
                    // Convert lat/lng to SVG coordinates (simplified projection)
                    const x = ((account.lng + 125) / 70) * 800 + 80;
                    const y = ((50 - account.lat) / 30) * 400 + 100;
                    
                    // Skip if outside US bounds for this simple map
                    if (x < 0 || x > 960 || y < 0 || y > 600) return null;
                    
                    return (
                      <g key={idx}>
                        <circle
                          cx={x}
                          cy={y}
                          r={account.status === 'dormant' ? 12 : 10}
                          fill={statusColors[account.status]}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:opacity-80"
                        />
                        {account.risk === 'critical' && (
                          <circle cx={x} cy={y} r={16} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2">
                            <animate attributeName="r" from="14" to="20" dur="1.5s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                        )}
                        <text x={x} y={y - 15} textAnchor="middle" className="text-xs font-medium" fill="#374151">
                          {account.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="p-4 bg-gray-50 border-t flex flex-wrap gap-4 justify-center">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: statusColors[status] }} />
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account List by Region */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Accounts */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b bg-blue-50">
              <h3 className="font-semibold text-blue-900">Active Pipeline Accounts ({activeAccounts.length})</h3>
            </div>
            <div className="divide-y">
              {activeAccounts.sort((a, b) => b.pipeline - a.pipeline).map((account, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {account.name}
                      {account.risk === 'critical' && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">CRITICAL</span>}
                      {account.risk === 'high' && <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">HIGH</span>}
                    </div>
                    <div className="text-sm text-gray-500">{account.city}</div>
                    <div className="text-xs text-gray-400">Contact: {account.contact}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold" style={{ color: statusColors[account.status] }}>
                      ${(account.pipeline / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500">{statusLabels[account.status]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dormant Accounts */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b bg-amber-50">
              <h3 className="font-semibold text-amber-900">Dormant Accounts - $6.3M at Risk ({dormantAccounts.length})</h3>
            </div>
            <div className="divide-y">
              {dormantAccounts.sort((a, b) => (b.revenue2024 || 0) - (a.revenue2024 || 0)).map((account, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {account.name}
                      {account.risk === 'critical' && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">CRITICAL</span>}
                    </div>
                    <div className="text-sm text-gray-500">{account.city}</div>
                    <div className="text-xs text-amber-600">No current pipeline - needs outreach</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-amber-600">
                      ${((account.revenue2024 || 0) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500">2024 Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Summary */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Regional Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Northeast US</div>
              <div className="text-xs text-gray-400">MA, NJ, PA, NY</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Southeast US</div>
              <div className="text-xs text-gray-400">NC, FL, AL</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Midwest/West US</div>
              <div className="text-xs text-gray-400">OH, IN, IL, CO, CA</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">International</div>
              <div className="text-xs text-gray-400">Canada, UK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
