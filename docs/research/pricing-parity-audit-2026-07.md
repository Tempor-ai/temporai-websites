# Adversarial audit — 0G pricing & OSS quality-parity claims (2026-07-09)

*Method: three independent adversarial agents, each mandated to REFUTE one
leg of the claim "0G serves GLM-5 at $0.60/$1.92, undercutting mainstream
hosts with free TEE verification, and GLM-5-class models match Claude
Sonnet 4.6." One agent queried the live 0G mainnet marketplace directly
via `0g-compute-cli`. This document is the canonical correction; earlier
research docs are annotated to point here.*

## Verdict summary

| Claim leg | Verdict | What survives |
|---|---|---|
| "0G charges $0.60/$1.92 per M for GLM-5" | **REFUTED (stale)** | Live 2026-07-09: 3.83/12.27 OG per M ≈ **$0.76/$2.43** at OG $0.198 (2nd provider ≤32k tier: $0.51/$2.29). The old figure was a snapshot at OG=$0.60. |
| "0G undercuts mainstream OSS hosts" | **REFUTED** | 0G runs ~20–26% *above* the unverified floor today (Z.ai-via-OpenRouter GLM-5: $0.60/$1.92). It undercuts Z.ai *list* price ($1.00/$3.20) and every *verified* rival. |
| "0G is the cheapest verified serving of GLM-5-class models" | **CONFIRMED** | Even at today's drifted price, 0G beats NEAR (GLM-5.1 $0.85/$3.30), Chutes ($0.95/$2.55, TEE claim unaudited), Phala (GLM-5.2 $1.40 in). |
| "TEE adds no premium" | **AMENDED** | Unfalsifiable within 0G (GLM listings are TeeML-only). Vs the unverified floor there is a **0–26% premium** depending on provider tier and OG FX — small, not zero. |
| "GLM-5-class matches Sonnet 4.6" | **AMENDED** | True for the *latest* flagships (GLM-5.2, DeepSeek-V4-Pro, Kimi K2.6+) on bounded components; false as a blanket family claim, false for long-horizon/tail work, and "drop-in" is false — the provider-model *pair* is the unit of quality. |
| "90–98% savings" | **AMENDED** | ~**90% realized** on parity-class components (Lindy production number, post migration-engineering); **98% is our own single-component benchmark**. Frontier retained for the long-horizon 10–30%. |

## Corrected price table — GLM-5-class, 2026-07-09

| Model | Provider | $ in / out per M | Verified? |
|---|---|---|---|
| DeepSeek-V4-Pro | DeepSeek first-party | **0.435 / 0.87** (promo; ref 1.74/3.48) | No |
| GLM-5 (FP4) | DeepInfra | 0.60 / 2.08 (blended ~$0.41) | No |
| GLM-5 | Z.ai via OpenRouter | **0.60 / 1.92** ← unverified floor, full precision | No |
| GLM-5-FP8 | **0G** (≤32k tier) | **0.51 / 2.29** (at OG $0.198) | **TEE ✓** |
| GLM-5-FP8 | **0G** (main provider) | **0.76 / 2.43** (at OG $0.198) | **TEE ✓** |
| GLM-5.1 | NEAR AI Cloud | 0.85 / 3.30 | TEE ✓ |
| GLM-5 | Chutes | 0.95 / 2.55 | TEE claimed, unaudited |
| GLM-5 | Z.ai first-party list | 1.00 / 3.20 | No |
| GLM-5.2 | Phala Cloud | 1.40 / n.a. | TEE ✓ |
| GLM-5.1 | Together / Fireworks | 1.40 / 4.40 | No |

**Rank:** 0G is ~3rd cheapest overall for GLM-5-class and **#1 in the
attested tier** — at, or within ~26% of, the open-market floor.

## The FX mechanism (why 0G's USD price moves)

0G prices are set in OG tokens; providers reprice to chase USD but with
lag. The blog-era "1 OG in / 3.2 OG out ≈ $0.60/$1.92" became today's
"3.83/12.27 OG ≈ $0.76/$2.43" as OG fell from ~$0.60 to $0.198 (2026
range: $1.168 high → $0.188 low; −83% peak-to-trough). Repricing has so
far drifted the effective USD price *up*, not down. Client-facing quotes
must be dated and FX-caveated.

**Operational costs** (confirmed, incl. from our own ops log): 3 OG
minimum ledger deposit, 1 OG locked per provider, **24-hour refund lock**
(we have personally had ~2.68 OG in pendingRefund), gas on
deposits/settlement, FP8 quantization explicit on-chain, and only 2
providers for GLM-5 (availability concentration).

## Quality-parity boundary (see verify report for sources)

- **Parity (defensible):** schema-constrained structured output,
  classification/routing, extraction, RAG answering, summarization,
  standard coding, single-turn tool calls. Independent 1,000-scenario
  eval: GLM-5.2 91.9 vs Sonnet 4.6's 90.8; DeepSeek-V4-Pro 80.6% vs 79.6%
  SWE-bench Verified. GPQA inversion: GLM-5.2 (91.2) *beats* Sonnet (74.1).
- **Near-parity (eval per component; latest flagships only):** multi-step
  agentic coding, terminal tasks, ≤128–200K context.
- **Not parity:** hardest-decile ambiguous tasks (−4–6 pts), long-horizon
  multi-turn tool orchestration (Anthropic holds top-5 tau-bench Retail),
  >200K context, refusal/safety calibration.
- **Cautionary tales for the pitch:** Kimi K2.5 passed offline evals then
  failed a real production rollout (Lindy); Moonshot ships a "Vendor
  Verifier" because tool-call accuracy varies sharply across hosts. The
  unit of quality is the **provider-model pair** — which is exactly why
  migration is an engineering service, not a config flip.

## Claim discipline — what we now say

1. "0G is the **cheapest verified** way to serve GLM-5-class models — at
   or near the open-market floor price" (never "undercuts the market").
2. "**~90% realized savings** on parity-class components; up to **98% on
   our benchmarked component**" (never blanket "90–98% off your bill").
3. "Parity holds for the **latest open flagships on bounded components**,
   proven per provider-model pair by benchmark — we keep frontier models
   where they still earn their price" (never "drop-in replacement").
4. Always date 0G price quotes and note OG-FX drift.
