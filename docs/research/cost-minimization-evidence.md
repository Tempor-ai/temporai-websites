# Evidence — AI cost minimization

*Supporting evidence for the cost-minimization thesis and offering
(see `docs/THESIS.md`). Internal benchmark summarized from the DR HIRO
engineering evaluation (2026); market context from public reporting.*

## Internal benchmark: frontier → open model at quality parity

DR HIRO's portfolio-allocation "brain" (an LLM call that must emit strict,
schema-validated JSON that drives real on-chain execution) was benchmarked
across candidate models using a **zero-mock harness**: the live production
prompt builder, parser, Pydantic schema validation, and financial-constraint
checks — evaluated on a strict single-attempt/no-retry/no-fallback rule,
15 scenarios × 3 runs per model (180 calls total).

| Metric | Claude Sonnet 4.6 (baseline) | GLM-5.1-FP8 (via 0G) | Gemini 2.5 Flash | Gemini 2.5 Pro |
|---|---|---|---|---|
| JSON parse rate | 100% | 100% | 100% | 100% |
| Schema pass rate | 100% | **100%** | 86.7% | 100% |
| First-attempt success | 100% | 93.3% | 86.7% | 93.3% |
| Asset hallucination | 0% | **0%** | 0% | 0% |
| p95 latency | 16.1s | **13.2s** | 20.7s | 30.0s |
| Avg cost / call | $0.019517 | **$0.000399** | $0.000423 | $0.006452 |

**Headline result:** GLM-5.1-FP8 served on 0G Compute matched the frontier
baseline's schema-pass quality, ran *faster* at the tail (p95), and cost
**98% less** — $0.39 vs $19.52 per 1,000 calls. Gemini 2.5 Pro offered
quality parity at 67% savings (recommended as fallback tier; too slow for
the primary user-facing path). Gemini 2.5 Flash was cheap but failed
financial-constraint math in 13% of runs — evidence that *component-level
evaluation, not vibes,* must drive routing decisions.

Getting there required defensive engineering, which is part of the service:
thinking-token suppression, JSON syntax repair for OpenAI-compat quirks,
and field-length truncation — raising every candidate to a 100% parse rate.

**Honest scope note:** this is one component (structured allocation
reasoning) on standard scenarios. The correct client claim is "**up to 98%
on the right components, proven per-component by benchmark**" — not "your
whole bill drops 98%."

## Production existence proof

0gora.tempor.ai — a public production RAG platform — runs **entirely on
open models served via 0G's TEE-verified compute** (4 verified models,
answer-level on-chain attestation). No frontier API in the serving path.

## Market context: the pricing shock is real

- A 2026 KPMG survey of **2,145 senior executives across 20 countries**
  found **29% had no idea where their growing AI costs were coming from**,
  and roughly a third said their own grasp of AI economics was a barrier to
  deploying AI at all — as flat-rate AI contracts give way to usage-based
  pricing. (Reported by The Register; widely syndicated, e.g. Futurism /
  Yahoo Finance, "Execs Confused and Horrified by the Huge AI Bills," 2026.)
- Frontier vendors have shifted enterprise pricing toward metered usage
  while list prices for top-tier models remain 1–2 orders of magnitude above
  open-model serving costs. See `inference-routing.md` for current per-token
  comparisons and the 0G vs OpenRouter routing framework.

## What this supports

1. A named **cost-optimization offering**: benchmark the client's harness
   component-by-component, route the right components to open models
   (0G when verifiability matters, commodity routers when breadth/simplicity
   matters — see `inference-routing.md`), keep frontier only where it earns
   its price.
2. **Gainshare-compatible economics**: savings are measurable per call,
   so fees can be structured against realized savings.
3. The **"same quality, ~2% of the cost, cryptographically verifiable"**
   message — every number above is reproducible from the benchmark harness.
