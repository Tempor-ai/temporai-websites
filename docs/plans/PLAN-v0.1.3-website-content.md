# PLAN — v0.1.3: Website content from the thesis

*Maps docs/THESIS.md onto the live site, section by section. The v0.1.2 design
(palette, swarm, layout) stays; this is a copy/content evolution plus one new
section. Apply on a v0.1.3 branch when approved.*

## Guiding rules

1. **Prove, don't claim.** Never headline "production-grade, not demos" — every
   boutique says it. Instead: live links (0gora.tempor.ai), the "Verified on
   0G" seal, real version history. Let receipts talk.
2. **Goal-first voice.** Copy starts from the client's goal (fundraise /
   customers / costs / speed), not from technology.
3. **Empower, not replace** appears once, prominently — not sprinkled
   everywhere until it's wallpaper.
4. Keep the established hero headline **"Become AI‑Native"** — continuity with
   the live brand.
5. No confidential client/partner names. Anonymized patterns only.

## Section-by-section

### Hero (`components/Hero.tsx`)
- Keep: headline, swarm animation, layout.
- Revise sub-copy to goal-first + empower line. Candidate:
  > "You set the goal — fundraise, reach customers, cut costs, move faster.
  > I build the AI that gets you there: planned with you, shipped to
  > production, and provable when it counts."
- CTA pair unchanged ("Book a call" / "See the work").

### NEW — "Why now" thesis strip (new component, after Hero)
Four cards, one per thesis (short, punchy; 2×2 on mobile):
1. **Speed** — "AI-native is a pace, not a feature. The gap compounds monthly."
2. **Proof** — "Investors, customers, and auditors stopped believing claims.
   We build AI you can prove — down to cryptographically verified answers."
3. **The agent web** — "Your next user is an agent. Products without an agent
   surface (MCP/A2A) will be invisible to them."
4. **The bill** — "Usage-based pricing shocked the C-suite. Most AI bills pay
   frontier prices for non-frontier work. We cut 90–98% on the right
   components — and prove quality held."
Design note: reuse the existing card style from "What you get"; consider the
blue→purple→silver gradient order across the three cards.

### "What you get" (`GlowingEffectContainer.tsx`)
- Keep grid; retitle cards toward the four offerings:
  Discovery conversation → **AI-Native Roadmap**; Build & handoff stays;
  add **Agent-Ready Product** card (replace "Works across your stack" —
  its content folds into Build & handoff); add **AI Cost Optimization** card
  ("Your AI bill, down 90–98% on the right components — benchmarked, not
  vibes; gainshare terms available"); add **Fractional AI Lead** card
  (replace "Built to expand" — same spirit, sharper offer).
- Fix the off-brand rainbow hover glow (GlowingEffect default palette) →
  re-tint to brand blue→purple, or remove. (Kevin flagged; pending decision.)

### "How it works" (`HowItWorksSection.tsx`)
- Keep the 4-step flow verbatim in structure (Tell goal / Plan / Confirm /
  Execute) — it's already the thesis's MO.
- Step 1 description gains the goal menu: "…fundraise, customers, costs,
  speed — and what AI can and *cannot* do for it."

### "Approach" / Product spotlight (`ProductSpotlightSection.tsx`)
- Reframe from generic "Key features" to **"How we're different"** with the
  four receipts-backed differentiators: guardrails-as-features, verifiable
  AI, agent-enablement, documented handoff.
- The amber "Nothing ships without your review" note stays — it's the ethos
  in one sentence.

### "Why Temporai Solutions?" (`FeaturesSectionContainer.tsx`)
- Swap the fourth pillar ("Proven execution path") for **"Empower, not
  replace"** — the ethos gets its one prominent slot here, with the human
  sign-off/audit-trail mechanism as its body text.

### Trust & safety (`TrustSafetySection.tsx`)
- Add a "Verifiable AI" bullet cluster: TEE-verified inference, on-chain
  answer verification, deliverables as diligence artifacts.
- "What's next" bullets updated: agent-web readiness (MCP/A2A) instead of
  generic expansion.

### Case studies (`PilotCaseStudySection.tsx`)
- Each card gains a one-line **"What it proves"** + a live link where public:
  - DR HIRO → multi-agent execution with human-signed guardrails.
  - 0Gora → verifiable AI, live at 0gora.tempor.ai (link + "Verified on 0G").
  - NodeAI → the agent framework underneath (A2A/MCP native).
- Add a 4th card: **This website** — "designed, built, and deployed by agents
  under human direction. We run on what we sell."
- DR HIRO card (or a small stat strip nearby) carries the cost receipt:
  "open model matched Claude's quality at 2% of the cost — 98% saved,
  benchmark-proven" (source: docs/research/cost-minimization-evidence.md).

### Who it's for (`WhoItsForSection.tsx`)
- Web3 card sharpened to the fundraise frame: "Raising? A credible,
  verifiable AI component strengthens the round — a decorative one weakens
  it. We build the version that survives diligence."
- Add (or fold into traditional-companies card) the busy-product-team
  pattern: "Heads-down on your roadmap but need an agent surface for
  ecosystem and investor conversations? That's a scoped, productized
  engagement — not a rewrite."
- DC/policy card stays (auditability DNA is the fit).
- Weave the two-lane funnel line into the section intro: "Not on AI yet?
  We take you from zero to AI-native. Already running AI? We unleash it —
  and usually shrink the bill."

### Footer CTA (`Footer.tsx`)
- Goal-first: "Ready to make your team more AI-native? Tell me the goal —
  fundraise, customers, costs, or speed — and I'll bring the plan."

### Knowledge graph (PLAN-v0.1.2-knowledge-graph.md)
- Unchanged, complementary: the graph section becomes the visual "receipts"
  layer once built. The thesis's proof table doubles as its seed node list.

## Out of scope for the site (stays in THESIS.md / private notes)
- Pricing specifics; monetization mechanics.
- Named partner/client examples (anonymized patterns only).
- Market statistics with citations (thesis footnote only; site stays clean).

## Sequence
1. Kevin reviews THESIS.md → edits/approves the theses and message bank.
2. Cut v0.1.3 branch → implement sections above (copy-first; one new
   component) → review on localhost → deploy per the usual recipe.
3. Knowledge-graph section (v0.1.2 plan) can ride the same or next release.
