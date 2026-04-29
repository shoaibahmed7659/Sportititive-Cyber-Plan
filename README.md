# Sportetitive Cyber Resilience Portal

A production-ready static website providing Sportetitive Ltd's incident response playbook,
attack analysis, security framework references, leadership ownership, and resilience improvement plan.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Homepage — attack summary, risk status, navigation hub |
| `attack-impact.html` | Full attack chain: MITRE ATT&CK, Cyber Kill Chain, ICO obligations, business impact |
| `incident-response.html` | **72-hour playbook** — operational checklists, severity levels, board decisions |
| `frameworks.html` | MITRE ATT&CK, Kill Chain, Zero Trust, NIST SP 800-61 with official links |
| `leadership-roles.html` | RACI matrix, executive role profiles, ownership at every phase |
| `recommendations.html` | Three-phase improvement plan (stabilise/improve/transform), board metrics |
| `style.css` | Full design system: Nexus-derived palette, General Sans + Zodiak fonts, light/dark |
| `base.css` | CSS reset and base styles |
| `app.js` | Theme toggle, mobile nav, scroll reveal, checklist completion |

## Deployment

Push this folder directly to your GitHub Pages repository root (or `docs/` folder).
No build step required — fully static HTML, CSS, and JavaScript.

```
git add .
git commit -m "feat: cyber resilience portal v2 with 72h playbook"
git push origin main
```

## External links included

- NCSC: ncsc.gov.uk
- ICO breach notification portal: ico.org.uk
- Action Fraud: actionfraud.police.uk
- MITRE ATT&CK: attack.mitre.org
- NIST SP 800-61: nvlpubs.nist.gov
- DPA 2018 s.108: legislation.gov.uk
- Lockheed Martin Cyber Kill Chain
- Police CyberAlarm, ECRC, NCA
