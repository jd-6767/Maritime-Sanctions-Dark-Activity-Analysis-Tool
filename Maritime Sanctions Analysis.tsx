import React, { useState, useMemo } from 'react';
import { AlertTriangle, FileText, Filter, MapPin, Radio, Shield, Building2, Clock, TrendingUp } from 'lucide-react';

const VESSELS = [
  {
    id: 1,
    name: "OCEAN NAVIGATOR",
    imo: "IMO 9876543",
    location: "Persian Gulf",
    aisStatus: "Gap Detected",
    aisGapHours: 18,
    riskZone: true,
    owner: "Maritime Holdings Ltd (BVI)",
    beneficialOwner: "Hidden - Shell Company Structure",
    ownershipDetails: {
      registeredOwner: "Maritime Holdings Ltd",
      jurisdiction: "British Virgin Islands",
      incorporationDate: "2021-03-15",
      directorInfo: "Nominee directors - Corporate service provider used",
      shareholderStructure: "Bearer shares - Ownership untraceable",
      verificationStatus: "FAILED",
      corporateRegistry: "Offshore jurisdiction - Limited transparency",
      sanctionsScreening: "No direct matches, but linked entities flagged"
    },
    portHistory: ["Bandar Abbas, Iran", "Fujairah, UAE", "Port Said, Egypt"],
    adverseMedia: [
      "Vessel flagged in OFAC advisory - Suspected STS transfer",
      "Lloyd's List Intelligence: AIS manipulation detected",
      "Port authority report: Undeclared cargo manifest"
    ],
    lastAisSignal: "18 hours ago",
    flagState: "Panama",
    vesselAge: 8,
    lastInspection: "14 months ago",
    insuranceStatus: "Non-standard insurer"
  },
  {
    id: 2,
    name: "STAR VOYAGER",
    imo: "IMO 9234567",
    location: "Singapore Strait",
    aisStatus: "Active",
    aisGapHours: 2,
    riskZone: false,
    owner: "Nordic Shipping AS (Norway)",
    beneficialOwner: "Verified - Transparent ownership",
    ownershipDetails: {
      registeredOwner: "Nordic Shipping AS",
      jurisdiction: "Norway",
      incorporationDate: "1998-06-22",
      directorInfo: "Publicly listed company - 5 identified directors",
      shareholderStructure: "Oslo Stock Exchange - Full disclosure",
      verificationStatus: "VERIFIED",
      corporateRegistry: "Transparent jurisdiction - Full compliance",
      sanctionsScreening: "Clear - No adverse findings"
    },
    portHistory: ["Singapore", "Hong Kong", "Shanghai, China"],
    adverseMedia: [],
    lastAisSignal: "12 minutes ago",
    flagState: "Norway",
    vesselAge: 5,
    lastInspection: "3 months ago",
    insuranceStatus: "Lloyd's of London"
  },
  {
    id: 3,
    name: "CRIMSON TIDE",
    imo: "IMO 9345678",
    location: "Eastern Mediterranean",
    aisStatus: "Gap Detected",
    aisGapHours: 15,
    riskZone: true,
    owner: "Aegean Carriers SA (Cyprus)",
    beneficialOwner: "Unclear - Multiple layered entities",
    ownershipDetails: {
      registeredOwner: "Aegean Carriers SA",
      jurisdiction: "Cyprus",
      incorporationDate: "2019-11-08",
      directorInfo: "3 directors identified - 1 with PEP connections",
      shareholderStructure: "Holding company structure through 2 jurisdictions",
      verificationStatus: "PARTIAL",
      corporateRegistry: "EU jurisdiction but complex structure",
      sanctionsScreening: "Associated entity in EU grey list"
    },
    portHistory: ["Tartus, Syria", "Latakia, Syria", "Limassol, Cyprus"],
    adverseMedia: [
      "EU sanctions list: Associated entity flagged",
      "Vessel spotted near sanctioned terminal - OSINT report"
    ],
    lastAisSignal: "15 hours ago",
    flagState: "Cyprus",
    vesselAge: 12,
    lastInspection: "8 months ago",
    insuranceStatus: "Regional provider"
  },
  {
    id: 4,
    name: "PACIFIC GLORY",
    imo: "IMO 9456789",
    location: "South China Sea",
    aisStatus: "Active",
    aisGapHours: 1,
    riskZone: false,
    owner: "Global Maritime Corp (Hong Kong)",
    beneficialOwner: "Verified - Listed entity",
    ownershipDetails: {
      registeredOwner: "Global Maritime Corp",
      jurisdiction: "Hong Kong SAR",
      incorporationDate: "2005-02-18",
      directorInfo: "Hong Kong Stock Exchange - 7 directors",
      shareholderStructure: "Publicly traded - Institutional ownership 68%",
      verificationStatus: "VERIFIED",
      corporateRegistry: "Regulated jurisdiction - Annual audits filed",
      sanctionsScreening: "Clear - Comprehensive screening passed"
    },
    portHistory: ["Manila, Philippines", "Kaohsiung, Taiwan", "Busan, South Korea"],
    adverseMedia: [],
    lastAisSignal: "5 minutes ago",
    flagState: "Hong Kong",
    vesselAge: 7,
    lastInspection: "2 months ago",
    insuranceStatus: "Standard P&I Club"
  },
  {
    id: 5,
    name: "SHADOW CARRIER",
    imo: "IMO 9567890",
    location: "Red Sea",
    aisStatus: "Gap Detected",
    aisGapHours: 26,
    riskZone: true,
    owner: "Offshore Ventures Inc (Marshall Islands)",
    beneficialOwner: "Hidden - Nominee directors identified",
    ownershipDetails: {
      registeredOwner: "Offshore Ventures Inc",
      jurisdiction: "Marshall Islands",
      incorporationDate: "2022-08-01",
      directorInfo: "Corporate service provider - No beneficial owners disclosed",
      shareholderStructure: "Bearer shares suspected - Opaque structure",
      verificationStatus: "FAILED",
      corporateRegistry: "Flag of convenience - Minimal oversight",
      sanctionsScreening: "Indirect links to sanctioned network detected"
    },
    portHistory: ["Hodeidah, Yemen", "Djibouti", "Jeddah, Saudi Arabia"],
    adverseMedia: [
      "UN Panel of Experts: Vessel linked to arms smuggling investigation",
      "Insurance claim disputed - Route deviation unexplained",
      "World-Check: Multiple PEP connections identified"
    ],
    lastAisSignal: "26 hours ago",
    flagState: "Marshall Islands",
    vesselAge: 18,
    lastInspection: "22 months ago",
    insuranceStatus: "Unknown/Unverified"
  },
  {
    id: 6,
    name: "APEX TRIUMPH",
    imo: "IMO 9678901",
    location: "North Atlantic",
    aisStatus: "Active",
    aisGapHours: 0.5,
    riskZone: false,
    owner: "Atlantic Shipping PLC (UK)",
    beneficialOwner: "Verified - Public company",
    ownershipDetails: {
      registeredOwner: "Atlantic Shipping PLC",
      jurisdiction: "United Kingdom",
      incorporationDate: "1987-04-12",
      directorInfo: "LSE-listed company - 6 executive directors",
      shareholderStructure: "London Stock Exchange - Full transparency",
      verificationStatus: "VERIFIED",
      corporateRegistry: "UK Companies House - Fully compliant",
      sanctionsScreening: "Clear - No adverse findings"
    },
    portHistory: ["Rotterdam, Netherlands", "Hamburg, Germany", "Antwerp, Belgium"],
    adverseMedia: [],
    lastAisSignal: "8 minutes ago",
    flagState: "United Kingdom",
    vesselAge: 6,
    lastInspection: "1 month ago",
    insuranceStatus: "Lloyd's of London"
  },
  {
    id: 7,
    name: "DARK HORIZON",
    imo: "IMO 9789012",
    location: "Persian Gulf",
    aisStatus: "Gap Detected",
    aisGapHours: 14,
    riskZone: true,
    owner: "Oceanic Holdings Ltd (Liberia)",
    beneficialOwner: "Under investigation - Sanctions nexus suspected",
    ownershipDetails: {
      registeredOwner: "Oceanic Holdings Ltd",
      jurisdiction: "Liberia",
      incorporationDate: "2020-12-03",
      directorInfo: "Single director - Nominee service identified",
      shareholderStructure: "Shell company network across 3 jurisdictions",
      verificationStatus: "UNDER REVIEW",
      corporateRegistry: "Flag of convenience - Limited documentation",
      sanctionsScreening: "Red flag: Connected to OFAC designated entity (2 degrees)"
    },
    portHistory: ["Kharg Island, Iran", "Bandar Abbas, Iran", "Muscat, Oman"],
    adverseMedia: [
      "Treasury Department advisory: Vessel renamed 3 times in 18 months",
      "Dark activity pattern consistent with sanctions evasion"
    ],
    lastAisSignal: "14 hours ago",
    flagState: "Liberia",
    vesselAge: 15,
    lastInspection: "19 months ago",
    insuranceStatus: "Non-standard cover"
  }
];

