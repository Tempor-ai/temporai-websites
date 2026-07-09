# The Temporai Thesis

*North star, ethos, and operating thesis for Temporai Solutions (tempor.ai).
This document is the source of truth the website's content is derived from.*

---

## Why we exist

Agentic AI flipped a scarcity. Intelligence is now abundant and cheap — anyone
can generate a demo in an afternoon. What became scarce is everything around
it: **speed with judgment**, **systems that survive scrutiny**, and **proof**.

Most companies are caught between two fears: missing the wave, and shipping
something they can't trust, can't explain, and can't defend — to their team,
their customers, their regulators, or their investors. The market has already
priced this in: investors pay a premium for real AI capability and openly
discount "AI-washing." Diligence has moved from *claims* to *evidence* —
usage, architecture, auditability.

Temporai exists to close that gap: **we help companies become AI-native —
fast, provably, and with their people in command.**

## Ethos: empower, not replace

AI should help people bring their better selves to work — not write them out
of the story. This isn't a slogan; it's an architecture decision. Everything
we build keeps humans holding the pen:

- Plans are proposed by agents, **confirmed by people** before execution.
- Nothing irreversible happens without explicit sign-off.
- Every decision is on the record — explainable, auditable, reviewable.

The same design that makes AI *adoptable* by a team is what makes it
*defensible* in front of an investor or auditor. Empowerment and proof are the
same engineering.

## The four theses

### 1 · Speed — AI-native is a pace, not a feature

Teams that work AI-natively ship in days what used to take quarters, at a
fraction of the cost. This compounds: the gap between AI-native and
AI-curious organizations widens every month. We know because we operate this
way ourselves — a production knowledge platform went from empty repo to live
TLS deployment in about a day, with nine tagged releases in the three days
after; this website was designed, built, and deployed almost entirely by
agents under human direction.

### 2 · Proof — real AI is a market signal, but only provable AI earns it

AI capability now moves valuations, wins customers, and attracts talent — and
everyone knows it, which is why unverifiable claims are discounted on sight.
"Production-grade, not demos" has become every studio's line; the claim
carries no signal anymore. What carries signal is **evidence**: live systems,
real usage, audit trails — and at the strongest end, answers that are
*cryptographically verifiable* (our platform 0Gora generates every answer
inside a hardware TEE and verifies it on-chain — live, in public, today).
We build AI deliverables as **diligence artifacts**: things you can show, not
just say. The same hardware does double duty for **privacy**: inference
inside a TEE means your prompts and data are invisible even to the compute
provider — security you can verify, not compliance paperwork you have to
trust. Enterprise procurement is already moving this way: TEE isolation for
sensitive AI data is projected to go from a niche requirement (<15% in 2024)
to the default (>60% by 2026).

### 3 · The agent web — your next user is an agent

Every product is getting a second customer: the human who pays, and the agent
that decides. MCP became the de-facto standard for agent-to-tool access;
A2A is doing the same for agent-to-agent. Products without an agent surface
will simply be invisible to the fastest-growing class of users. Getting
agent-ready — a typed, safe, published tool surface over what you already
have — is one of the highest-leverage moves a product team can make right
now, and one of the cheapest.

### 4 · Sovereignty — the AI bill is the new cloud bill, and the leash is real

