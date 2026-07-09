# Tempora Labs — Capability Inventory with Proof Points

Evidence gathered from the Tempora Labs project repositories, 2026-07.

## 1. Project Capsules

### DR HIRO — DeFi Portfolio Copilot (backend + frontend repos)
- AI copilot that turns plain-language investing intent into planned, confirmed, on-chain execution. FastAPI backend (Python 3.13, async) on the NodeAI runtime + Next.js 16 dashboard.
- **Confirmed 6-agent topology**: DrHiroAgent (orchestrator) → PortfolioManagerAgent, OnchainAgent, OracleAgent, AnalystAgent, RiskAgent (`docs/agents.md`, `docs/architecture.md`). Only the orchestrator faces the user; each sub-agent has a documented tool contract and "call once per request" rules.
- **ExecutionPlan aggregate** (`docs/execution-plan.md`): typed state machine (PlanStatus + StepStatus with frozen terminal/success sets), step types spanning ERC-20 approvals, CowSwap EIP-712 orders, ERC-4626 vault deposits/redeems. Plan is built server-side, then a frontend pipeline runner walks it step-by-step with the *user's wallet signing each step* — the agent never holds unilateral spend authority.
- Guardrails engineering is explicit: 6 agent contract rules (`src/agents/CLAUDE.md`), strict Pydantic `extra="forbid"` models that catch malformed LLM output at the tool boundary (`PortfolioPlan` envelope), per-mind locks against concurrent plan mutation, idempotency guards on settlement routes, domain event bus for step completion, and an `incident-scars.md` money-flow scar registry.
- Real DeFi depth: 15+ connectors, 8 gateways, chain-aware intent routing (CowSwap primary + Khalani fallback, per-chain), dynamic vault discovery via Morpho/YDaemon, CowSwap settlement polling supervisor, full tx debug logging/observability.
- **Production ops on AWS**: a named ECS service on a production cluster, ECR image lifecycle, documented rollback runbooks with CloudWatch log-sweep evidence, secrets via AWS Secrets Manager; CI/CD with post-merge deploy monitoring skills.
- Client auth: two-layer — email OTP (iron-session + Plunk, fail-closed whitelist in prod) plus Dynamic Labs wallet auth with SIWE for on-chain ops.
- Engineering-culture evidence: characterization tests pinning behavior before refactors, hand-mirrored Python↔TypeScript contract packages (`@drhiro/contracts` box keys), ~25-doc backend docs hub.

### NodeAI — Agent Framework 
- In-house framework for agentic systems: Mind/Node/Brain/Tools/Storage primitives, `@tool`/`@box` decorators, Mind multiton with think-cycle lifecycle, 12-type thought hierarchy.
- **Protocol-native**: A2A (JSON-RPC agent-to-agent, agent cards), MCP (tools/resources, dual-wire), SSE streaming with replay/reconnection, and an HMAC **confirmation gate for destructive tools** (`docs/protocols/`).
- Pluggable providers: brain plugins for OpenAI, Anthropic, Gemini, Grok; orchestration adapters for AG2, LangGraph, CrewAI; storage backends LocalMemory, S3, GCS, **ZeroG (0G)**.
- Ships a product surface too: `nodeai_ui` (FastAPI + Next.js), npm SDK packages (`@nodeai/core`, `@nodeai/ui`), a CLI (`nodeai run/backend/frontend/logs`) that orchestrates multi-repo dev.
- ~46-page SSOT documentation system with automated doc verification (`scripts/check-docs.py`, PostToolUse hooks) — docs treated as an engineered artifact.
- Proof it's real: DR HIRO's entire 6-agent production system runs on it (pinned v6.0.3).

### 0Gora — Verifiable RAG Platform 
- Original knowledge engine where **every answer is generated on 0G decentralized compute inside a hardware TEE and cryptographically verified on-chain** (`@0glabs/0g-serving-broker` `processResponse`) — a "Verified on 0G" trust seal per answer. Live at **https://0gora.tempor.ai** (public, no login).
- Full RAG pipeline built from scratch: crawl→chunk→embed ingestion (URL/site/sitemap/paste), bge embeddings, hybrid retrieval (vector + BM25 fused with RRF), inline clickable citations, general-knowledge fallback, grounding-refusal QA suites.
- **Dual-surface for humans and agents**: web chat + MCP server (`ask_0gora`, `search_0g_knowledge`, `list_models`, `list_agoras`) over both local stdio and hosted Streamable HTTP at `/mcp`.
- **Multi-tenant "multi-agora" hosting** (v0.2.3): one deployment, one wallet, several isolated knowledge bases (per-agora Qdrant collections) — live site co-hosts a 0G agora and an ERC-8226 agora; v0.2.4 gives each its own route + theme.
- Productized as a framework: config-driven instances (`0gora.config.json`), npm packages `0gora-mcp` + `create-0gora`, an agent skill to "join or found an agora", Apache-2.0 licensed.
- Velocity proof: **v0.1.0 scaffold → v0.1.1 live deploy in ~1 day; 9 tagged releases v0.1.0→v0.2.3 in 3 days** (2026-06-20→23), plus v0.2.4 deployed live 2026-07-08. Changelog shows hard fixes: broker-call parallelization for throughput, thread-safe embedding warmup, nginx timeout root-causing, 4 TEE-verified model lineup, Auto model routing (heuristic + LLM classifier), self-hosted whisper voice input.