const calculateRiskScore = (vessel) => {
  let score = 0;
  
  // AIS Gap in high-risk zone (0-35 points)
  if (vessel.aisGapHours > 24 && vessel.riskZone) {
    score += 35;
  } else if (vessel.aisGapHours > 12 && vessel.riskZone) {
    score += 28;
  } else if (vessel.aisGapHours > 6 && vessel.riskZone) {
    score += 15;
  } else if (vessel.aisGapHours > 6) {
    score += 8;
  } else if (vessel.aisGapHours > 3) {
    score += 3;
  }
  
  // Beneficial owner flags (0-25 points)
  if (vessel.beneficialOwner.includes("Hidden") || vessel.ownershipDetails.verificationStatus === "FAILED") {
    score += 25;
  } else if (vessel.beneficialOwner.includes("Unclear") || vessel.beneficialOwner.includes("Under investigation")) {
    score += 20;
  } else if (vessel.ownershipDetails.verificationStatus === "PARTIAL") {
    score += 12;
  } else if (vessel.ownershipDetails.verificationStatus === "UNDER REVIEW") {
    score += 22;
  }
  
  // Adverse media (0-30 points)
  score += Math.min(vessel.adverseMedia.length * 10, 30);
  
  // Sanctioned port history (0-20 points)
  const sanctionedPorts = ["Iran", "Syria", "Yemen"];
  const sanctionedCalls = vessel.portHistory.filter(port => 
    sanctionedPorts.some(s => port.includes(s))
  ).length;
  score += Math.min(sanctionedCalls * 10, 20);
  
  // Flag state risk (0-8 points)
  const highRiskFlags = ["Marshall Islands", "Liberia", "Panama"];
  if (highRiskFlags.includes(vessel.flagState)) {
    score += 8;
  }
  
  // Vessel age and inspection (0-7 points)
  if (vessel.vesselAge > 15) score += 4;
  if (vessel.lastInspection.includes("months ago")) {
    const months = parseInt(vessel.lastInspection);
    if (months > 18) score += 3;
    else if (months > 12) score += 2;
  }
  
  // Insurance status (0-5 points)
  if (vessel.insuranceStatus.includes("Unknown") || vessel.insuranceStatus.includes("Non-standard")) {
    score += 5;
  }
  
  return Math.min(score, 100);
};

