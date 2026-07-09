# Verifiable & Sovereign AI Inference — Why TEE, the Landscape, and ZK vs TEE

*Research date 2026-07-09. Supports the thesis's Proof and Sovereignty pillars
and the "build on verified decentralized compute" service line.*

## 0. Why TEE in the first place — the plain-language case

When you call a normal AI API, you are blind twice:

1. **They can see everything you send.** Prompts, customer records, deal
   terms, strategy. Providers *promise* not to look (SOC 2, "no logging") —
   but it's a promise, enforced by contract and reputation, not physics.
2. **You can't verify what actually ran.** Did you get the model you paid
   for, or a cheaper one quietly substituted? Was the output altered?
   Academic work on auditing model substitution in LLM APIs shows this is a
   real, measurable problem — and without verification, undetectable.

A **TEE (Trusted Execution Environment)** is a vault built into the chip.
Code and data execute encrypted — invisible even to the machine's owner,
the cloud admin, or anyone with root. And the hardware signs a **receipt
(attestation)**: cryptographic proof that *this exact model and code ran on
genuine hardware*. Each response can carry that signature.

What that buys, concretely:

- **Privacy by physics, not paperwork.** The compute provider *cannot* see
  your data. This upgrades "trust us" (Baseten/Together tier) to "you don't
  have to trust anyone."
- **Provenance per answer.** Every response is a verifiable artifact — for
  auditors, regulators, and investor diligence. Proof, not promises.
- **It unlocks the cheap tier safely.** Decentralized GPU marketplaces are
  60–85% cheaper than hyperscalers precisely because anyone can supply
  hardware — which is exactly why you couldn't trust them *without*
  attestation. TEE is the bridge that makes low-cost open compute
  enterprise-usable. Overhead: **under 7%** on modern GPUs.
- **Sovereignty with eyes open.** Open models on attested open compute mean
  no single vendor can price-hike, deprecate, throttle, or geo-block your
  AI — and the attestation means independence doesn't mean flying blind.

Why **TEE on 0G** specifically: it's attested inference *as a product*
(not DIY enclave engineering), per-response signatures verifiable on-chain,
frontier-scale open models live (GLM-5 744B), pricing *below* mainstream
OSS hosts — and it's the only stack where verified compute, storage, and
data availability are one system (our 0Gora platform uses all of it).

