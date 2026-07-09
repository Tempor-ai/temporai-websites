# Inference Routing Research: 0G vs OpenRouter vs the OSS-Inference Field
*Prepared for Temporai Solutions AI-cost-minimization service line — 2026-07-09*

## 1. OpenRouter profile

**What it is.** A unified, OpenAI-compatible API routing to **300–400+ models** across OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Qwen, Moonshot, NVIDIA and dozens of OSS inference hosts ([costbench](https://costbench.com/software/llm-api-providers/openrouter/), [deployhq guide](https://www.deployhq.com/blog/openrouter-practical-guide-teams)). One key, one bill, automatic cross-provider failover.

**Pricing model.** Pass-through: per-token rates match each provider's published prices, no markup. Revenue comes from a **5.5% fee on credit purchases** (min $0.80; flat 5% for crypto payments) and a **5% BYOK fee** after 1M free requests/month ([openrouter.ai/pricing](https://openrouter.ai/pricing), [Amnic breakdown](https://amnic.com/blogs/openrouter-pricing)). Net effective overhead for normal usage: ~5–6%.

**Privacy/enterprise.** Prompt logging **off by default** (metadata only); one-click **Zero-Data-Retention enforcement** — route only to ZDR endpoints, globally or per-request; model/provider allow/deny lists; GDPR + EU region locking ([ZDR docs](https://openrouter.ai/docs/guides/features/zdr), [enterprise](https://openrouter.ai/enterprise)). **No published SLA** — reliability is best-effort pooled across providers (failover masks single-host incidents) unless enterprise terms are negotiated ([vensas](https://vensas.de/en/blog/openrouter-llm-gateway-eu)).

**Flagship OSS model prices (July 2026, $/M tokens in/out):**

| Model | OpenRouter price | Note |
|---|---|---|
| GLM-5.2 (Zhipu) | ~$1.40 / $4.40 (range $0.95–3.00 / $3.00–10.25 across 25 providers) | top open-weights coder |
| DeepSeek V4 Pro | $0.435 / $0.87 | official-API rate after June 17 cut; DeepInfra $1.30/$2.60 |
| DeepSeek V4 Flash | $0.14 / $0.28 (DeepInfra $0.10/$0.20) | cheap-tier workhorse |
| Qwen3.6 Plus | $0.325 / $1.95 | 35% promo pricing |
| Kimi K2.6 (Moonshot) | $0.65 / $3.41 | 262K context, agentic/coding |
| GLM-5.1 | DeepInfra $1.05/$3.50; Fireworks $1.40/$4.40 | the model in our DR HIRO benchmark |

Sources: [OpenRouter model pages](https://openrouter.ai/moonshotai/kimi-k2.6), [pricepertoken](https://pricepertoken.com/), [DeepInfra pricing guides](https://deepinfra.com/blog/deepseek-v4-pro-pricing-guide-2026-providers-cost-analysis), [morphllm](https://www.morphllm.com/llm-api).

## 2. 0G Compute profile

Decentralized GPU/inference marketplace on the 0G chain. **Six models live on mainnet**: GLM-5 (744B MoE, MIT-licensed), DeepSeek Chat v3.1, gpt-oss-120b, Qwen3-VL 30B, Whisper Large v3, z-image ([0G blog](https://0g.ai/blog/glm-5-live-on-0g-compute), [compute.0g.ai](https://compute.0g.ai/)).

**Verification (the differentiator).** Models run inside **TEEs (TeeML)**: prompt enters the enclave, provider never sees raw input, every response is **signed by the TEE's private key** — per-response cryptographic attestation that the computation ran on the model you requested. OPML/ZKML also supported; "Sealed Inference" (Mar 2026) extends this to fully private verified inference ([0G docs](https://docs.0g.ai/concepts/compute), [IT Business Net](https://itbusinessnet.com/2026/03/0g-introduces-sealed-inference-cryptographically-private-ai-where-every-response-is-verified-inside-a-hardware-enclave/)). Providers retain no user data.

**Payments.** Prepaid OG-token ledger with **smart-contract escrow** (funds release on service delivery) and ZK-proof settlement; pricing is market-driven in OG, so USD cost floats with the token ([0G docs](https://docs.0g.ai/concepts/compute)).

**Cost.** GLM-5-FP8: priced in OG tokens; **live 2026-07-09: 3.83/12.27 OG ≈ $0.76/$2.43 per M** at OG $0.198 (≤32k tier: $0.51/$2.29) — at or near the unverified floor (Z.ai-via-OpenRouter $0.60/$1.92) and the **cheapest attested option** (NEAR GLM-5.1 $0.85/$3.30, Phala GLM-5.2 $1.40 in). ⚠️ The blog-era "$0.60/$1.92" was an OG=$0.60 snapshot; USD price drifts with OG FX. See `pricing-parity-audit-2026-07.md` — adversarially audited.

**Maturity signals.** Mainnet live, OpenAI-compatible SDK, but: 6-model catalog, token-denominated billing (FX volatility, pendingRefund settlement quirks we've hit ourselves), no SLA/enterprise support org, market-driven price changes. Web3-native positioning: "verifiable AI" for agents, DePIN, on-chain settlement.

## 3. Frontier vs OSS cost gap (mid-2026)

**Frontier list prices ($/M in/out):** Claude Opus 4.6 **$5/$25**; Claude Sonnet 4.6 **$3/$15**; GPT-5.2 $0.875/$7; **GPT-5.5 $5/$30** ([Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI pricing](https://developers.openai.com/api/docs/pricing), [devtk](https://devtk.ai/en/models/gpt-5-5/)).

**Pricing-shock context.** Frontier prices are *rising*: GPT-5 launched Aug 2025 at $0.63/M input → GPT-5.4 $2.50 → GPT-5.5 $5.00 — **8x input-price increase in 8 months**; users report ~40% total-bill jumps even with better token efficiency ([The Register](https://www.theregister.com/ai-and-ml/2026/05/08/gpt-55-may-burn-fewer-tokens-but-it-always-burns-more-cash/5237498), [Aakash Gupta](https://x.com/aakashgupta/status/2047395591362396482)). Meanwhile a KPMG survey of 2,145 senior execs found **29% can't trace where their AI costs come from** as vendors shift from flat-rate to usage-based billing ([Futurism](https://futurism.com/future-society/executives-corporations-ai-bills-metered-billing), [The Register, Jul 3 2026](https://www.theregister.com/ai-and-ml/2026/07/03/ai-bills-are-baffling-the-c-suite-after-shift-to-usage-based-pricing/5266383)). Big Four have sunk **$10B+ into AI** (PwC is OpenAI's largest enterprise customer) with the pyramid economics barely budging ([maxvotek](https://maxvotek.com/p/consulting-firms-spent-10-billion)).

**Concrete savings (1M in + 1M out):**

| Swap | Frontier cost | OSS cost | Savings |
|---|---|---|---|
| Claude Opus 4.6 → GLM-5 on 0G | $30.00 | $2.52 ($0.60+$1.92) | **91.6%** |
| GPT-5.5 → DeepSeek V4 Pro (official/OpenRouter) | $35.00 | $1.31 | **96.3%** |
| Claude Sonnet 4.6 → DeepSeek V4 Flash (10M in + 2M out, extraction) | $60.00 | $1.96 | **96.7%** |

Consistent with our own DR HIRO result: GLM-5.1-FP8 on 0G at $0.39 vs Sonnet 4.6 at $19.52 per 1,000 calls = **98%**, at 100% schema-pass parity.

## 4. Quality parity by workload

- **Agentic tool use / structured output:** GLM-5 **leads all models (open and closed) on tau2-Bench** (API calls, action chaining) and posts the industry-best hallucination score on AA-Omniscience ([0G blog](https://0g.ai/blog/glm-5-live-on-0g-compute)) — exactly the harness-component profile (routing, extraction, tool-calling, RAG answering) where our benchmark saw parity.
- **Coding:** GLM-5.2 hits **80.6% SWE-bench Verified — highest open-weights, tying Gemini 3.1 Pro**; DeepSeek V4 Pro is **#1 globally on LiveCodeBench (93.5%)** with a 3206 Codeforces rating ([codersera](https://codersera.com/blog/glm-5-2-vs-deepseek-v4-coding-2026/), [codingfleet](https://codingfleet.com/blog/glm-5-2-vs-deepseek-v4-pro/)).
- **Where OSS still lags:** long-horizon agentic engineering — Claude Opus 4.8 leads SWE-bench Pro at 69.2% vs GLM-5.2's 62.1% ([morphllm](https://www.morphllm.com/swe-bench-pro)); general-intelligence indices still rank frontier first (AA Index: Fable 5 / Opus 4.8 / GPT-5.5, then GLM-5.2 at ~51; GLM-5 49.6 vs Opus 4.6 53.0). Subtle multi-step reasoning and multi-hour autonomous tasks (FrontierSWE/DeepSWE-class) remain frontier territory.
- **Net:** for bounded harness components — summarization, extraction, classification/routing, RAG answering, schema-constrained tool calls — 2026 OSS flagships are at practical parity. For open-ended agentic coding and hardest reasoning, frontier retains a real (single-digit-to-~7-point) edge.

## 5. Routing decision framework

| Client requirement | Route to |
|---|---|
| Broadest model choice, quick migration, per-model A/B, failover | **OpenRouter** |
| Lowest raw $/token on a known model, high throughput | **Direct host (DeepInfra/Fireworks/Together)**; Groq for latency-critical |
| Verifiable/auditable inference (per-response attestation), provider-blind privacy, web3/agent-native payments | **0G Compute** (TeeML) |
| Regulatory "no vendor sees data" without crypto rails | OpenRouter ZDR-only routing, or 0G/Phala TEE |
| Long-horizon agentic coding, hardest reasoning, brand-critical output | **Keep frontier** (Opus/GPT-5.5) |
| Cheap high-volume extraction/summarization | DeepSeek V4 Flash / Qwen3.6 via OpenRouter or DeepInfra |

**Honest caveats for client-facing claims:**
- **0G catalog is 6 models vs OpenRouter's 300–400+**; if the client needs a model 0G doesn't host, the attestation story is moot.
- **0G pricing floats with the OG token** (market-driven, escrow/refund settlement quirks); budget certainty requires hedging or treating it as variable spend.
- **"98% savings" is workload-specific** — it held for schema-constrained harness calls; long-horizon agentic work may still need frontier, so blended savings are lower.
- **OpenRouter has no public SLA** and its ~5.5% platform fee is real; ZDR depends on downstream providers honoring policy (contractual, not cryptographic — unlike 0G's TEE).
- Frontier vendors are **raising** prices (GPT-5.5 2x jump) while OSS vendors cut them (DeepSeek V4 Pro's June cut) — the gap is widening, but promo prices (Qwen 35% off) can snap back.

---

## Addendum (2026-07-09): Baseten and the three trust models

**Baseten profile.** Performance-focused centralized inference platform:
dedicated GPU deployments billed per active minute (e.g., H100 80GB
~$0.108/min, scale-to-zero idle), SOC 2 Type II + HIPAA + GDPR, no default
storage of model inputs/outputs, per-customer GPU/namespace isolation, and
BYOC/self-hosted options at enterprise tier. Strong for high-volume fixed
models where throughput and SLAs matter. **No TEE / confidential-computing
attestation product** — security is contractual and operational, not
cryptographic. Sources: [Baseten security docs](https://docs.baseten.co/observability/security),
[pricing](https://www.baseten.co/pricing/), [costbench 2026](https://costbench.com/software/ai-model-hosting/baseten/),
[self-hosted](https://www.baseten.co/deployments/baseten-self-hosted/).

**The three trust models for client inference** (the security play's frame):

| Tier | Trust model | Providers | What the client gets |
|---|---|---|---|
| Compliance-trust | "Trust us" — certifications + contracts | Baseten, Together, Fireworks, DeepInfra, OpenRouter (ZDR) | SOC 2/HIPAA paperwork, no-logging promises. Cheap, fast, broad. Provider *could* see data; you trust that it doesn't. |
| Confidential cloud | "Trust the hardware, run it yourself" | Azure/GCP confidential GPU VMs (H100 CC) | TEE isolation, but DIY: you build, attest, and operate it. |
| Attested inference | "Trust no one, verify everything" | **0G (TeeML)**, specialist TEE-inference startups | Per-response hardware attestation; prompts/outputs invisible even to the compute operator; verifiable artifact per call. 0G prices at-or-near the unverified floor and is the cheapest *attested* option (0–26% premium vs floor, OG-FX dependent — see `pricing-parity-audit-2026-07.md`). |

**Market pull:** enterprise TEE requirements for sensitive AI data are
projected to jump from <15% (2024) to >60% (2026) of deployments
([2026 TEE guide](https://devsecopsschool.com/blog/trusted-execution-environment/)) —
i.e., the attested tier is becoming a procurement checkbox, not a crypto
curiosity. This is where the shop's crypto/TEE background converts directly
into a differentiated service: most cost-optimization vendors can only offer
tier 1; we can deliver tier 3 at tier-1 prices.
