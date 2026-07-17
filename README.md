# Maritime-Sanctions-Dark-Activity-Analysis-Tool 

<img width="1109" height="731" alt="image" src="https://github.com/user-attachments/assets/4e91dc7f-a24a-476b-9568-c70f9b0f7a6e" />

I built this project to simulate how compliance teams at banks, maritime insurers, and commodity trading houses screen vessels for sanctions exposure, "dark activity" (AIS transponder gaps), and complex beneficial ownership risk. It assesses risks based of a point system.

This is a front-end prototype designed to show how raw maritime tracking and corporate registry data can be converted into a centralized risk score and an automated Compliance Risk Assessment Memo.

▪️ Key Features

Dark Activity Tracker: Flags vessels disabling their AIS (Automatic Identification System) signals for over 12 hours in high-risk zones (e.g., the Red Sea or Persian Gulf).

KYC Ownership Verification: Categorizes vessel ownership structures based on transparency, highlighting red flags like nominee directors or bearer shares.

Jurisdiction & Media Screening: Identifies historic port calls to sanctioned countries (Iran, Syria, Yemen) and aggregates adverse OSINT media findings.

Interactive Deep-Dive Panel: Displays comprehensive vessel profiles, historical routes, and structural ownership trees.

Compliance Memo Generator: Includes a working function that parses a vessel's specific risk flags to generate a formatted, plain-text compliance assessment ready to copy into a case-management system.

⚙️ Technical Architecture & Risk Scoring

The prototype implements a weighted, client-side scoring engine to evaluate maritime risk across several key pillars:

AIS Tracking & Gaps (Max 35 pts): Scales based on signal-gap duration in designated high-risk zones.

Ownership Transparency (Max 25 pts): Penalizes opaque or unverified offshore corporate structures.

Adverse Media & Port Calls (Max 50 pts combined): Assesses regulatory exposure based on historical port data and OSINT tracking.The app automatically maps these scores to five risk bands, ranging from Low (Green) to Critical (Red), driving the dynamic recommendations in the generated compliance memos.

⚠️ Limitations (By Design)

Because this is a front-end simulation created to demonstrate compliance workflow design, there are a few limitations:

Illustrative Mock Data: All vessel data, IMO numbers, corporate ownerships, and news reports are entirely fictional and hard-coded into the initial dataset.

No Active Integrations: The prototype does not query live AIS tracking feeds, corporate registries (like OpenCorporates), or active global sanctions screening lists (like OFAC).

Local State Management: Analyst decisions, notes, and generated compliance memos are kept in local React state and will reset upon refreshing the browser.

📈 Future Roadmap

If I were to scale this prototype into a production-grade compliance application, the next development steps would be:

Live AIS Feed Integration: Connect the frontend to a real-time tracking API (such as MarineTraffic or Spire) to automate the calculation of live AIS gaps.

Sanctions List API Lookup: Integrate real-time screenings against official, live databases (including OFAC SDN and EU consolidated lists).

Registry Automation: Connect corporate ownership fields directly to national corporate registries to automate beneficial owner verification.

PDF Export: Upgrade the raw-text compliance memo feature to allow analysts to download fully formatted PDF case reports.
