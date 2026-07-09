# PLAN — v0.1.3: Website content (full copy deck)

*The actual draft copy for every section below the header, derived from
`docs/THESIS.md` and disciplined by `docs/research/pricing-parity-audit-2026-07.md`.
The v0.1.2 design (palette, swarm, layout, navbar) is untouched — this is
words. Kevin reviews the copy here; implementation is find-and-replace
plus one new section component.*

## Guiding rules

1. **Receipts, not claims.** Live links and verified numbers; never headline
   "production-grade, not demos" (commoditized). Audit discipline applies:
   "~90% realized / 98% benchmarked" — never blanket "90–98%"; "cheapest
   *verified*, at or near the floor" — never "undercuts the market."
2. **Goal-first voice**, first-person singular (matches the live site's
   "I build the agents").
3. **"Empower, not replace" appears once, prominently.**
4. No client/partner names. No stats that didn't survive the audit.

---

## 1 · Hero (`components/Hero.tsx`) — copy only

- Eyebrow *(keep)*: `TEMPORAI SOLUTIONS — AI DEV SHOP`
- Headline *(keep)*: `Become AI‑Native`
- **Sub-copy (new):**
  > You set the goal — raise the round, win customers, cut the bill, ship
  > faster. I build the AI that gets you there: planned with you, shipped
  > to production, and provable when it counts.
- CTAs *(keep)*: `Book a call` / `See the work`

## 2 · NEW — "Why now" strip (new component, after Hero)

Section tag: `Why now` · Title: `Four things changed`

| Card | Headline | Body |
|---|---|---|
| SPEED | **AI-native is a pace, not a feature.** | Teams that work this way ship in days what used to take quarters — and the gap compounds monthly. This site went from empty repo to production in days, built by agents under human direction. |
| PROOF | **Claims are free. Proof is scarce.** | Investors, customers, and auditors stopped believing AI claims. We build AI you can show: live systems, audit trails — down to answers that are cryptographically verified. |
| THE AGENT WEB | **Your next user is an agent.** | Every product is getting a second customer: the human who pays, and the agent that decides. Without an agent surface (MCP), you're invisible to both. |
| THE BILL | **The AI bill is the new cloud bill.** | Usage-based pricing shocked the C-suite — a third of executives can't trace their AI spend. Most bills pay frontier prices for non-frontier work. We cut ~90% on the right components, and prove quality held. |

## 3 · "What you get" (`GlowingEffectContainer.tsx`) — 6 bento cards

Tag/title *(keep)*: `What you get` · Subtitle *(new)*: `Five ways in — and one promise that covers all of them.`

1. **AI-Native Roadmap** — Tell me the goal: fundraising, customers,
   costs, speed. You get an honest map of what AI can and can't do for it,
   and a scoped plan you own whether or not we build it.
2. **Build & Ship** — Agents, knowledge systems, automations. Plan →
   confirm → build → handoff: production software with monitoring and
   rollback, not a slide deck.
3. **Agent-Ready Product** — Your product, usable by AI agents: API audit
   → typed tool surface → shipped MCP server. Your customers' assistants
   become your users.
4. **AI Cost Optimization** — Already running AI? I benchmark your stack
   component by component and route what doesn't need frontier models to
   open models at proven parity — around 90% savings on the right
   components. Gainshare terms available: my fee comes out of the savings.
5. **Fractional AI Lead** — Senior AI capability plus an agent fleet, on
   tap. Spin capacity up and down instead of hiring ahead of need.
6. **Empower, not replace** — Everything ships with human sign-off,
   guardrails, and a full audit trail. AI that arms your team — never a
   black box, never a replacement pitch.