### Tempora Assistant 
- Q&A assistant for temporalabs.com: a **private 0Gora instance as a thin overlay repo** — framework pinned as a git submodule, everything client-specific in one `examples/temporalabs/` config folder (branding, corpus, prompts, compose override, private Google-Drive corpus sync).
- Demonstrates the repeatable "productized RAG deployment" motion: second instance stood up beside the first with no code fork; upstream improvements flow via submodule bump.
- Website-side floating chat widget implemented in the Vercel site repo.

### tempor.ai website 
- Live marketing site whose copy already stakes the claims this thesis extends: "Become AI-Native", "You set the goal, I build the agents… clear plan and clear record", "Production systems, not slideware", plan→confirm→build delivery, human sign-off, full record of decisions, three case-study cards (DR HIRO / 0Gora / NodeAI), audiences = web3 teams, traditional companies, DC/policy-adjacent orgs.
- Meta proof point: the site itself (custom canvas agent-swarm animation, v0.1.2) was built and deployed almost entirely agentically — Claude-driven build, EC2/Docker/nginx SSM deploy recipe — i.e., the shop runs AI-natively on itself.

## 2. Cross-Cutting Capability Themes

1. **Multi-agent orchestration** — DR HIRO (6 specialized agents with contracts), NodeAI (the framework enabling it), 0Gora Auto-routing (model-level orchestration).
2. **Human-in-the-loop guardrails & auditability** — DR HIRO (plan→confirm→execute, user signs every step, state machines, idempotency, incident scars, audit trail); NodeAI (HMAC confirmation gate); website promises the same operating model for client engagements.
3. **Verifiable / trustworthy AI** — 0Gora (per-answer TEE attestation + on-chain verification), Tempora Assistant (verified answers on a company site), 0G storage/compute plugins in NodeAI, DR HIRO 0G-integration plan.
4. **Agent-enablement via MCP/A2A** — 0Gora MCP server (local + hosted), NodeAI A2A + MCP protocols, `0gora-mcp` npm package: products built so *other agents* are first-class users.
5. **RAG / knowledge systems** — 0Gora (hybrid retrieval, citations, ingestion pipeline, multi-tenant corpora), Tempora Assistant (private-corpus instance incl. private-doc sync).
6. **Full-lifecycle shipping (idea → prod → ops)** — every project: AWS ECS + CI/CD + rollback runbooks (DR HIRO), EC2/Docker/nginx/TLS with release tags (0Gora, websites), monitoring/deploy skills, documented ops gotchas.
7. **Platformization & reuse** — 0Gora framework/example split + overlay instances, NodeAI SDK packages, npm scaffolders: one-off builds become repeatable products.
8. **AI-native delivery process** — the website, deploy recipes, and review/release Claude skills show the shop itself operates the way it sells.

## 3. Quantifiable Proof Points

- 6-agent production DeFi system executing real on-chain transactions on Base (CowSwap + ERC-4626), 100% user-signed.
- 10 shipped 0Gora releases (v0.1.0→v0.2.4); scaffold to live TLS deploy in ~1 day; 9 tagged releases in 3 days.
- 2 live production deployments today: 0gora.tempor.ai (multi-tenant, 2 co-hosted agoras) + tempor.ai; DR HIRO on AWS ECS (invite-gated).
- 4 TEE-verified models served; every answer on-chain verified.
- NodeAI: 4 LLM providers, 3 orchestration adapters (AG2/LangGraph/CrewAI), 4 storage backends, A2A + MCP + SSE protocols, ~46-page verified docs.
- 15+ DeFi connectors, 8 gateways, 11 API routers in DR HIRO; dual-transport MCP server; 2 npm distribution packages.

## 4. Client-Value Translation

- **Multi-agent orchestration** → We can break your complex workflow into specialized AI workers that coordinate reliably, instead of one fragile chatbot.
- **Guardrails & auditability** → AI acts only inside limits you set, nothing irreversible happens without your sign-off, and every decision is on the record.
- **Verifiable AI** → You can prove — not just claim — that an AI answer came from the model and data you said it did.
- **MCP/A2A enablement** → Your product becomes usable by your customers' AI assistants, a distribution channel most companies haven't opened yet.
- **RAG/knowledge systems** → Your scattered docs become an assistant that answers with sources, for staff, customers, or their agents.
- **Full-lifecycle shipping** → You get software running in production with monitoring and rollback plans, not a prototype and a slide deck.
- **Platformization** → The first build is engineered so the second and third deployments are configuration, not another project.
- **AI-native delivery** → We use these methods on our own company daily, so you're buying practiced experience, not theory.
