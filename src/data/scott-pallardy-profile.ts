// Scott Pallardy Comprehensive Profile
// Compiled from: Gong (73 calls), Sales MCP (86 deals), Finance MCP (revenue history)
// Last updated: 2026-02-06

export const scottPallardyProfile = {
  // === IDENTITY ===
  personal: {
    name: 'Scott Pallardy',
    role: 'Account Manager (AM)',
    region: 'East',
    status: 'RESIGNED - Transition Required',
    transitionDate: 'February 2026',
  },

  // === GONG ACTIVITY ANALYSIS (73 calls) ===
  gongActivity: {
    totalCalls: 73,
    dateRange: 'August 2025 - January 2026',
    peakActivityWeek: '11/30/2025',
    avgCallsPerWeek: 2.8,
    avgCallDuration: '20 minutes',
    
    // Activity by month (from chart)
    monthlyActivity: [
      { month: 'Aug 2025', calls: 8 },
      { month: 'Sep 2025', calls: 12 },
      { month: 'Oct 2025', calls: 10 },
      { month: 'Nov 2025', calls: 15 },
      { month: 'Dec 2025', calls: 14 },
      { month: 'Jan 2026', calls: 14 },
    ],

    // Recent calls with AI summaries
    recentCalls: [
      {
        account: 'Arthrex',
        title: 'AI Readiness and Regulatory Strategy Discussion - Next Steps',
        date: 'Jan 16, 2026',
        duration: '18m',
        participants: ['Rathina', 'Scott', 'John', 'Hovsep (USDM)', 'Dallis (Arthrex)'],
        deal: { amount: 56520, stage: 2, name: 'Arthrex - Statistical Analysis' },
        summary: 'USDM\'s approach to establishing an AI governance and training program at Arthrex, including validation of AI applications. USDM will prepare a proposal outlining a lightweight initial assessment of Arthrex\'s AI environment, with a focus on identifying areas for improvement.',
        keyPoints: [
          'Potential project start in July (Dallis parental leave + fiscal year)',
          'Dallis to provide list of AI solutions Arthrex is considering',
          'Focus on lightweight initial assessment',
          'Training program component included'
        ],
        nextSteps: ['Prepare proposal', 'Wait for AI solutions list from Dallis'],
        risk: 'medium',
      },
      {
        account: 'Enable Injections',
        title: 'AI Governance and Training Kick-Off Meeting',
        date: 'Jan 8, 2026',
        duration: '21m',
        participants: ['Aqeel', 'John', 'Scott (USDM)', 'Ryan (Enable)'],
        deal: { amount: 70900, stage: 'Lost - No Decision', name: 'Enable Injections - JAMA' },
        summary: 'Kickoff of the AI governance and training support project, outlining project scope, timelines, and deliverables including AI assessment and training program.',
        keyPoints: [
          'Target date January 29th for live training session',
          'Weekly calls scheduled',
          'SAP Analytics Cloud validation interest for future',
          'AI vision applications in manufacturing discussed'
        ],
        nextSteps: ['Share relevant documents', 'Prepare for Jan 29 training'],
        risk: 'high',
      },
      {
        account: 'Zimmer Biomet',
        title: 'PTC Codebeamer alignment - USDM',
        date: 'Jan 8, 2026',
        duration: '34m',
        participants: ['Scott', 'Jim', 'Joe (USDM)', 'Mike (PTC)', 'Mayank Mahajan'],
        deal: { amount: 35000, stage: 3, name: 'PTC Vuforia CA Royalties' },
        summary: 'Discussed Zimmer\'s Codebeamer and Windchill projects. Focused on complexities of Codebeamer upgrade, particularly "working sets" feature, and transition to Codebeamer Plus and Windchill Plus.',
        keyPoints: [
          'Codebeamer upgrade complexity - working sets feature',
          'Transition to Codebeamer Plus and Windchill Plus',
          'USDM positioning for validation and compliance expertise'
        ],
        nextSteps: ['Position validation expertise'],
        risk: 'low',
      },
      {
        account: 'Therakos/Mallinckrodt',
        title: 'USDM UDI Commercials',
        date: 'Jan 16, 2026',
        duration: '17m',
        participants: ['Jim Macdonell', 'Scott', 'Jay', '+4 more'],
        deal: { amount: null, stage: 'Active', name: 'MSA/SOW' },
        summary: 'MSA and Statement of Work (SOW) for Therakos and EU UTIMed. Documentation to be added to Mallinckrodt. Legal team call scheduling if needed.',
        keyPoints: [
          'MSA and SOW work in progress',
          'EU UTIMed involvement',
          'Legal coordination needed'
        ],
        nextSteps: ['Complete documentation', 'Schedule legal call if needed'],
        risk: 'medium',
      },
      {
        account: 'Humacyte',
        title: 'Custom Audit Reporting',
        date: 'Jan 15, 2026',
        duration: '22m',
        participants: ['Rathina G.', 'Amir', 'Scott', '+7 more'],
        deal: { amount: null, stage: 'Proposal', name: 'Custom Audit Reporting' },
        summary: 'USDM\'s proposed solution for generating custom audit reports. More cost-effective than their initial approach, with specific search parameters.',
        keyPoints: [
          'Estimated 60 hours of work',
          'Cost-effective solution positioning',
          'Specific search parameters defined',
          'Weeks to approval timeline'
        ],
        nextSteps: ['Finalize proposal', 'Wait for approval'],
        risk: 'low',
      },
      {
        account: 'Harmony Biosciences',
        title: 'Veeva Managed Services Kickoff',
        date: 'Jan 15, 2026',
        duration: '25m',
        participants: ['Anupreet Kaur', 'Scott', '+6 more'],
        deal: { amount: null, stage: 'Active', name: 'Veeva Managed Services' },
        summary: 'Managed services kickoff meeting for Veeva implementation.',
        keyPoints: ['Managed services scope definition', 'Kickoff activities'],
        nextSteps: ['Execute managed services plan'],
        risk: 'low',
      },
    ],
  },

  // === PIPELINE ANALYSIS (from Sales MCP) ===
  pipeline: {
    totalDeals: 86,
    totalAmount: 10560000, // $10.56M
    totalEgp: 3910000, // $3.91M
    avgMargin: 37,
    totalAccounts: 44,

    // Stage breakdown
    byStage: {
      stage4: { count: 3, amount: 183000, label: 'Negotiating the Deal' },
      stage3: { count: 14, amount: 2980000, label: 'Developing Solution' },
      stage2: { count: 35, amount: 4200000, label: 'Qualifying Opportunity' },
      stage1: { count: 34, amount: 3197000, label: 'Sourcing Lead' },
    },

    // Age analysis (CRITICAL)
    aging: {
      '90+': { count: 70, amount: 8400000, percentage: 80 },
      '180+': { count: 48, amount: 5750000, percentage: 55 },
      '365+': { count: 22, amount: 2100000, percentage: 25 },
    },

    // Critical deals (Stage 4)
    criticalDeals: [
      { account: 'BioCryst Pharmaceuticals', amount: 89000, closeDate: '2026-02-13', type: 'DocuSign' },
      { account: 'Therakos', amount: 24000, closeDate: '2026-02-13', type: 'UDI' },
      { account: 'BioAgilytix Labs', amount: 70000, closeDate: '2026-02-28', type: 'Expansion' },
    ],
  },

  // === ACCOUNT RELATIONSHIPS ===
  accounts: {
    topByPipeline: [
      { name: 'BioCryst Pharmaceuticals', pipeline: 89000, stage: 4, relationship: 'Strong', risk: 'low' },
      { name: 'Arthrex', pipeline: 56520, stage: 2, relationship: 'Developing', risk: 'medium' },
      { name: 'Zimmer Biomet', pipeline: 35000, stage: 3, relationship: 'Partner (PTC)', risk: 'low' },
      { name: 'Therakos', pipeline: 24000, stage: 4, relationship: 'Active', risk: 'medium' },
    ],
    
    // Dormant accounts (2024 revenue, no current pipeline)
    dormant: [
      { name: 'Atara Biotherapeutics', revenue2024: 1080000, pipeline: 0, risk: 'critical' },
      { name: 'Shire US Inc.', revenue2024: 1000000, pipeline: 0, risk: 'critical' },
      { name: 'Biogen', revenue2024: 1500000, pipeline: 0, risk: 'critical' },
      { name: 'AbbVie', revenue2024: 744000, pipeline: 0, risk: 'high' },
      { name: 'Becton Dickinson', revenue2024: 619000, pipeline: 0, risk: 'high' },
      { name: 'Autolus, LTD', revenue2024: 605000, pipeline: 0, risk: 'high' },
      { name: 'Spectranetics Corp', revenue2024: 396000, pipeline: 0, risk: 'medium' },
      { name: 'Santen Incorporated', revenue2024: 352000, pipeline: 0, risk: 'medium' },
    ],
    totalDormantRevenue: 6296000, // $6.3M at risk
  },

  // === SELLING STYLE ANALYSIS ===
  sellingStyle: {
    strengths: [
      'Technical depth - comfortable with complex systems (Codebeamer, Veeva, SAP)',
      'Consultative approach - focuses on lightweight assessments before big commitments',
      'Team selling - brings specialists (Rathina, John, Jim) into calls',
      'AI/Governance expertise - multiple AI governance conversations',
      'Partner relationships - works well with PTC, integrates into partner deals'
    ],
    areas_for_handoff: [
      'Long sales cycles - 80% of deals aging 90+ days',
      'Follow-up discipline - dormant accounts suggest relationship maintenance gaps',
      'Deal velocity - average deal age suggests need for acceleration',
      'Pipeline hygiene - many deals may need qualification review'
    ],
    preferredServices: [
      'AI Governance & Training',
      'Validation & Compliance',
      'Managed Services (Veeva)',
      'UDI/MDR Compliance',
      'Custom Audit Reporting'
    ],
    typicalDealSize: {
      small: '< $50K - Quick wins, managed services',
      medium: '$50K - $100K - AI assessments, compliance projects',
      large: '> $100K - Enterprise validation, multi-year programs'
    }
  },

  // === KEY CONTACTS (from Gong) ===
  keyContacts: {
    internal: [
      { name: 'Rathina G.', role: 'Technical Lead', frequency: 'High' },
      { name: 'John', role: 'Solutions Architect', frequency: 'High' },
      { name: 'Jim Macdonell', role: 'Senior AM', frequency: 'Medium' },
      { name: 'Hovsep Kirikian', role: 'CGO', frequency: 'Medium' },
      { name: 'Anupreet Kaur', role: 'Delivery Lead', frequency: 'Low' },
    ],
    external: [
      { name: 'Dallis', account: 'Arthrex', role: 'Primary Contact', note: 'Going on parental leave' },
      { name: 'Ryan', account: 'Enable Injections', role: 'Project Lead', note: 'AI training Jan 29' },
      { name: 'Mike', account: 'PTC/Zimmer', role: 'Partner Contact', note: 'Codebeamer expert' },
    ],
  },

  // === TRANSITION RECOMMENDATIONS ===
  transition: {
    primaryAssignee: {
      name: 'Lisa Burgese Fry',
      rationale: 'Enterprise accounts, MedTech expertise, East region coverage',
      accounts: ['Biogen', 'AbbVie', 'BioCryst', 'Zimmer Biomet', 'Therakos'],
    },
    secondaryAssignees: [
      { name: 'Avani Macwan', accounts: ['Arthrex', 'Enable Injections'], rationale: 'Pharma, emerging biotech' },
      { name: 'Josh Ertmer', accounts: ['Takeda relationships'], rationale: 'Technical sales' },
      { name: 'Jim Macdonell', accounts: ['Large complex deals'], rationale: 'Already involved in several calls' },
    ],
    urgentActions: [
      { action: 'Close BioCryst DocuSign', deadline: '2026-02-13', owner: 'Lisa' },
      { action: 'Close Therakos UDI', deadline: '2026-02-13', owner: 'Jim' },
      { action: 'Rescue Enable Injections training', deadline: '2026-01-29', owner: 'Avani' },
      { action: 'Get Arthrex AI solutions list', deadline: '2026-02-15', owner: 'Avani' },
      { action: 'Schedule Biogen intro call', deadline: '2026-02-10', owner: 'Lisa' },
      { action: 'Schedule AbbVie intro call', deadline: '2026-02-10', owner: 'Lisa' },
      { action: 'Review all Stage 1 deals for qualification', deadline: '2026-02-28', owner: 'All' },
    ],
  },
};

export default scottPallardyProfile;