*(Also: re-tint or remove the template's rainbow hover glow — still open.)*

## 4 · "How it works" (`HowItWorksSection.tsx`) — same 4 steps, tightened copy

Tag *(keep)*: `How it works` · Title *(keep)* · Subtitle *(keep)*

1. **Tell your goal** — Fundraise, customers, costs, or speed — plus your
   constraints. I'll also tell you what AI *can't* do for it. That honesty
   is free.
2. **Plan** — A scoped roadmap with rationale, alternatives, and a
   realistic timeline. Explainable by design.
3. **Confirm** — You approve scope, budget, and plan before anything gets
   built. Changes are called out and re-confirmed — no runaway engagements.
4. **Execute** — I build and ship with guardrails and an audit trail. You
   get a working system and a documented handoff.

## 5 · "Approach" (`ProductSpotlightSection.tsx`) — reframed to "How we're different"

Tag: `Approach` · Title: `How this shop is different` · Subtitle *(keep)*: `Plan + confirm; then I ship it.`

1. **Guardrails as features, not disclaimers** — Human sign-off gates,
   strict validation at every AI boundary, a full decision record. The
   engineering that makes AI safe to adopt is the same engineering that
   survives investor diligence.
2. **Verifiable AI** — Our production systems can prove which model
   produced which answer — hardware-attested, verified on-chain. Proof,
   not promises.
3. **Agent-native** — MCP and A2A aren't add-ons here; our own platforms
   serve humans and other agents in production today.
4. **Documented handoff** — Plan, decisions, delivery, and how to run it
   without us. You keep the keys.

Amber note *(keep verbatim)*: "Nothing ships without your review."

## 6 · "Why Temporai Solutions?" (`FeaturesSectionContainer.tsx`) — 4 pillars

Keep pillars 1–3 (Outcome-based / Explainable / Human-in-the-loop) as-is.
Replace pillar 4 ("Proven execution path") with:

- **Empower, not replace** — AI should bring out your team's better self,
  not write them out of the story. Sign-off and audit trails aren't
  disclaimers here — they're the product.

## 7 · Trust & safety (`TrustSafetySection.tsx`) — 3 columns, one swapped

- **Safety & controls** *(keep all 4 bullets)*
- **Verifiability & observability** *(replaces "Observability", absorbs it)*:
  - Full record of decisions, inputs, and outputs
  - Hardware-attested (TEE) inference available where trust matters
  - In our production stack, answers are verified on-chain — deliverables
    double as diligence artifacts
- **What's next** *(rewritten)*:
  - Agent-web readiness: MCP/A2A surfaces as standard equipment
  - Deeper verification: optimistic and ZK spot-checks layered on as they
    mature

## 8 · "Proof of Work" (`PilotCaseStudySection.tsx`) — 4 cards + stat line

Each card gains a "What it proves" line; add a 4th card.

1. **DR HIRO** *(keep description)* + *Proves: multi-agent AI can execute
   high-stakes work — every step signed by the user, on the record.*
2. **0Gora** *(keep description; add link 0gora.tempor.ai)* + *Proves:
   verifiable AI isn't theory — every answer TEE-generated and verified
   on-chain, live in production.*
3. **NodeAI** *(keep description)* + *Proves: we own our stack down to the
   framework — A2A/MCP-native, and it runs DR HIRO in production.*
4. **This website** *(new)* — Designed, built, and deployed by agents
   under human direction — including the animation above. + *Proves: we
   run on what we sell.*

Stat line (small strip under the grid):
> **98% lower cost at 100% schema quality** — our benchmarked component
> migration: an open model on verified compute vs. our frontier baseline.

## 9 · "Who it's for" (`WhoItsForSection.tsx`) — intro line + 3 sharpened cards

Section intro *(new line under subtitle)*:
> Not on AI yet? I'll take you from zero to AI-native. Already running AI?
> I'll unleash it — and usually shrink the bill.

1. **Web3 & crypto teams** — *Raising?* A credible, verifiable AI
   component strengthens the round; a decorative one weakens it. I speak
   crypto natively — DeFi execution, wallets, TEEs, on-chain verification —
   and build the version that survives diligence.
2. **Traditional companies** — Practical automation and knowledge systems
   without needing a research team — with the guardrails that make
   adoption safe, explainable, and defensible.
3. **Busy product teams** — Heads-down on the roadmap but need an agent
   surface for ecosystem and investor conversations? That's a scoped,
   productized engagement — not a rewrite.

**Decision point for Kevin:** this drops the "DC & policy-adjacent orgs"
card in favor of "Busy product teams" (3 slots, 4 audiences). The
credibility-first message survives in Trust & Safety. Say the word to keep
DC/policy instead.

## 10 · Footer (`Footer.tsx`)

- Title: `Ready to become AI-native?`
- Subtitle: `Tell me the goal — fundraise, customers, costs, or speed —
  and I'll bring the plan.`
- Buttons *(keep)*: `Book a call` / `Email me`

---

## Implementation map

| Section | File | Nature |
|---|---|---|
| 1, 4, 5, 6, 7, 8, 9, 10 | existing components | copy swap |
| 2 | new `components/WhyNowSection.tsx` | new component (reuse card style) |
| 3 | `GlowingEffectContainer.tsx` | copy swap + hover-glow decision |

## Sequence

1. Kevin reviews this copy deck → edits/approves (incl. the §9 decision).
2. Cut `v0.1.3` branch → implement → review at localhost → deploy per the
   usual recipe.
3. Knowledge graph (PLAN-v0.1.2) can ride a later release.