Usage-based pricing ended the era of subsidized flat-rate AI — and frontier
prices are moving the wrong way (GPT-5-class input pricing rose ~8× in the
eight months to mid-2026). Executives are feeling it: in a 2026 KPMG survey
of 2,145 senior executives, 29% couldn't say where their growing AI costs
were coming from. Meanwhile open models
have reached quality parity for a large share of real workload components —
at 1–2 orders of magnitude lower cost. Our own benchmark: an open model
(GLM-5.1 on 0G's TEE-verified compute) matched Claude Sonnet's quality on a
production financial-reasoning component, ran faster, and cost **98% less**
($0.39 vs $19.52 per 1,000 calls). Most AI bills are paying frontier prices
for work that doesn't need frontier models. We find those components,
prove the parity, and cut the bill — verifiably.

And it's not only the bill — it's the leash. Building everything on one
frontier vendor means living at the mercy of their prices, their rate
limits, their deprecations, and their uptime. Open models on open compute
mean **you own your AI**: nobody can raise the price of what you run
yourself, deprecate the model your product depends on, or throttle you in
a capacity crunch. Sovereign AI — with TEE-verified serving so
independence doesn't mean flying blind.

## What we do

End-to-end, goal-first. We don't start from "you need AI" — we start from
**why**: is the goal to raise, to reach more customers, to cut costs, or to
move faster? Then we're honest about what AI can and cannot do for that goal.

Two kinds of clients walk in. **Not on AI yet?** We take you from zero to
AI-native. **Already running AI?** We unleash what you have — and usually
shrink the bill while doing it.

1. **AI-Native Roadmap** *(the front door)* — a short discovery engagement:
   your goal, your constraints, an honest map of what AI can/can't do for it,
   and a scoped plan with rationale and alternatives. You own the plan
   whether or not we build it.

2. **Build & Ship** *(the core)* — agents, multi-agent systems, RAG/knowledge
   assistants, automations. Plan → confirm → build → handoff, with guardrails
   and an audit trail as standard equipment. Production deployment with
   monitoring and rollback — the engagement ends with working software and a
   clean handoff, not a slide deck.

3. **Agent-Ready Product** *(productized)* — we make your existing product
   usable by AI agents: API and auth audit → typed tool surface → shipped
   MCP server (and A2A/agents where warranted). Your customers' assistants
   become your users; your investor conversations get a live artifact.

4. **AI Cost Optimization** *(productized)* — for teams already running AI
   whose bill is exploding: we benchmark your harness component by
   component, route what doesn't need frontier models to open models at
   quality parity (proven per-component, not vibes), and keep frontier only
   where it earns its price. Savings of 90–98% on migrated components —
   with TEE-verified serving available where trust matters (0G's verified
   compute currently prices *below* mainstream OSS hosts like Baseten,
   Together, and Fireworks — whose security is certifications and contracts,
   not cryptography — so going trustless doesn't cost extra). And beyond
   routing, we build complete solutions *on top of* verified decentralized
   compute — inference services, RAG platforms, agents — the way we build
   our own products on 0G. Measurable enough to support gainshare terms: our fee comes out of the savings, so
   your net bill only goes down.

5. **Fractional AI Lead** *(the back end)* — senior AI capability plus an
   agent fleet, on tap. Spin capacity up and down with your needs instead of
   hiring ahead of them.

## Who it's for

- **Web3 & crypto teams** — especially those raising. A credible, verifiable
  AI component strengthens the round; a decorative one weakens it. We speak
  crypto natively (DeFi execution, on-chain verification, wallets, TEEs) and
  we build the version that survives diligence.
- **Traditional companies going AI-driven** — practical automation and
  knowledge systems without needing a research team, with the guardrails
  that make adoption safe.
- **Busy product teams** — heads-down on the roadmap but needing an agent
  surface (MCP/agents) for their ecosystem and investor conversations,
  without derailing core engineering.
- **Teams already spending big on AI** — running frontier APIs for
  everything and watching usage-based bills climb. Candidates for
  component-level routing to open models at a fraction of the cost.
- **Credibility-first organizations** (policy-adjacent, governance-sensitive) —
  where explainability and auditability aren't nice-to-haves but the
  requirement.

## Why us — the receipts

| Claim | Proof |
|---|---|
| Multi-agent systems that coordinate reliably | DR HIRO: 6 specialized agents executing real on-chain DeFi transactions — every step signed by the user's wallet |
| Guardrails & auditability by design | Plan→confirm→execute state machines, strict validation at every LLM boundary, confirmation gates on destructive actions, full audit trail |
| Verifiable AI | 0Gora, live in production: every answer TEE-generated and verified on-chain — 4 verified models served |
| Agent-enablement (MCP/A2A) | Dual-transport MCP server in production; A2A-native agent framework (NodeAI); scaffolding packages |
| Knowledge systems that cite their sources | Hybrid-retrieval RAG with inline citations, multi-tenant hosting; a private-corpus assistant deployed as a config overlay, not a fork |
| Full-lifecycle shipping | AWS ECS with CI/CD and rollback runbooks; EC2/Docker/TLS deployments; release discipline (tagged versions, changelogs, deploy monitoring) |
| 90–98% cheaper AI at proven quality parity | DR HIRO brain benchmark: open model on 0G matched Claude Sonnet's 100% schema-pass quality, faster p95, 98% lower cost — $0.39 vs $19.52 per 1,000 calls; 0Gora runs wholly on TEE-verified open models |
| We run on what we sell | This site — and the process that built it — is agent-made under human direction |

## How we work

- **Outcome-based engagements** — you set the goal; no per-task micromanagement.
- **Plan → confirm → execute** — you approve scope, budget, and plan before anything is built; changes are re-confirmed.
- **Explainable by design** — rationale and alternatives documented for every significant decision.
- **Human sign-off before anything ships.**
- **Documented handoff** — plan, decisions, delivery, and how to run it without us.

## Business model (shape)

Sprint-shaped front door (fixed-scope roadmap), scoped build engagements,
retainer-based fractional capacity, and productized packages (Agent-Ready
Product; AI Cost Optimization; embeddable verified assistant). Priced per
engagement. Cost engagements can be structured as **gainshare** — the fee
comes out of measured savings, so the client's net bill only goes down.

## What we won't do

- **No demo-ware.** If it isn't headed for production, we'll say so in the plan.
- **No decorative AI.** If AI doesn't serve your actual goal, the roadmap will
  tell you that — it's cheaper to hear it from us than from your investors.
- **No replace-your-team pitches.** We arm teams; we don't erase them.
- **No rip-and-replace.** Cost optimization routes components inside your
  existing stack; it doesn't rewrite it.
- **No overclaiming.** We're a senior boutique with an agent fleet, not a
  24/7 enterprise army — and for most teams that's exactly the right amount
  of force.

## Message bank

- **Become AI-Native.** *(established hero)*
- Empower, not replace.
- AI you can prove. Shipped in weeks.
- Your next user is an agent. Be ready.
- Move fast. Prove it. Keep your people in command.
- We hand your team the leverage we use ourselves.
- Verifiable by design. Production by default.
- You set the goal — fundraise, customers, costs, speed. We build the AI that gets you there.
- Same quality. 2% of the cost. Cryptographically verifiable.
- Your AI bill should be falling, not exploding.
- Frontier prices for non-frontier work — that's what we remove.
- Go AI without handing your data to anyone — hardware-secured, verifiable.
- Trust no one. Verify everything. Pay less doing it.
- Own your AI — nobody can raise the price of what you run yourself.
- Off the frontier leash: no vendor's pricing, rate limits, or roadmap between you and your AI.

---

*Market context informing this thesis (2025–26): seed-stage AI startups
command ~40%+ valuation premiums while "thin wrapper" AI is explicitly
discounted; MCP is under Linux Foundation governance with 10,000+ public
servers and mainstream product adoption (Linear, Notion, Atlassian, Zapier,
et al.); only ~11% of organizations run agents in production despite ~70%
exploring or piloting — the execution gap this shop exists to close. On
costs: KPMG's 2026 survey of 2,145 senior executives found 29% can't trace
their growing AI spend as flat-rate contracts give way to usage-based
pricing — the bill shock this shop's cost-optimization offering answers.
Detailed evidence: `docs/research/cost-minimization-evidence.md`.*