Honest limits (say them before the client does): TEE shifts trust to the
chipmakers; the TEE.fail attack (Oct 2025) showed physical-access
compromise is possible. The credible posture is defense-in-depth — TEE for
real-time serving now, optimistic/ZK spot-checks layered on as they mature
(0G's own multi-mode verification roadmap). Details in §2.

## 1. Competitor / platform matrix

| Platform | What it is | TEE / verification story | Inference-as-product? | Model catalog | Pricing signal | Maturity |
|---|---|---|---|---|---|---|
| **0G (baseline)** | Modular AI chain: compute marketplace + storage + DA | **TeeML**: model runs inside TEE; responses signed by the TEE's key; OPML/ZKML also in the verification framework ([docs](https://docs.0g.ai/developer-hub/building-on-0g/compute-network/inference), [framework PR](https://www.globenewswire.com/news-release/2026/03/27/3264035/0/en/0G-Labs-Publishes-Verification-Framework-for-Decentralized-AI-Training-as-Models-Cross-100-Billion-Parameters.html)) | **Yes** — attested inference API, pay-per-token in 0G | GLM-5 (744B MoE, live Feb 2026), DeepSeek V3.1, Qwen, GPT-OSS, Whisper, Flux — ~6 mainnet models ([0G blog](https://0g.ai/blog/glm-5-live-on-0g-compute)) | Market-driven, token-denominated (0G ≈ $0.60); Temporai's own benchmark: GLM-5.1 at ~98% savings vs Claude Sonnet | Mainnet, small but growing catalog |
| **NEAR AI Cloud** | TEE-attested OpenAI-compatible inference cloud | Intel TDX CVMs + NVIDIA Confidential Computing on 8×H200 nodes; per-response attestation/signatures; private-ML SDK **built by Phala** ([NEAR blog](https://near.ai/blog/building-next-gen-near-ai-infrastructure-with-tees), [docs](https://docs.near.ai/cloud/private-inference/)) | **Yes** — the closest direct analogue to 0G TeeML | Dual catalog: **TEE-hosted open models** (DeepSeek-V4-Flash, Qwen3.5/3.6, Kimi K2.x, gpt-oss-120b, MiniMax) + **non-TEE proxied** OpenAI/Anthropic/Gemini ([models](https://docs.near.ai/cloud/models/)) | Per-token USD: DeepSeek-V4-Flash $0.17/$0.35 per M; gpt-oss-120b $0.15/$0.55; Qwen3.5-397B $0.50/$3.30 (live /v1/models API) | Production; polished DX (IDE integrations, caching, E2EE chat) |
| **Akash** | Permissionless cloud/GPU marketplace | **Raw-compute-DIY today**; confidential compute (AMD SEV-SNP / Intel TDX via `params.tee` in SDL, Kata micro-VMs, attestation sidecars) slated **Q1 2026** on the [2026 roadmap](https://akash.network/roadmap/2026/) / [spec #872](https://github.com/orgs/akash-network/discussions/872) — not GA verification-per-response | Mostly DIY; **AkashML** (Q4 2025) adds managed inference from $0.15/M tokens ([akashml.com](https://akashml.com/)) | AkashML: open models; otherwise bring-your-own | 60–85% below AWS/GCP/Azure for compute ([guide](https://coinstancy.com/academy/guides/akash-network/)) | Mature marketplace; TEE story is roadmap, not product |
| **Phala** | Confidential-compute cloud (the TEE arms dealer) | Intel TDX + NVIDIA CC on H100/H200/B300; dual CPU+GPU attestation; every API response cryptographically attested; <7% overhead ([gpu-tee](https://phala.com/gpu-tee), [benchmark](https://docs.phala.network/phala-cloud/confidential-ai/gpu-tee/benchmark)) | **Both** — OpenAI-compatible confidential AI API *and* rent-a-CVM | Confidential LLM serving of open models; also powers others (NEAR's SDK) | Cloud-style GPU pricing | Production; arguably the deepest GPU-TEE expertise in crypto |
| **Marlin (Oyster)** | TEE coprocessor network — CVMs/enclaves on untrusted nodes | Attested enclaves, usage-based ([docs](https://docs.marlin.org/oyster/protocol/cvm/)) | **No** — general-purpose confidential compute (agents, relays, APIs); inference is DIY | None | Usage-based, no public LLM price list | Live, niche; infra not inference |
| **Bittensor / Chutes (SN64)** | Incentivized serverless inference subnet | No hardware attestation as the product; economic/consensus incentives | **Yes** — self-reported 160B tokens/day, top provider on OpenRouter (18 models) ([tao.media](https://www.tao.media/the-investors-guide-to-chutes-bittensors-inference-layer/)) | Large open-model set | Very cheap; first subnet past $100M mcap with real revenue | Production scale, but **cheap ≠ verifiable** |
| **io.net / Aethir** | DePIN GPU aggregators | None productized (raw GPUs) | **DIY** — clusters via Ray (io.net 30k+ GPUs); Aethir 40–80% below hyperscalers, B300 clusters planned ([io.net](https://io.net/), [Aethir](https://aethir.com/blog-posts/ai-inference-in-2026-aethirs-decentralized-gpu-advantage)) | BYO | 40–80% under hyperscalers | Mature raw compute; inference stacks emerging |
| **Tinfoil** (non-crypto) | Confidential-AI startup | Verifiable private inference; Red Hat collaborating upstream on cloud-native confidential AI ([Red Hat](https://next.redhat.com/2025/10/23/enhancing-ai-inference-security-with-confidential-computing-a-path-to-private-data-inference-with-proprietary-llms/), [tinfoil.sh](https://tinfoil.sh/)) | Yes (centralized SaaS) | Open models | SaaS | Early; signals TEE-inference going mainstream |

**Attested-inference products:** 0G, NEAR AI, Phala, Tinfoil. **Raw-compute / DIY:** Akash (until TEE GA), Marlin, io.net, Aethir. **Cheap-but-unverified:** Chutes.

## 2. ZK vs TEE — a fair fight

**How TEE works.** The model runs inside a hardware-isolated enclave (Intel TDX CVM + NVIDIA Confidential Computing on the GPU); the hardware signs an attestation that specific code/weights ran on genuine hardware, and each response can carry a signature chained to that attestation. Trust shifts from the operator to the chipmaker. Overhead is **<7% on Hopper-class GPUs, shrinking with sequence length** ([Phala benchmark](https://docs.phala.network/phala-cloud/confidential-ai/gpu-tee/benchmark), corroborated by [Red Hat](https://next.redhat.com/2025/10/23/enhancing-ai-inference-security-with-confidential-computing-a-path-to-private-data-inference-with-proprietary-llms/)).

**How zkML works.** The inference is re-expressed as an arithmetic circuit and a succinct proof is generated that the exact model produced the exact output; anyone can verify cheaply with no hardware trust. Overhead has fallen from ~1,000,000× toward ~10,000× ([ICME guide](https://blog.icme.io/the-definitive-guide-to-zkml-2025/)). Lagrange's **DeepProve-1 proved a full GPT-2 (~1.5B-class) inference — a first — and is 54–158× faster than EZKL** ([DeepProve-1](https://lagrange.dev/blog/deepprove-1), [benchmarks](https://lagrange.dev/blog/announcing-deepprove-zkml)), but the announcement gives no proving-time/hardware numbers, concedes performance optimization is the next phase, and 7B/70B/GLM-class proofs remain unshipped. **opML** (ORA) runs a 7B LLaMA on commodity PCs with fraud-proof "any-trust" security, at the price of a challenge-period delay to finality ([opML paper](https://arxiv.org/html/2401.17555v1), [ORA docs](https://docs.ora.io/doc/onchain-ai-oracle-oao/fraud-proof-virtual-machine-fpvm-and-frameworks/opml)). **zkVerify** (Horizen) is a Substrate L1 that makes *verifying* proofs cheap and chain-agnostic — it helps once proofs exist; it does nothing about generation cost ([Delphi](https://members.delphidigital.io/reports/zkverify-optimizing-zk-proof-verification-at-scale)).

**Trust assumptions & criticisms.** TEE: you trust Intel/AMD/NVIDIA silicon and their centralized attestation roots. That's not hypothetical — **TEE.fail (Oct 2025)** used a sub-$1,000 DDR5 interposer to break SGX/TDX/SEV-SNP, including extracting Intel ECDSA attestation keys, i.e., faking attestation ([tee.fail paper](https://tee.fail/files/paper.pdf), [BleepingComputer](https://www.bleepingcomputer.com/news/security/teefail-attack-breaks-confidential-computing-on-intel-amd-nvidia-cpus/)) — though it requires **physical access** to the machine, and vendors are patching. ZK: no hardware trust, but 4-orders-of-magnitude cost/latency, quantization/circuit constraints, and no LLM-scale production deployments.

**Pragmatic 2026 verdict.** For production LLM inference, **TEE is the only verification that ships today at scale** — 0G TeeML (GLM-5 744B), NEAR AI Cloud, Phala, Tinfoil are all live. zkML's production frontier is GPT-2; opML handles 7B with optimistic finality. The credible roadmap is **hybrid**: TEE for real-time attested serving, opML/zkML spot-checks for defense-in-depth against hardware compromise, zkVerify-style layers for cheap settlement — exactly the direction 0G's own multi-mode (TEEML/OPML/ZKML) framework points.

## 3. Sovereign AI trend — evidence

- **Gartner "Predicts 2026: AI Sovereignty"** exists as a dedicated report — the category is analyst-recognized ([Ubuntu/Gartner](https://ubuntu.com/engage/sovereign-ai-2026)); Stanford HAI debates its definition, confirming mainstream salience ([HAI](https://hai.stanford.edu/news/ai-sovereigntys-definitional-dilemma)).
- **Frontier-vendor lock-in became concrete**: a reported 12 June 2026 US export-control directive forced Anthropic to disable Claude models for foreign nationals, taking them offline worldwide overnight ([ADVISORI](https://www.advisori.de/en/blog/sovereign-ai-vendor-lock-in-enterprise-guide-2026) — single secondary source, verify before quoting to clients). Lock-in is analyzed as four simultaneous layers: model, data, API/tooling, infrastructure ([Kai Waehner](https://www.kai-waehner.de/blog/2026/04/06/enterprise-agentic-ai-landscape-2026-trust-flexibility-and-vendor-lock-in/)).
- **Nation-state programs**: GCC states (Saudi, UAE, Oman) mandating locally hosted/trained models for critical infrastructure; SAP's EU AI Cloud pitched as European digital sovereignty ([AI Profit Lab](https://aiprofitlab.io/blog/en/2026-04-14-sovereign-ai-data-borders/), [Spectro Cloud](https://www.spectrocloud.com/blog/enterprise-ai-2026-trends)).
- **Open models close the gap**: DeepSeek-V4 ships near-SOTA at ~1/6th cost, MIT-licensed ([Slashdot](https://news.slashdot.org/story/26/04/27/0328257/deepseek-v4-arrives-with-near-state-of-the-art-intelligence-at-16th-the-cost), [Forbes](https://www.forbes.com/sites/jonmarkman/2026/04/28/chinas-deepseek-v4-and-qwen-reshape-the-open-source-ai-race/)); Mistral positioned as the EU-jurisdiction enterprise alternative ([ADVISORI](https://www.advisori.de/en/blog/sovereign-ai-vendor-lock-in-enterprise-guide-2026)).
- **Inference is where the money moved**: ~70% of AI GPU compute and ~85% of enterprise AI budget is inference in 2026 ([Aethir](https://aethir.com/blog-posts/ai-inference-in-2026-aethirs-decentralized-gpu-advantage) — vendor stat, directionally corroborated by DePIN growth).

## 4. Strategic read for Temporai

- **"Build on 0G" is defensible** on the axis that matters: 0G is one of only two crypto-native platforms shipping per-response TEE-attested inference of frontier-scale open models today (GLM-5 744B), and the only one that bundles verifiable storage + DA + on-chain settlement — Temporai's verifiable-RAG stack uses all three. NEAR AI attests inference but has no storage/DA story.
- **NEAR AI Cloud is the real competitor.** Same TDX+NVIDIA-CC architecture, USD per-token pricing, better DX, bigger catalog (plus proxied frontier models — though those are explicitly *not* TEE-covered). Honest answer to "why not NEAR?": if the client only needs private inference, NEAR is credible; if they need verifiability woven into data + retrieval + settlement (Temporai's actual product), 0G is the integrated stack — and Temporai can deliver on NEAR too if a deal demands it.
- **Akash/io.net/Aethir are complements, not competitors**: raw GPUs with no per-response attestation. "Why not just Akash?" — because Akash's TEE support is a Q1-2026 roadmap item for confidential *deployments*, not a signed-inference product; you'd be building 0G's TeeML yourself. Use them as cheap capacity under a Temporai-built attestation layer if ever needed.
- **Phala is both supplier and rival**: it powers NEAR's TEE stack and sells its own confidential AI API. Treat it as the fallback TEE substrate (and a partnership candidate), not the pitch lead.
- **Cheap-but-unverified is the trap to name in sales**: Chutes/Bittensor moves 100B+ tokens/day at rock-bottom prices with no hardware attestation — great foil for explaining why "verifiable" is the differentiator, not just "cheap."
- **Honest risks**: (1) 0G's mainnet catalog is ~6 models vs NEAR's dozens — mitigable, but real; (2) token-denominated pricing adds FX volatility enterprises dislike; (3) TEE.fail-class attacks mean "hardware-attested" ≠ "trustless" — say so proactively, position physical-access threat model honestly, and point to 0G's OPML/ZKML roadmap as defense-in-depth.
- **Ride the sovereignty narrative**: the pitch "open models + attested decentralized inference = no single vendor can price-hike, deprecate, or geo-block you" now has analyst cover (Gartner) and a visceral 2026 anecdote (the reported Claude export-control blackout — verify it first).