const getRiskLevel = (score) => {
  if (score >= 75) return { label: "CRITICAL", color: "text-red-500", bg: "bg-red-500/10" };
  if (score >= 55) return { label: "HIGH", color: "text-orange-500", bg: "bg-orange-500/10" };
  if (score >= 35) return { label: "MEDIUM", color: "text-yellow-500", bg: "bg-yellow-500/10" };
  if (score >= 15) return { label: "LOW-MEDIUM", color: "text-blue-400", bg: "bg-blue-400/10" };
  return { label: "LOW", color: "text-green-500", bg: "bg-green-500/10" };
};

export default function MaritimeSanctionsAnalysisTool() {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [sortField, setSortField] = useState('riskScore');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showMemo, setShowMemo] = useState(false);

  const vesselsWithRisk = useMemo(() => {
    return VESSELS.map(v => ({
      ...v,
      riskScore: calculateRiskScore(v),
      riskLevel: getRiskLevel(calculateRiskScore(v))
    }));
  }, []);

  const filteredVessels = useMemo(() => {
    let vessels = [...vesselsWithRisk];
    
    if (filterLevel !== 'all') {
      vessels = vessels.filter(v => v.riskLevel.label === filterLevel);
    }
    
    vessels.sort((a, b) => {
      if (sortField === 'riskScore') return b.riskScore - a.riskScore;
      if (sortField === 'name') return a.name.localeCompare(b.name);
      if (sortField === 'location') return a.location.localeCompare(b.location);
      return 0;
    });
    
    return vessels;
  }, [vesselsWithRisk, sortField, filterLevel]);

  const generateComplianceMemo = () => {
    if (!selectedVessel) return '';
    
    const date = new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const riskFactors = [];
    
    if (selectedVessel.aisGapHours > 12 && selectedVessel.riskZone) {
      riskFactors.push(`• AIS Gap Detected: ${selectedVessel.aisGapHours} hours in high-risk zone (${selectedVessel.location})`);
    }
    
    if (selectedVessel.ownershipDetails.verificationStatus === "FAILED" || selectedVessel.ownershipDetails.verificationStatus === "UNDER REVIEW") {
      riskFactors.push(`• KYC/AML Red Flag: ${selectedVessel.beneficialOwner}`);
      riskFactors.push(`• Ownership Verification: ${selectedVessel.ownershipDetails.verificationStatus} - ${selectedVessel.ownershipDetails.directorInfo}`);
    }
    
    const sanctionedPorts = selectedVessel.portHistory.filter(port => 
      ["Iran", "Syria", "Yemen"].some(s => port.includes(s))
    );
    if (sanctionedPorts.length > 0) {
      riskFactors.push(`• Sanctioned Jurisdiction Exposure: Recent calls to ${sanctionedPorts.join(", ")}`);
    }
    
    if (selectedVessel.adverseMedia.length > 0) {
      riskFactors.push(`• Adverse Media: ${selectedVessel.adverseMedia.length} negative intelligence reports identified`);
    }

    if (selectedVessel.ownershipDetails.sanctionsScreening.includes("flagged") || 
        selectedVessel.ownershipDetails.sanctionsScreening.includes("Red flag")) {
      riskFactors.push(`• Sanctions Screening Alert: ${selectedVessel.ownershipDetails.sanctionsScreening}`);
    }

    return `MARITIME COMPLIANCE RISK ASSESSMENT MEMO

Date: ${date}
Subject: Enhanced Due Diligence - ${selectedVessel.name}
Analyst: Compliance Screening Unit
Classification: CONFIDENTIAL

VESSEL IDENTIFICATION
---------------------
Vessel Name: ${selectedVessel.name}
IMO Number: ${selectedVessel.imo}
Flag State: ${selectedVessel.flagState}
Vessel Age: ${selectedVessel.vesselAge} years
Last Port State Control: ${selectedVessel.lastInspection}
Insurance Provider: ${selectedVessel.insuranceStatus}

OWNERSHIP STRUCTURE & KYC ASSESSMENT
-------------------------------------
Registered Owner: ${selectedVessel.owner}
Incorporation Date: ${selectedVessel.ownershipDetails.incorporationDate}
Jurisdiction: ${selectedVessel.ownershipDetails.jurisdiction}
Director Information: ${selectedVessel.ownershipDetails.directorInfo}
Shareholder Structure: ${selectedVessel.ownershipDetails.shareholderStructure}
Corporate Registry Status: ${selectedVessel.ownershipDetails.corporateRegistry}
Beneficial Ownership: ${selectedVessel.beneficialOwner}
Verification Status: ${selectedVessel.ownershipDetails.verificationStatus}
Sanctions Screening: ${selectedVessel.ownershipDetails.sanctionsScreening}

RISK ASSESSMENT SUMMARY
-----------------------
Overall Risk Score: ${selectedVessel.riskScore}/100 (${selectedVessel.riskLevel.label})
AIS Status: ${selectedVessel.aisStatus}
Last AIS Signal: ${selectedVessel.lastAisSignal}
Current Position: ${selectedVessel.location}

KEY RISK FACTORS IDENTIFIED
----------------------------
${riskFactors.length > 0 ? riskFactors.join('\n') : 'No significant risk factors identified at this time.'}

PORT CALL HISTORY (LAST 90 DAYS)
---------------------------------
${selectedVessel.portHistory.map((port, i) => `${i + 1}. ${port}`).join('\n')}

ADVERSE MEDIA & INTELLIGENCE
-----------------------------
${selectedVessel.adverseMedia.length > 0 
  ? selectedVessel.adverseMedia.map((media, i) => `${i + 1}. ${media}`).join('\n')
  : 'No adverse media identified in current screening.'}

COMPLIANCE RECOMMENDATION
--------------------------
${selectedVessel.riskScore >= 75
  ? 'ESCALATE TO SENIOR MANAGEMENT - Do not proceed without further investigation and legal counsel. Potential sanctions violation risk. Recommend immediate cessation of business relationship pending enhanced due diligence.'
  : selectedVessel.riskScore >= 55
  ? 'ENHANCED DUE DILIGENCE REQUIRED - Request additional documentation including beneficial ownership certificates, recent port clearances, and insurance verification. Verify ownership through independent sources. Obtain senior management approval before proceeding.'
  : selectedVessel.riskScore >= 35
  ? 'STANDARD ENHANCED MONITORING - Continue periodic screening with increased frequency. Document decision rationale. Request updated KYC documentation within 30 days.'
  : selectedVessel.riskScore >= 15
  ? 'ROUTINE MONITORING - Continue standard periodic screening. No additional action required at this time.'
  : 'CLEARED FOR ENGAGEMENT - Standard ongoing monitoring applies. Low-risk counterparty.'}

This assessment is based on available open-source intelligence, AIS tracking data, sanctions screening databases (OFAC, EU, UN, HMT), World-Check, and internal risk parameters as of ${date}. 

Prepared in accordance with OFAC guidelines, EU sanctions regulations, UK Bribery Act, and internal AML/KYC policies.

---END OF MEMO---`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-slate-100">Maritime Sanctions & Dark Activity Analysis</h1>
          </div>
          <p className="text-slate-400">Financial Crime Compliance Platform - Sanctions Screening & AIS Gap Detection</p>
        </div>

        {/* Dark Activity Explanation */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <Radio className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-amber-500 mb-2">What is "Dark Activity"?</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Dark activity refers to deliberate AIS (Automatic Identification System) transponder manipulation by vessels attempting to conceal their movements. 
                When a vessel disables its AIS signal for extended periods—particularly near high-risk zones like the Persian Gulf, Eastern Mediterranean, or Red Sea—it creates 
                a tracking "gap" that may indicate sanctions evasion, illicit ship-to-ship transfers, or deceptive shipping practices.
              </p>
              <p className="text-slate-400 text-sm">
                <span className="font-semibold text-red-400">Compliance Threshold:</span> AIS gaps exceeding 12 hours in sanctioned or high-risk regions automatically trigger a HIGH or CRITICAL risk classification under our KYC/AML framework.
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
            >
              <option value="all">All Risk Levels</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Only</option>
              <option value="MEDIUM">Medium Only</option>
              <option value="LOW-MEDIUM">Low-Medium Only</option>
              <option value="LOW">Low Only</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Sort by:</span>
            <select 
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-slate-100"
            >
              <option value="riskScore">Risk Score</option>
              <option value="name">Vessel Name</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        {/* Vessel Risk Dashboard */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Vessel Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">IMO Number</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Last Known Location</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">AIS Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Risk Score</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVessels.map((vessel) => (
                  <tr 
                    key={vessel.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedVessel(vessel)}
                  >
                    <td className="px-6 py-4 font-medium text-slate-100">{vessel.name}</td>
                    <td className="px-6 py-4 text-slate-300 font-mono text-sm">{vessel.imo}</td>
                    <td className="px-6 py-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        {vessel.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {vessel.aisStatus === "Active" ? (
                          <span className="flex items-center gap-1.5 text-green-500 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-500 text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            Gap: {vessel.aisGapHours}h
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${vessel.riskLevel.bg}`}>
                        <span className={`font-bold ${vessel.riskLevel.color}`}>{vessel.riskScore}</span>
                        <span className={`text-xs font-semibold ${vessel.riskLevel.color}`}>{vessel.riskLevel.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVessel(vessel);
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Deep Dive Panel */}
        {selectedVessel && !showMemo && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-1">{selectedVessel.name}</h2>
                <p className="text-slate-400">{selectedVessel.imo} • Flag: {selectedVessel.flagState}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg ${selectedVessel.riskLevel.bg}`}>
                <div className="text-sm text-slate-400 mb-1">Risk Assessment</div>
                <div className={`text-2xl font-bold ${selectedVessel.riskLevel.color}`}>
                  {selectedVessel.riskScore}/100
                </div>
                <div className={`text-xs font-semibold ${selectedVessel.riskLevel.color}`}>
                  {selectedVessel.riskLevel.label} RISK
                </div>
              </div>
            </div>

            {/* Enhanced KYC / Ownership Section */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                KYC / BENEFICIAL OWNERSHIP ANALYSIS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Registered Owner</div>
                  <div className="text-slate-200 font-medium">{selectedVessel.ownershipDetails.registeredOwner}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Jurisdiction</div>
                  <div className="text-slate-200 font-medium">{selectedVessel.ownershipDetails.jurisdiction}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Incorporation Date</div>
                  <div className="text-slate-200 font-medium">{selectedVessel.ownershipDetails.incorporationDate}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Verification Status</div>
                  <div className={`font-bold ${
                    selectedVessel.ownershipDetails.verificationStatus === "VERIFIED" ? 'text-green-400' :
                    selectedVessel.ownershipDetails.verificationStatus === "PARTIAL" ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {selectedVessel.ownershipDetails.verificationStatus}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-2">Director Information</div>
                  <div className="text-slate-200 text-sm">{selectedVessel.ownershipDetails.directorInfo}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-2">Shareholder Structure</div>
                  <div className="text-slate-200 text-sm">{selectedVessel.ownershipDetails.shareholderStructure}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-2">Corporate Registry Status</div>
                  <div className="text-slate-200 text-sm">{selectedVessel.ownershipDetails.corporateRegistry}</div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-2">Sanctions Screening Result</div>
                  <div className={`text-sm font-medium ${
                    selectedVessel.ownershipDetails.sanctionsScreening.includes("Clear") ? 'text-green-400' :
                    selectedVessel.ownershipDetails.sanctionsScreening.includes("Red flag") ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {selectedVessel.ownershipDetails.sanctionsScreening}
                  </div>
                </div>
                
                <div className="bg-slate-900 p-4 rounded border border-slate-700">
                  <div className="text-xs text-slate-500 mb-2">Ultimate Beneficial Owner</div>
                  <div className={`text-sm font-semibold ${
                    selectedVessel.beneficialOwner.includes("Verified") ? 'text-green-400' :
                    selectedVessel.beneficialOwner.includes("Hidden") || selectedVessel.beneficialOwner.includes("Under investigation") ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {selectedVessel.beneficialOwner}
                  </div>
                </div>
              </div>

              {(selectedVessel.ownershipDetails.verificationStatus === "FAILED" || 
                selectedVessel.ownershipDetails.verificationStatus === "UNDER REVIEW") && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-400 font-semibold text-sm mb-1">⚠️ CRITICAL AML/KYC RED FLAG</div>
                      <p className="text-red-300 text-xs">
                        Beneficial ownership cannot be verified. Shell company structure, nominee directors, or bearer shares detected. 
                        Enhanced Due Diligence required before any business engagement. Consider filing Suspicious Activity Report (SAR).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* AIS Tracking */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  AIS TRACKING STATUS
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Current Status:</span>
                    <div className={`font-medium ${selectedVessel.aisStatus === "Active" ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedVessel.aisStatus}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Last Signal:</span>
                    <div className="text-slate-200">{selectedVessel.lastAisSignal}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Location:</span>
                    <div className="text-slate-200">{selectedVessel.location}</div>
                  </div>
                  {selectedVessel.aisGapHours > 12 && selectedVessel.riskZone && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <p className="text-red-400 text-xs font-semibold">🚨 DARK ACTIVITY DETECTED: AIS gap of {selectedVessel.aisGapHours} hours in high-risk sanctions zone. Possible evasion tactics.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Vessel Information */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  VESSEL INFORMATION
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Vessel Age:</span>
                    <div className="text-slate-200">{selectedVessel.vesselAge} years</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Last Inspection:</span>
                    <div className="text-slate-200">{selectedVessel.lastInspection}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Insurance Status:</span>
                    <div className={`font-medium ${
                      selectedVessel.insuranceStatus.includes("Lloyd's") || selectedVessel.insuranceStatus.includes("P&I") ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {selectedVessel.insuranceStatus}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Flag State:</span>
                    <div className="text-slate-200">{selectedVessel.flagState}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Port History */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                PORT CALL HISTORY (LAST 90 DAYS)
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedVessel.portHistory.map((port, i) => {
                  const isSanctioned = ["Iran", "Syria", "Yemen"].some(s => port.includes(s));
                  return (
                    <span 
                      key={i}
                      className={`px-3 py-1.5 rounded text-sm font-medium ${
                        isSanctioned 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {port}
                      {isSanctioned && " ⚠️"}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Adverse Media */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ADVERSE MEDIA & INTELLIGENCE
              </h3>
              {selectedVessel.adverseMedia.length > 0 ? (
                <div className="space-y-2">
                  {selectedVessel.adverseMedia.map((media, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-slate-900 rounded border border-slate-700">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-300">{media}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No adverse media identified in current screening.</p>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowMemo(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Generate Compliance Memo
            </button>
          </div>
        )}

        {/* Compliance Memo */}
        {showMemo && selectedVessel && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">Compliance Risk Assessment Memo</h2>
              <button
                onClick={() => setShowMemo(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ← Back to Analysis
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-700 rounded p-6 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap max-h-[600px] overflow-y-auto">
              {generateComplianceMemo()}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateComplianceMemo());
                  alert('Memo copied to clipboard');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold py-2 px-4 rounded transition-colors"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowMemo(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}