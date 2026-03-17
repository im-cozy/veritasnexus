import type { Article, TimelineTopic, PolicyProject, TopicPage, Document, DashboardSector, Author } from '@/types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Maria Santos',
    bio: 'Senior correspondent covering Philippine agriculture and rural development.',
    role: 'Senior Correspondent',
  },
  {
    id: '2',
    name: 'Antonio Reyes',
    bio: 'Defense and foreign affairs analyst with expertise in regional security.',
    role: 'Defense Analyst',
  },
  {
    id: '3',
    name: 'Elena Cruz',
    bio: 'Economic policy researcher focusing on trade and infrastructure.',
    role: 'Policy Researcher',
  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Rice Tariffication Law: Three Years of Impact on Filipino Farmers',
    slug: 'rice-tariffication-law-three-years-impact',
    excerpt: 'An analysis of how Republic Act 11203 has transformed the Philippine rice industry, from farmgate prices to consumer costs.',
    content: `The Rice Tariffication Law, enacted in 2019, marked a fundamental shift in Philippine agricultural policy. By replacing quantitative import restrictions with tariffs, the law aimed to stabilize rice prices and ensure food security. Three years later, the effects are complex and far-reaching.

Under the previous regime, the National Food Authority (NFA) held a monopoly on rice imports, controlling both volume and timing. This system, while protecting local farmers, often led to supply shortages and price spikes. The new law liberalized imports, allowing private traders to bring in rice subject to a 35% tariff for ASEAN imports and 40-50% for non-ASEAN sources.

The immediate effect was a significant drop in retail rice prices. From an average of ₱45 per kilogram in 2018, prices fell to around ₱38 by early 2020. Consumers benefited from greater variety and more stable supply. However, farmgate prices also declined, squeezing farmer incomes.

The Rice Competitiveness Enhancement Fund (RCEF), funded by tariff revenues, was designed to offset these impacts. With ₱10 billion annually allocated for farm machinery, seed development, training, and credit, the program has reached over 2 million farmers. Yet implementation challenges persist, with distribution uneven across regions.

Climate change has compounded these challenges. Increasing frequency of extreme weather events has affected production, making the import-dependent system both a buffer and a vulnerability. The COVID-19 pandemic and subsequent global supply chain disruptions have tested the resilience of this new approach.

Looking ahead, the Department of Agriculture is reviewing the law's implementation. Proposals include adjusting tariff rates during peak harvest seasons and strengthening the NFA's role in buffer stocking. The debate continues between those who prioritize consumer affordability and those advocating for stronger farmer protection.`,
    articleType: 'IntelligenceBrief',
    publishedAt: '2024-03-15',
    author: authors[0],
    primarySection: 'Agriculture',
    tags: ['rice', 'policy', 'tariffs', 'NFA', 'farmers'],
    sources: [
      { type: 'Legislation', label: 'Republic Act 11203', url: '#' },
      { type: 'Data', label: 'PSA Agricultural Indicators', url: '#' },
      { type: 'Official Document', label: 'DA Circular 2019-15', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For farmers', effect: 'Lower farmgate prices require adaptation; RCEF support is critical for competitiveness' },
      { stakeholder: 'For consumers', effect: 'More stable prices and greater variety, though global shocks can still cause spikes' },
      { stakeholder: 'For traders', effect: 'New opportunities in importation, but require significant capital and logistics capacity' },
      { stakeholder: 'For government', effect: 'Balancing consumer and producer interests while managing tariff revenue allocation' },
    ],
    intelligenceBrief: {
      summary: 'The Rice Tariffication Law has successfully stabilized retail prices but created challenges for domestic farmers. RCEF implementation remains uneven, and climate change is testing the resilience of the import-dependent system.',
      whatHappened: 'RA 11203 replaced import quotas with tariffs, liberalizing rice trade while creating a ₱10B annual fund for farmer support through mechanization, seeds, training, and credit.',
      whyItMatters: 'Rice is a political commodity in the Philippines. Price stability affects inflation, poverty rates, and political stability. The law represents a major policy shift with lasting implications for food security.',
      historicalContext: 'The NFA monopoly dated to the 1970s. Previous attempts at liberalization in the 1990s were reversed due to price spikes. The 2018-2019 inflation crisis created political momentum for reform.',
      possibleOutcomes: [
        'Tariff rate adjustments during harvest seasons to protect farmers',
        'Strengthened NFA role in buffer stocking and emergency response',
        'Expanded RCEF coverage and improved distribution mechanisms',
        'Regional trade agreements affecting tariff structures',
      ],
    },
    timelineTopicId: 'rice-imports',
    topicPageId: 'rice-imports',
    readTime: 8,
  },
  {
    id: '2',
    title: 'South China Sea: New Water Cannon Incident Near Second Thomas Shoal',
    slug: 'south-china-sea-water-cannon-incident',
    excerpt: 'Philippine supply vessel blocked during resupply mission to Ayungin Shoal, escalating tensions in disputed waters.',
    content: `A Philippine Navy-contracted supply vessel was blocked and blasted with water cannons by Chinese Coast Guard ships during a routine resupply mission to the BRP Sierra Madre at Second Thomas Shoal (Ayungin Shoal) on March 5, 2024. The incident marks the latest escalation in ongoing tensions between the two countries over disputed maritime claims.

The supply vessel, Unaizah May 4, was carrying food, water, and fuel for Filipino troops stationed aboard the BRP Sierra Madre, a grounded naval vessel that serves as the Philippines' outpost in the area. According to the Philippine Coast Guard, the Chinese vessels engaged in "dangerous maneuvers" and fired water cannons at close range, causing damage to the supply boat's canopy and injuring several crew members from shattered glass.

The National Task Force for the West Philippine Sea immediately condemned the incident as a violation of international law and Philippine sovereignty. Foreign Secretary Enrique Manalo filed a diplomatic protest with the Chinese embassy in Manila, while President Ferdinand Marcos Jr. called the actions "unacceptable" and vowed to continue resupply missions.

The incident occurs against a backdrop of strengthening Philippines-US defense ties. Just weeks earlier, the two countries conducted joint patrols in the South China Sea, and the US has reiterated its commitment to defend the Philippines under the 1951 Mutual Defense Treaty in case of armed attack on Philippine vessels.

China's Foreign Ministry defended the Coast Guard actions, claiming the Philippine vessel had entered Chinese waters without permission and that the measures taken were "professional, restrained, and beyond reproach." Beijing maintains its claim to nearly the entire South China Sea based on its "nine-dash line," a claim rejected by the 2016 Permanent Court of Arbitration ruling.

Analysts note that the water cannon incident follows a pattern of increasingly assertive Chinese behavior in disputed waters. Similar incidents have occurred near Scarborough Shoal and other features within the Philippines' exclusive economic zone. The timing coincides with ongoing negotiations for a Philippines-China code of conduct for maritime interactions.

The international community has largely supported the Philippine position. The United States, Japan, Australia, and the European Union have issued statements condemning the incident and calling for respect for international law, particularly UNCLOS. The incident is expected to be raised at upcoming ASEAN meetings and may influence the regional bloc's approach to the South China Sea issue.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-03-10',
    author: authors[1],
    primarySection: 'GlobalAffairs',
    tags: ['South China Sea', 'China', 'maritime dispute', 'diplomacy'],
    sources: [
      { type: 'Official Document', label: 'PCG Incident Report', url: '#' },
      { type: 'International Report', label: 'UNCLOS Arbitration Ruling 2016', url: '#' },
      { type: 'Interview', label: 'Foreign Secretary Statement', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For fishermen', effect: 'Continued restrictions on traditional fishing grounds and safety concerns in disputed waters' },
      { stakeholder: 'For defense', effect: 'Increased justification for military modernization and alliance strengthening' },
      { stakeholder: 'For diplomacy', effect: 'Pressure to accelerate bilateral code of conduct negotiations' },
      { stakeholder: 'For regional stability', effect: 'Risk of miscalculation and potential for broader conflict involving treaty allies' },
    ],
    timelineTopicId: 'south-china-sea',
    topicPageId: 'south-china-sea',
    readTime: 6,
  },
  {
    id: '3',
    title: 'North Luzon Railway: Funding Secured for Phase 1 Construction',
    slug: 'north-luzon-railway-funding-phase-1',
    excerpt: 'The Department of Transportation announces ₱777 billion total project cost with financing from multilateral development banks.',
    content: `The Department of Transportation (DOTr) has secured financing commitments for the North Luzon Railway project, one of the administration's flagship infrastructure programs. The ₱777 billion project will connect Metro Manila to key cities in Central and Northern Luzon, reducing travel time and stimulating economic development in the region.

Phase 1 of the project, covering the Manila to Malolos segment spanning 37 kilometers, has received funding approval from the Asian Development Bank (ADB) and the Japan International Cooperation Agency (JICA). Construction is scheduled to begin in the third quarter of 2024, with completion targeted for 2028.

The railway will feature modern electric multiple unit (EMU) trains capable of speeds up to 160 kilometers per hour. Stations are planned at Tutuban, Solis, Valenzuela, Meycauayan, and Malolos, with provisions for future extension to Clark International Airport and beyond to Tarlac City.

Secretary Jaime Bautista emphasized the project's transformative potential for regional development. "This is not just a transportation project," he said at the signing ceremony. "This is an economic corridor that will unlock opportunities for millions of Filipinos in Central and Northern Luzon."

The project includes provisions for integrated urban development around station areas, following transit-oriented development (TOD) principles. The Bases Conversion and Development Authority (BCDA) is coordinating with local government units to plan commercial and residential developments that will maximize the railway's economic impact.

Environmental assessments have identified mitigation measures for the project's impact on agricultural lands and waterways. The DOTr has committed to implementing world-class environmental management practices and ensuring compliance with international standards.

Critics have raised concerns about land acquisition and displacement of informal settlers along the railway corridor. The DOTr has established a resettlement action plan in coordination with the National Housing Authority, though implementation challenges remain.

The North Luzon Railway is part of the broader "Build Better More" infrastructure program. When completed, it will form a critical link in a proposed Luzon-wide rail network connecting to the existing Manila-Bicol line and planned South Luzon Expressway extension.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-03-08',
    author: authors[2],
    primarySection: 'National',
    tags: ['infrastructure', 'railway', 'DOTr', 'transportation'],
    sources: [
      { type: 'Official Document', label: 'DOTr Project Brief', url: '#' },
      { type: 'International Report', label: 'ADB Loan Agreement', url: '#' },
      { type: 'Research Paper', label: 'NEDA Infrastructure Review', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For commuters', effect: 'Reduced travel time from Manila to Bulacan from 2 hours to 35 minutes' },
      { stakeholder: 'For businesses', effect: 'New logistics options and access to expanded labor markets' },
      { stakeholder: 'For property owners', effect: 'Value appreciation near station areas, potential displacement concerns' },
      { stakeholder: 'For government', effect: 'Long-term debt obligations and operational subsidy requirements' },
    ],
    timelineTopicId: 'north-luzon-railway',
    topicPageId: 'north-luzon-railway',
    readTime: 5,
  },
  {
    id: '4',
    title: 'AFP Modernization Program Enters Phase 3 with New Procurement Priorities',
    slug: 'afp-modernization-phase-3-procurement',
    excerpt: 'The Armed Forces of the Philippines outlines ₱300 billion allocation for 2023-2028 focusing on maritime domain awareness and coastal defense.',
    content: `The Armed Forces of the Philippines (AFP) has unveiled its modernization priorities for Phase 3 of the Revised AFP Modernization Program, covering the period 2023-2028. With a total allocation of ₱300 billion, the program emphasizes maritime domain awareness, coastal defense, and cyber capabilities in response to evolving security challenges.

The new phase builds on achievements from the first two phases, which saw the acquisition of fighter jets, frigates, helicopters, and various ground equipment. Phase 3 will prioritize systems that enhance the AFP's ability to monitor and protect Philippine maritime interests, particularly in the West Philippine Sea.

Key procurement items include additional offshore patrol vessels, coastal radar systems, unmanned aerial vehicles (UAVs), and anti-ship missile systems. The Navy will receive the largest share of the budget, reflecting the maritime focus of current security concerns. The Air Force will continue fleet modernization with additional fighter aircraft and maritime patrol aircraft.

Secretary of National Defense Gilberto Teodoro Jr. emphasized the program's alignment with the Comprehensive Archipelagic Defense Concept (CADC), which recognizes the Philippines' unique geography and the need for distributed defense capabilities across the archipelago. "We are building an AFP that can protect every island, every reef, every maritime feature under Philippine sovereignty," Teodoro stated.

The program also addresses internal security requirements, with continued procurement of mobility assets, communications equipment, and individual soldier gear for ground forces. The ongoing transition from internal security operations to territorial defense requires balancing capabilities for both missions.

Funding will come from a combination of general appropriations, multi-year obligational authority, and potential foreign financing. The Department of National Defense is exploring government-to-government agreements with traditional allies as well as alternative suppliers to diversify sources.

Critics have raised concerns about procurement delays and the gap between approved budgets and actual acquisitions. The Commission on Audit has identified issues with contract implementation in previous phases. The DND has pledged improved program management and transparency in Phase 3.

The modernization program occurs within the context of strengthening defense alliances, particularly with the United States and Australia. Joint exercises and training programs are helping the AFP integrate new capabilities and develop operational concepts for territorial defense.`,
    articleType: 'IntelligenceBrief',
    publishedAt: '2024-03-05',
    author: authors[1],
    primarySection: 'National',
    tags: ['defense', 'military', 'AFP', 'modernization', 'procurement'],
    sources: [
      { type: 'Legislation', label: 'RA 10349 AFP Modernization Act', url: '#' },
      { type: 'Official Document', label: 'DND Program Brief', url: '#' },
      { type: 'Budget', label: 'GAA 2024 Defense Appropriations', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For defense industry', effect: 'New procurement opportunities with emphasis on maritime and cyber systems' },
      { stakeholder: 'For regional security', effect: 'Enhanced Philippine capabilities affecting balance in South China Sea' },
      { stakeholder: 'For alliance partners', effect: 'Increased interoperability opportunities and defense cooperation' },
      { stakeholder: 'For taxpayers', effect: 'Multi-year budget commitments requiring fiscal sustainability' },
    ],
    intelligenceBrief: {
      summary: 'AFP Modernization Phase 3 allocates ₱300 billion for 2023-2028, prioritizing maritime domain awareness and coastal defense capabilities to address West Philippine Sea challenges.',
      whatHappened: 'The DND has finalized procurement priorities for Phase 3, with emphasis on naval and air assets for territorial defense, following completion of major acquisitions in Phases 1 and 2.',
      whyItMatters: 'The Philippines faces increasing maritime security challenges. Modernization is essential for credible deterrence and protection of sovereign interests in the West Philippine Sea.',
      historicalContext: 'The AFP Modernization Program began in 1995 (RA 7898) and was extended and expanded by RA 10349 in 2012. Previous phases focused on rebuilding basic capabilities after years of neglect.',
      possibleOutcomes: [
        'Accelerated procurement through government-to-government agreements',
        'Expanded joint development and technology transfer arrangements',
        'Integration of unmanned systems and cyber capabilities',
        'Continued reliance on alliance partnerships for advanced capabilities',
      ],
    },
    knowledgeBox: {
      title: 'AFP Modernization Program',
      entries: [
        { question: 'What is the AFP Modernization Program?', answer: 'A multi-phase program to upgrade Philippine military capabilities, authorized by RA 7898 (1995) and expanded by RA 10349 (2012).' },
        { question: 'How much has been allocated?', answer: 'Phase 1 (2013-2018): ₱75B | Phase 2 (2018-2022): ₱125B | Phase 3 (2023-2028): ₱300B' },
        { question: 'What has been acquired so far?', answer: 'FA-50 fighter jets, Jose Rizal-class frigates, S-70i Black Hawk helicopters, various ground vehicles and equipment.' },
      ],
    },
    timelineTopicId: 'afp-modernization',
    topicPageId: 'afp-modernization',
    readTime: 7,
  },
  {
    id: '5',
    title: 'Philippine Inflation Cools to 3.4% in February as Food Prices Stabilize',
    slug: 'philippine-inflation-february-2024',
    excerpt: 'Bangko Sentral signals potential rate cuts as headline inflation falls within target range for third consecutive month.',
    content: `Philippine inflation eased to 3.4% year-on-year in February 2024, down from 3.9% in January, as food price pressures continued to moderate. The figure marks the third consecutive month that inflation has fallen within the Bangko Sentral ng Pilipinas (BSP) target range of 2-4%, strengthening expectations for potential monetary policy easing.

The Philippine Statistics Authority attributed the slowdown primarily to slower increases in food and non-alcoholic beverages, which contribute significantly to the consumer price index. Rice inflation, in particular, decelerated to 15.1% from 17.9% in January, though it remains elevated compared to historical levels.

Transport costs also contributed to the disinflation trend, with fuel prices stabilizing following volatility in previous months. The Department of Energy's price monitoring showed minimal movement in gasoline and diesel prices during the reference period.

Core inflation, which excludes volatile food and energy items, also declined to 3.6% from 4.0%, suggesting underlying price pressures are easing. This metric is closely watched by the BSP as it indicates more persistent inflation trends.

BSP Governor Eli Remolona Jr. welcomed the development but maintained a cautious stance on monetary policy. "We are seeing the inflation trajectory moving favorably, but we need to be confident that this trend is sustainable before considering policy adjustments," he said in a briefing.

Analysts are divided on the timing of potential rate cuts. Some expect the BSP to begin easing in the second quarter, following the lead of other central banks in the region. Others argue the BSP will maintain its hawkish stance until the US Federal Reserve signals clearer direction on its own policy path.

The inflation outlook for the remainder of 2024 remains subject to several risks. El Niño conditions are expected to affect agricultural production, potentially putting upward pressure on food prices. Geopolitical tensions in the Middle East could also trigger oil price volatility.

The government has implemented various measures to support the disinflation trend, including tariff reductions on certain food items and increased agricultural imports. The Department of Agriculture has also accelerated distribution of climate-resilient seeds and inputs to mitigate El Niño impacts.

For consumers, the easing inflation provides some relief after the high prices experienced in 2022-2023. Real wage growth, which had been negative during the high inflation period, is beginning to turn positive, supporting household purchasing power.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-03-05',
    author: authors[2],
    primarySection: 'Economy',
    tags: ['inflation', 'BSP', 'monetary policy', 'prices', 'economy'],
    sources: [
      { type: 'Data', label: 'PSA Consumer Price Index', url: '#' },
      { type: 'Official Document', label: 'BSP Monetary Policy Statement', url: '#' },
      { type: 'Research Paper', label: 'NEDA Economic Outlook', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For consumers', effect: 'Gradual relief from high prices, improving purchasing power as real wages recover' },
      { stakeholder: 'For borrowers', effect: 'Potential for lower interest rates on loans if BSP begins easing cycle' },
      { stakeholder: 'For investors', effect: 'Improved investment climate with stable prices and potential rate cuts' },
      { stakeholder: 'For exporters', effect: 'Potential peso weakness if rate differential with US narrows' },
    ],
    readTime: 5,
  },
  {
    id: '6',
    title: 'El Niño Impact: DA Projects 10% Drop in Rice Production',
    slug: 'el-nino-rice-production-drop-2024',
    excerpt: 'Agriculture department warns of production shortfall as dry conditions affect major rice-growing regions.',
    content: `The Department of Agriculture (DA) has projected a 10% decline in rice production for the first half of 2024 due to the ongoing El Niño phenomenon. The dry conditions have affected irrigation water availability in major rice-producing regions, forcing farmers to reduce planted areas or shift to less water-intensive crops.

The Philippine Rice Research Institute (PhilRice) reports that over 200,000 hectares of rice lands have been affected by water shortages, particularly in Central Luzon and Ilocos regions. Standing crops in these areas face yield reductions, while planting intentions for the upcoming cropping season have been revised downward.

Agriculture Secretary Francisco Tiu Laurel Jr. announced emergency measures to mitigate the impact, including the activation of water pumps, distribution of drought-resistant rice varieties, and provision of production subsidies to affected farmers. The DA has also accelerated the importation of 300,000 metric tons of rice to maintain buffer stocks.

The National Irrigation Administration (NIA) is implementing rotational irrigation schedules to maximize limited water supplies. Priority is being given to areas with standing crops, while new plantings are being discouraged in water-scarce areas.

Climate experts warn that the El Niño conditions could persist until mid-2024, extending the period of agricultural stress. The Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA) has advised farmers to adjust planting calendars and adopt water-saving technologies.

The production shortfall comes at a critical time for the rice sector, which is still adjusting to the Rice Tariffication Law regime. Lower domestic production could increase reliance on imports, putting pressure on the country's foreign exchange reserves and potentially affecting farmgate prices.

Farmer groups have called for expanded government support, including higher subsidies for inputs, crop insurance payouts, and cash assistance for affected households. The Federation of Free Farmers has criticized the response as insufficient given the scale of the challenge.

The DA has committed to real-time monitoring of the situation and adjustment of interventions as needed. Regional field offices have been directed to conduct rapid assessments and coordinate with local government units for on-ground response.

Long-term adaptation strategies are also being emphasized, including the expansion of irrigation coverage, promotion of water-efficient farming practices, and development of climate-resilient rice varieties through PhilRice breeding programs.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-03-01',
    author: authors[0],
    primarySection: 'Agriculture',
    tags: ['El Niño', 'rice', 'agriculture', 'climate', 'irrigation'],
    sources: [
      { type: 'Data', label: 'DA Production Statistics', url: '#' },
      { type: 'Official Document', label: 'PAGASA Climate Advisory', url: '#' },
      { type: 'Research Paper', label: 'PhilRice Impact Assessment', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For farmers', effect: 'Reduced yields and income losses; need for crop diversification and insurance claims' },
      { stakeholder: 'For consumers', effect: 'Potential price increases if domestic supply tightens significantly' },
      { stakeholder: 'For government', effect: 'Pressure to release buffer stocks and accelerate imports' },
      { stakeholder: 'For traders', effect: 'Increased import opportunities but with price volatility risks' },
    ],
    readTime: 6,
  },
  {
    id: '7',
    title: 'ASEAN Summit: Philippines Pushes for Code of Conduct Progress',
    slug: 'asean-summit-code-of-conduct-philippines',
    excerpt: 'President Marcos calls for concrete outcomes in South China Sea negotiations amid ongoing tensions.',
    content: `President Ferdinand Marcos Jr. used the 42nd ASEAN Summit platform to push for progress on the Code of Conduct (COC) negotiations for the South China Sea, calling for concrete outcomes that would reduce tensions and prevent incidents in disputed waters. The Philippine leader emphasized the urgency of a binding agreement given recent confrontations between claimant states.

In his intervention during the summit's plenary session, Marcos highlighted the March 5 water cannon incident near Second Thomas Shoal as evidence of the risks posed by the absence of clear rules governing behavior in contested areas. He urged fellow ASEAN members to present a united front in negotiations with China.

The Philippines currently serves as country coordinator for ASEAN-China dialogue relations, giving it additional leverage in shaping the agenda for COC negotiations. Foreign Secretary Enrique Manalo has been conducting shuttle diplomacy among ASEAN capitals to align positions ahead of formal talks.

Progress on the COC has been slow since negotiations began in 2002. The original Declaration on the Conduct of Parties (DOC) was non-binding, and efforts to develop a more robust code have been hampered by disagreements over geographic scope, enforcement mechanisms, and the relationship with UNCLOS.

China has expressed willingness to accelerate negotiations, with Foreign Minister Wang Yi suggesting a three-year timeline for completion during his recent visit to the region. However, Southeast Asian diplomats remain skeptical about Beijing's commitment to a meaningful agreement.

The summit's chairman's statement included language on the South China Sea that was stronger than in previous years, expressing concern over incidents and reaffirming the importance of UNCLOS. However, it stopped short of naming specific countries or incidents.

Beyond the South China Sea, Marcos also promoted Philippine priorities on maritime cooperation, climate change, and regional economic integration. The Philippines is preparing to assume the ASEAN chair in 2026, which will require significant diplomatic preparation.

Analysts note that the Philippines' more assertive stance on the South China Sea represents a shift from the accommodationist approach of the previous administration. The current strategy emphasizes alliance-building, international law, and multilateral diplomacy to pressure China into meaningful concessions.

The summit also saw discussions on the Myanmar crisis, with ASEAN members divided on how to respond to the ongoing conflict. The Philippines joined calls for full implementation of the Five-Point Consensus, though recognition is growing that the current approach has failed to produce results.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-02-28',
    author: authors[1],
    primarySection: 'GlobalAffairs',
    tags: ['ASEAN', 'diplomacy', 'South China Sea', 'Code of Conduct'],
    sources: [
      { type: 'Official Document', label: 'ASEAN Chairman\'s Statement', url: '#' },
      { type: 'Interview', label: 'DFA Briefing', url: '#' },
      { type: 'International Report', label: 'UNCLOS Text', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For regional stability', effect: 'Potential for reduced tensions if binding COC is achieved' },
      { stakeholder: 'For claimant states', effect: 'Stronger ASEAN position improves negotiating leverage with China' },
      { stakeholder: 'For maritime industries', effect: 'Clearer rules could reduce risks for fishing and resource extraction' },
      { stakeholder: 'For alliance partners', effect: 'US and allies support COC but remain committed to treaty obligations' },
    ],
    readTime: 6,
  },
  {
    id: '8',
    title: 'National Irrigation Program: NIA Reports 60% Project Completion Rate',
    slug: 'national-irrigation-program-completion-rate',
    excerpt: 'Agency faces challenges with funding gaps and right-of-way issues despite progress on major systems.',
    content: `The National Irrigation Administration (NIA) has reported a 60% completion rate for projects under the National Irrigation Program, with 150,000 hectares of new irrigation service area added in the past year. However, the agency acknowledged challenges including funding gaps, right-of-way issues, and climate impacts that have delayed some major projects.

Administrator Eduardo Guillen presented the agency's performance report to congressional oversight committees, highlighting achievements in rehabilitating existing systems and constructing new diversion dams and canal networks. The Balog-Balog Multipurpose Project in Tarlac, a flagship undertaking, has reached 75% completion with full operation expected by 2025.

The NIA is prioritizing climate-resilient irrigation infrastructure, incorporating features such as flood control gates, sediment management systems, and automated monitoring. These enhancements are designed to protect investments from increasingly extreme weather events.

Despite progress, the agency faces a significant backlog in irrigation development. Of the 3.1 million hectares of irrigable lands identified in national plans, only 1.9 million hectares currently have service. The gap represents a major constraint on agricultural productivity and farmer incomes.

Funding remains the primary challenge. The NIA's proposed budget for 2024 was reduced by Congress, forcing prioritization of ongoing projects over new starts. The agency is exploring public-private partnerships and foreign financing to bridge the gap.

Right-of-way acquisition continues to delay projects, particularly in densely populated areas. The NIA has called for stronger eminent domain powers and streamlined compensation procedures to accelerate land acquisition.

The irrigation program is closely linked to the Rice Tariffication Law's Rice Competitiveness Enhancement Fund (RCEF), which allocates resources for irrigation development. Coordination between NIA and the Department of Agriculture has improved, but implementation bottlenecks persist.

Farmer groups have raised concerns about irrigation service fees and the quality of maintenance on NIA-managed systems. The agency has committed to improving service delivery and exploring participatory management models that give farmers greater involvement in system operation.

The El Niño phenomenon has highlighted the vulnerability of rain-fed agriculture and the critical importance of irrigation. The NIA is accelerating emergency measures including the rehabilitation of shallow tube wells and small farm reservoirs to provide immediate relief to drought-affected areas.`,
    articleType: 'NewsAnalysis',
    publishedAt: '2024-02-25',
    author: authors[0],
    primarySection: 'Agriculture',
    tags: ['irrigation', 'NIA', 'infrastructure', 'agriculture', 'water'],
    sources: [
      { type: 'Official Document', label: 'NIA Annual Report', url: '#' },
      { type: 'Budget', label: 'GAA 2024 NIA Appropriations', url: '#' },
      { type: 'Research Paper', label: 'PIDS Irrigation Study', url: '#' },
    ],
    whatItMeans: [
      { stakeholder: 'For farmers', effect: 'Expanded irrigation access improves yields and reduces climate risk' },
      { stakeholder: 'For food security', effect: 'Increased production capacity supports self-sufficiency goals' },
      { stakeholder: 'For government', effect: 'Large capital requirements and long-term maintenance obligations' },
      { stakeholder: 'For environment', effect: 'Need to balance water extraction with sustainability concerns' },
    ],
    timelineTopicId: 'irrigation-infrastructure',
    topicPageId: 'irrigation-infrastructure',
    readTime: 5,
  },
];

export const timelineTopics: TimelineTopic[] = [
  {
    id: 'rice-imports',
    name: 'Rice Import Policy',
    slug: 'rice-imports',
    description: 'The evolution of Philippine rice import policy from NFA monopoly to tariffication and its ongoing impacts.',
    entries: [
      { id: '1', date: '2019-03-05', year: 2019, heading: 'Rice Tariffication Law Signed', summary: 'President Duterte signs RA 11203, replacing quantitative import restrictions with tariffs.' },
      { id: '2', date: '2019-06-30', year: 2019, heading: 'RCEF Established', summary: 'Rice Competitiveness Enhancement Fund created with ₱10 billion annual allocation.' },
      { id: '3', date: '2020-04-15', year: 2020, heading: 'Import Surge During Pandemic', summary: 'Private imports increase significantly as government ensures food security during COVID-19.' },
      { id: '4', date: '2022-09-01', year: 2022, heading: 'Price Spike Triggers Review', summary: 'Global supply disruptions cause domestic rice prices to rise, prompting calls for policy adjustments.' },
      { id: '5', date: '2023-07-20', year: 2023, heading: 'Price Ceiling Imposed', summary: 'President Marcos orders temporary price caps on rice amid inflation concerns.' },
      { id: '6', date: '2024-03-15', year: 2024, heading: 'Three-Year Assessment', summary: 'Comprehensive review shows mixed results: stable consumer prices but farmer income challenges.', isCurrent: true },
    ],
  },
  {
    id: 'south-china-sea',
    name: 'South China Sea Dispute',
    slug: 'south-china-sea',
    description: 'The ongoing maritime dispute involving the Philippines, China, and other claimant states.',
    entries: [
      { id: '1', date: '2012-04-10', year: 2012, heading: 'Scarborough Shoal Standoff', summary: 'Philippine-China naval standoff begins at Scarborough Shoal, leading to China\'s effective control.' },
      { id: '2', date: '2013-01-22', year: 2013, heading: 'Arbitration Case Filed', summary: 'Philippines files case with Permanent Court of Arbitration challenging China\'s nine-dash line claim.' },
      { id: '3', date: '2016-07-12', year: 2016, heading: 'Arbitration Ruling', summary: 'Court rules in favor of Philippines, invalidating China\'s historical claims under UNCLOS.' },
      { id: '4', date: '2020-04-18', year: 2020, heading: 'Vietnamese Vessel Sinking', summary: 'Chinese maritime militia vessel sinks Vietnamese fishing boat near Paracel Islands.' },
      { id: '5', date: '2023-08-05', year: 2023, heading: 'Water Cannon Incident', summary: 'Chinese Coast Guard uses water cannons against Philippine resupply vessel at Second Thomas Shoal.' },
      { id: '6', date: '2024-03-10', year: 2024, heading: 'New Confrontation', summary: 'Another water cannon incident occurs during resupply mission, causing injuries to crew members.', isCurrent: true },
    ],
  },
  {
    id: 'afp-modernization',
    name: 'Philippine Military Modernization',
    slug: 'afp-modernization',
    description: 'The multi-phase program to upgrade Armed Forces of the Philippines capabilities.',
    entries: [
      { id: '1', date: '1995-02-23', year: 1995, heading: 'RA 7898 Enacted', summary: 'AFP Modernization Act signed, establishing the legal framework for capability upgrades.' },
      { id: '2', date: '2012-12-11', year: 2012, heading: 'RA 10349 Passed', summary: 'Revised AFP Modernization Act extends program and increases funding allocation.' },
      { id: '3', date: '2015-11-28', year: 2015, heading: 'FA-50 Jets Delivered', summary: 'First batch of Korean-made fighter jets arrives, marking return to supersonic capability.' },
      { id: '4', date: '2020-07-10', year: 2020, heading: 'Jose Rizal Frigate Commissioned', summary: 'First missile-capable frigate enters service, enhancing naval surface warfare capability.' },
      { id: '5', date: '2022-06-30', year: 2022, heading: 'Phase 2 Concludes', summary: 'Second modernization phase ends with major acquisitions completed across all services.' },
      { id: '6', date: '2024-03-05', year: 2024, heading: 'Phase 3 Priorities Announced', summary: '₱300 billion allocation for 2023-2028 with focus on maritime domain awareness.', isCurrent: true },
    ],
  },
  {
    id: 'north-luzon-railway',
    name: 'North Luzon Railway',
    slug: 'north-luzon-railway',
    description: 'The flagship railway project connecting Metro Manila to Central and Northern Luzon.',
    entries: [
      { id: '1', date: '2018-09-12', year: 2018, heading: 'Project Concept Approved', summary: 'NEDA approves concept for North-South Railway Project including North Luzon segment.' },
      { id: '2', date: '2020-02-15', year: 2020, heading: 'Financing Negotiations Begin', summary: 'DOTr begins discussions with ADB and JICA for project funding.' },
      { id: '3', date: '2021-11-30', year: 2021, heading: 'Detailed Design Completed', summary: 'Engineering studies and detailed designs for Phase 1 finalized.' },
      { id: '4', date: '2023-06-15', year: 2023, heading: 'Loan Agreements Signed', summary: 'Financing agreements finalized with multilateral development banks.' },
      { id: '5', date: '2024-03-08', year: 2024, heading: 'Construction to Begin', summary: 'DOTr announces Q3 2024 start date for Manila-Malolos segment.', isCurrent: true },
    ],
  },
  {
    id: 'irrigation-infrastructure',
    name: 'Irrigation Infrastructure',
    slug: 'irrigation-infrastructure',
    description: 'National irrigation development and the challenges of water security for Philippine agriculture.',
    entries: [
      { id: '1', date: '2015-08-20', year: 2015, heading: 'National Irrigation Program Launched', summary: 'Comprehensive program to expand irrigation coverage and rehabilitate existing systems.' },
      { id: '2', date: '2018-03-10', year: 2018, heading: 'Balog-Balog Project Resumed', summary: 'Major multipurpose project in Tarlac restarted after years of delay.' },
      { id: '3', date: '2019-06-30', year: 2019, heading: 'RCEF Irrigation Component', summary: 'Rice Tariffication Law allocates portion of tariff revenues for irrigation development.' },
      { id: '4', date: '2022-11-15', year: 2022, heading: 'Climate-Resilient Design Standards', summary: 'NIA adopts new engineering standards to address extreme weather challenges.' },
      { id: '5', date: '2024-02-25', year: 2024, heading: '60% Completion Reported', summary: 'NIA reports progress but acknowledges funding gaps and implementation challenges.', isCurrent: true },
    ],
  },
];

export const policyProjects: PolicyProject[] = [
  {
    id: '1',
    name: 'North Luzon Railway',
    slug: 'north-luzon-railway',
    agency: 'DOTr',
    budget: '₱777B',
    status: 'Ongoing',
    description: 'Flagship railway project connecting Metro Manila to Central and Northern Luzon, reducing travel time and stimulating regional development.',
    startDate: '2024-07-01',
    targetDate: '2028-12-31',
    fundingSource: 'ADB, JICA, GOP',
    updates: [
      { date: '2024-03-08', summary: 'Financing secured, construction to begin Q3 2024' },
      { date: '2023-06-15', summary: 'Loan agreements signed with ADB and JICA' },
      { date: '2021-11-30', summary: 'Detailed design for Phase 1 completed' },
      { date: '2020-02-15', summary: 'Financing negotiations initiated' },
      { date: '2018-09-12', summary: 'Project concept approved by NEDA' },
    ],
    sectionTag: 'Infrastructure',
  },
  {
    id: '2',
    name: 'National Irrigation Development Program',
    slug: 'national-irrigation-program',
    agency: 'NIA',
    budget: '₱45B',
    status: 'Ongoing',
    description: 'Expansion and rehabilitation of national irrigation systems to increase service area and improve water security for agriculture.',
    fundingSource: 'GAA, RCEF',
    updates: [
      { date: '2024-02-25', summary: '60% completion rate reported, funding gaps acknowledged' },
      { date: '2023-07-10', summary: 'Climate-resilient design standards adopted' },
      { date: '2022-11-15', summary: 'Expanded partnership with DA on RCEF-funded projects' },
    ],
    sectionTag: 'Agriculture',
  },
  {
    id: '3',
    name: 'Samar Pacific Coastal Road',
    slug: 'samar-pacific-coastal-road',
    agency: 'DPWH',
    budget: '₱32B',
    status: 'Planning',
    description: 'Coastal highway project connecting Samar provinces to improve connectivity and support economic development in Eastern Visayas.',
    fundingSource: 'GAA, ODA',
    updates: [
      { date: '2024-01-20', summary: 'Detailed engineering design ongoing' },
    ],
    sectionTag: 'Infrastructure',
  },
  {
    id: '4',
    name: 'AFP Modernization Phase 3',
    slug: 'afp-modernization-phase-3',
    agency: 'DND',
    budget: '₱300B',
    status: 'Ongoing',
    description: 'Third phase of military modernization focusing on maritime domain awareness, coastal defense, and cyber capabilities.',
    startDate: '2023-01-01',
    targetDate: '2028-12-31',
    fundingSource: 'GAA, FYOA',
    updates: [
      { date: '2024-03-05', summary: 'Procurement priorities announced, ₱300B allocated' },
      { date: '2023-06-30', summary: 'Phase 2 concluded with major acquisitions' },
      { date: '2022-12-15', summary: 'DND finalized Phase 3 capability requirements' },
    ],
    sectionTag: 'Defense',
  },
  {
    id: '5',
    name: 'Balog-Balog Multipurpose Project',
    slug: 'balog-balog-project',
    agency: 'NIA',
    budget: '₱18B',
    status: 'Ongoing',
    description: 'Major multipurpose dam and irrigation project in Tarlac providing water for agriculture and domestic use.',
    targetDate: '2025-12-31',
    fundingSource: 'GAA, ODA',
    updates: [
      { date: '2024-02-25', summary: '75% completion achieved' },
      { date: '2018-03-10', summary: 'Project resumed after years of delay' },
    ],
    sectionTag: 'Agriculture',
  },
  {
    id: '6',
    name: 'National Broadband Program',
    slug: 'national-broadband-program',
    agency: 'DICT',
    budget: '₱25B',
    status: 'Delayed',
    description: 'Government-owned broadband infrastructure to improve internet connectivity across the Philippines, particularly in underserved areas.',
    fundingSource: 'GAA',
    updates: [
      { date: '2024-01-15', summary: 'Implementation delayed due to right-of-way issues' },
      { date: '2023-06-20', summary: 'Phase 1 target revised to 2025' },
    ],
    sectionTag: 'Infrastructure',
  },
];

export const topicPages: TopicPage[] = [
  {
    id: 'rice-imports',
    name: 'Rice Import Policy',
    slug: 'rice-imports',
    overview: 'Philippine rice import policy has undergone fundamental transformation with the Rice Tariffication Law (RA 11203), which replaced the National Food Authority\'s import monopoly with a tariff-based system. This change has stabilized consumer prices but created challenges for domestic farmers.',
    keyActors: [
      { name: 'Francisco Tiu Laurel Jr.', role: 'Secretary', organization: 'Department of Agriculture' },
      { name: 'National Food Authority', role: 'Buffer Stock Management', organization: 'NFA Council' },
      { name: 'Raul Montemayor', role: 'National Manager', organization: 'Federation of Free Farmers' },
    ],
    relatedPolicies: policyProjects.filter(p => p.sectionTag === 'Agriculture'),
    tags: ['rice', 'agriculture', 'trade', 'food security', 'NFA'],
    relatedArticles: articles.filter(a => a.tags.includes('rice') || a.primarySection === 'Agriculture'),
  },
  {
    id: 'south-china-sea',
    name: 'South China Sea Dispute',
    slug: 'south-china-sea',
    overview: 'The South China Sea dispute involves competing territorial and maritime claims among several sovereign states, including the Philippines and China. The 2016 Permanent Court of Arbitration ruling invalidated China\'s nine-dash line claim, but tensions persist.',
    keyActors: [
      { name: 'Enrique Manalo', role: 'Secretary of Foreign Affairs', organization: 'DFA' },
      { name: 'Gilberto Teodoro Jr.', role: 'Secretary of National Defense', organization: 'DND' },
      { name: 'Ronald Mercado', role: 'Chief of Staff', organization: 'Armed Forces of the Philippines' },
    ],
    relatedPolicies: policyProjects.filter(p => p.sectionTag === 'Defense'),
    tags: ['maritime dispute', 'China', 'UNCLOS', 'diplomacy', 'defense'],
    relatedArticles: articles.filter(a => a.tags.includes('South China Sea') || a.tags.includes('China')),
  },
  {
    id: 'afp-modernization',
    name: 'AFP Modernization',
    slug: 'afp-modernization',
    overview: 'The Armed Forces of the Philippines Modernization Program is a multi-phase initiative to upgrade military capabilities. Phase 3 (2023-2028) focuses on maritime domain awareness and coastal defense in response to West Philippine Sea challenges.',
    keyActors: [
      { name: 'Gilberto Teodoro Jr.', role: 'Secretary of National Defense', organization: 'DND' },
      { name: 'Ronald Mercado', role: 'Chief of Staff', organization: 'AFP' },
      { name: 'Toribio Adaci Jr.', role: 'Flag Officer in Command', organization: 'Philippine Navy' },
    ],
    relatedPolicies: policyProjects.filter(p => p.sectionTag === 'Defense'),
    tags: ['defense', 'military', 'procurement', 'West Philippine Sea'],
    relatedArticles: articles.filter(a => a.tags.includes('AFP') || a.tags.includes('modernization')),
  },
  {
    id: 'north-luzon-railway',
    name: 'North Luzon Railway',
    slug: 'north-luzon-railway',
    overview: 'The North Luzon Railway is a flagship infrastructure project connecting Metro Manila to Central and Northern Luzon. With a total cost of ₱777 billion, it represents one of the largest transportation investments in Philippine history.',
    keyActors: [
      { name: 'Jaime Bautista', role: 'Secretary', organization: 'Department of Transportation' },
      { name: 'Joshua Bingcang', role: 'President', organization: 'Bases Conversion and Development Authority' },
      { name: 'Eduardo Guillen', role: 'Administrator', organization: 'Philippine National Railways' },
    ],
    relatedPolicies: policyProjects.filter(p => p.slug === 'north-luzon-railway'),
    tags: ['infrastructure', 'railway', 'transportation', 'Build Better More'],
    relatedArticles: articles.filter(a => a.tags.includes('railway') || a.tags.includes('infrastructure')),
  },
  {
    id: 'irrigation-infrastructure',
    name: 'Irrigation Infrastructure',
    slug: 'irrigation-infrastructure',
    overview: 'Irrigation development is critical for Philippine agricultural productivity and food security. The National Irrigation Administration manages over 1.9 million hectares of service area, with expansion ongoing under the National Irrigation Program.',
    keyActors: [
      { name: 'Eduardo Guillen', role: 'Administrator', organization: 'National Irrigation Administration' },
      { name: 'Francisco Tiu Laurel Jr.', role: 'Secretary', organization: 'Department of Agriculture' },
      { name: 'Ronilo Beronio', role: 'Executive Director', organization: 'PhilRice' },
    ],
    relatedPolicies: policyProjects.filter(p => p.sectionTag === 'Agriculture'),
    tags: ['irrigation', 'agriculture', 'water', 'NIA', 'climate'],
    relatedArticles: articles.filter(a => a.tags.includes('irrigation') || a.tags.includes('NIA')),
  },
];

export const documents: Document[] = [
  {
    id: '1',
    title: 'Republic Act 11203 - Rice Tariffication Law',
    slug: 'ra-11203-rice-tariffication',
    summary: 'An Act liberalizing the importation, exportation, and trading of rice, creating the Rice Competitiveness Enhancement Fund, and appropriating funds therefor.',
    sourceAgency: 'Congress of the Philippines',
    documentType: 'Legislation',
    publishedDate: '2019-03-05',
    fileUrl: '#',
    sectionTag: 'Agriculture',
    relatedArticles: articles.filter(a => a.tags.includes('rice')),
    relatedTopics: topicPages.filter(t => t.slug === 'rice-imports'),
  },
  {
    id: '2',
    title: 'Arbitral Tribunal Ruling on South China Sea',
    slug: 'south-china-sea-arbitration-ruling',
    summary: 'The Permanent Court of Arbitration ruling on the Philippines\' case against China regarding maritime entitlements in the South China Sea under UNCLOS.',
    sourceAgency: 'Permanent Court of Arbitration',
    documentType: 'International',
    publishedDate: '2016-07-12',
    fileUrl: '#',
    sectionTag: 'GlobalAffairs',
    relatedArticles: articles.filter(a => a.tags.includes('South China Sea')),
    relatedTopics: topicPages.filter(t => t.slug === 'south-china-sea'),
  },
  {
    id: '3',
    title: 'Republic Act 10349 - Revised AFP Modernization Act',
    slug: 'ra-10349-afp-modernization',
    summary: 'An Act amending Republic Act No. 7898, establishing the Revised AFP Modernization Program and extending its implementation.',
    sourceAgency: 'Congress of the Philippines',
    documentType: 'Legislation',
    publishedDate: '2012-12-11',
    fileUrl: '#',
    sectionTag: 'National',
    relatedArticles: articles.filter(a => a.tags.includes('AFP')),
    relatedTopics: topicPages.filter(t => t.slug === 'afp-modernization'),
  },
  {
    id: '4',
    title: '2024 General Appropriations Act',
    slug: 'gaa-2024',
    summary: 'The national budget for fiscal year 2024, including appropriations for infrastructure, agriculture, defense, and social services.',
    sourceAgency: 'Department of Budget and Management',
    documentType: 'Budget',
    publishedDate: '2023-12-20',
    fileUrl: '#',
    sectionTag: 'Economy',
    relatedArticles: [],
    relatedTopics: [],
  },
  {
    id: '5',
    title: 'Philippine Development Plan 2023-2028',
    slug: 'pdp-2023-2028',
    summary: 'The country\'s medium-term development plan outlining strategies for economic recovery, infrastructure development, and social transformation.',
    sourceAgency: 'National Economic and Development Authority',
    documentType: 'Policy',
    publishedDate: '2023-01-15',
    fileUrl: '#',
    sectionTag: 'Economy',
    relatedArticles: [],
    relatedTopics: [],
  },
];

export const dashboardSectors: DashboardSector[] = [
  {
    name: 'Agriculture',
    activeProjects: 45,
    totalBudget: '₱127B',
    statusBreakdown: { ongoing: 32, delayed: 8, completed: 5 },
    keyMetrics: [
      { label: 'Irrigation Coverage', value: '1.9M ha' },
      { label: 'Rice Stock Days', value: '32 days' },
      { label: 'Import Volume', value: '2.1M MT' },
    ],
  },
  {
    name: 'Infrastructure',
    activeProjects: 128,
    totalBudget: '₱1.2T',
    statusBreakdown: { ongoing: 89, delayed: 31, completed: 8 },
    keyMetrics: [
      { label: 'Roads Built', value: '12,450 km' },
      { label: 'Bridges', value: '2,847 units' },
      { label: 'Railway', value: '147 km' },
    ],
  },
  {
    name: 'Defense',
    activeProjects: 23,
    totalBudget: '₱315B',
    statusBreakdown: { ongoing: 18, delayed: 3, completed: 2 },
    keyMetrics: [
      { label: 'Modernization Phase', value: 'Phase 3' },
      { label: 'Naval Vessels', value: '12 units' },
      { label: 'Aircraft', value: '24 units' },
    ],
  },
  {
    name: 'Energy',
    activeProjects: 34,
    totalBudget: '₱89B',
    statusBreakdown: { ongoing: 28, delayed: 4, completed: 2 },
    keyMetrics: [
      { label: 'Renewable %', value: '29%' },
      { label: 'Grid Status', value: 'Stable' },
      { label: 'New Capacity', value: '1,240 MW' },
    ],
  },
  {
    name: 'Food Security',
    activeProjects: 18,
    totalBudget: '₱45B',
    statusBreakdown: { ongoing: 15, delayed: 2, completed: 1 },
    keyMetrics: [
      { label: 'Buffer Stock', value: '9.2M bags' },
      { label: 'Production Gap', value: '8%' },
      { label: 'NFA Status', value: 'Active' },
    ],
  },
  {
    name: 'Technology',
    activeProjects: 12,
    totalBudget: '₱37B',
    statusBreakdown: { ongoing: 8, delayed: 4, completed: 0 },
    keyMetrics: [
      { label: 'Broadband Coverage', value: '67%' },
      { label: 'Gov\'t Digital', value: '78%' },
      { label: 'Free WiFi', value: '12,450 sites' },
    ],
  },
];

export const sections = [
  { label: 'National', path: '/national', description: 'Politics, governance, defense, infrastructure, law' },
  { label: 'Economy', path: '/economy', description: 'Trade, inflation, fiscal policy, business, labor' },
  { label: 'Agriculture', path: '/agriculture', description: 'Crops, irrigation, farm tech, supply chains, climate' },
  { label: 'Environment', path: '/environment', description: 'Climate risks, land use, natural disasters, conservation' },
  { label: 'Global Affairs', path: '/global-affairs', description: 'Geopolitics, ASEAN, South China Sea, diplomacy' },
];

export const platformLinks = [
  { label: 'Policy Tracker', path: '/policy-tracker', icon: 'ClipboardList' },
  { label: 'Timelines', path: '/timelines', icon: 'Clock' },
  { label: 'Topics', path: '/topics', icon: 'FolderOpen' },
  { label: 'Documents', path: '/documents', icon: 'FileText' },
  { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
];
