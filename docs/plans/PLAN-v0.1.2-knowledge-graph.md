# PLAN — v0.1.2: The Tempora Knowledge Graph

## The idea

Upgrade the hero's abstract "agent swarm" from decoration into substance: an explorable
**knowledge graph of everything Tempora Labs / Temporai has built and thought about** —
projects, technologies, and concepts as nodes; real relationships as edges. A visitor
hovers "0Gora" and sees it light up its neighbors (RAG, 0G, verifiability, Tempora
Assistant); clicks it and gets a one-paragraph card with a link. The message: *this is
what AI-native looks like from the inside — and we can build yours.*

Obsidian's graph view is the aesthetic reference: organic clusters, hover-highlighting
of a node's neighborhood, labels that fade in as you approach. We keep our palette
(blue → purple → silver on the pastel gradient) and our existing canvas engine.

## Authoring model: an Obsidian vault as the CMS

Obsidian itself can't be embedded in a website (its graph is app-internal; Obsidian
Publish hosts vaults on their domain, off-brand — noted and rejected as the display).
But Obsidian is an excellent **authoring tool** for exactly this data shape:

- A vault lives in the repo at `content/vault/` — one markdown note per node
  (`0Gora.md`, `DR HIRO.md`, `NodeAI.md`, `MCP.md`, `Verifiable RAG.md`, `0G.md`,
  `Agent Swarms.md`, `TEE.md`, …).
- Each note: YAML frontmatter (`type: project | tech | concept`, `url:`, `weight:`)
  plus a short blurb, with `[[wikilinks]]` to related notes in the prose.
- A build-time script (`scripts/vault-to-graph.mjs`) parses the vault: notes → nodes,
  wikilinks → edges, frontmatter → node styling/links. Output: `data/graph.json`.
- Kevin edits the vault in Obsidian (using its real graph view to sanity-check the
  shape), commits, and the site graph updates on next build. No runtime dependency,
  no backend, no CMS service.

### Data-source phases

1. **Phase 1 — curated vault (~25-40 notes).** Hand-written. Full editorial control;
   the graph is guaranteed to look intentional. Seed content already exists: the
   PilotCaseStudy copy (DR HIRO / 0Gora / NodeAI), README material from each repo,
   and the Tempora Assistant KB corpus as reference.
2. **Phase 2 — corpus-assisted edges ("powered by 0Gora").** Derive additional
   suggested edges from the existing 0Gora/Tempora-Assistant knowledge base via
   embedding similarity (Qdrant is already running with the corpus embedded). These
   arrive as *suggestions* into the vault (a script proposes `[[links]]`), never
   directly into production — auto-generated graphs read as noise without curation.
   The story writes itself: "this graph is grown from the same verifiable knowledge
   base our assistant answers from."
3. **Phase 3 — assistant tie-in.** Node card gets an "Ask about this" button that
   opens Tempora Assistant / 0Gora chat pre-seeded with the node's question. The
   graph becomes a front door to the products it describes.

## Rendering

Evolve `AgentSwarm.tsx` into a sibling `KnowledgeGraph.tsx` (keep the swarm for the
hero ambience; see Placement):

- **Layout:** force-directed positions computed at **build time** (d3-force in the
  vault-to-graph script, positions baked into `graph.json`) — zero runtime layout
  cost, deterministic shape, no new client dependencies. Slight runtime wander
  (reuse the swarm's per-node drift) keeps it alive.
- **Interaction:** cursor proximity = highlight node + its edges + fade in labels
  (the swarm's proximity machinery already does the hard part); click/tap = side
  card with blurb + link. Mobile: tap instead of hover, card as bottom sheet.
- **Look:** same deepened blue→purple→silver palette; node size by `weight`
  (project > tech > concept); labels in the site's mono font, silver.
- **Perf budget:** same as the swarm — canvas 2D, precomputed pairs, no per-frame
  allocation. 40-ish labeled nodes is far lighter than the current 110-node swarm.

## Placement

Recommended: **keep the hero swarm** (it's ambience, now with its entrance
choreography) and give the knowledge graph a **dedicated full-width section** right
after the hero — "What we've built, and how it connects" — where it has room to be
legible (labels need more space than the hero allows). The existing "Proof of Work"
cards then become the graph's static fallback / SEO content. A `/graph` full-page
version can follow if the section earns it.

Alternative considered and parked: making the hero swarm *be* the knowledge graph —
rejected for v0.1.2 because hero-scale nodes are too small for readable labels, and
the hero already carries the headline + CTAs.

## Work plan (v0.1.2 scope = Phase 1)

1. `content/vault/` — seed ~25-40 notes with frontmatter + wikilinks (the slow part
   is editorial: what are the 30 things Tempora wants the world to see connected).
2. `scripts/vault-to-graph.mjs` — parse vault → run d3-force → emit `data/graph.json`
   (nodes: id, label, type, blurb, url, x, y, weight; edges: source, target).
   Wire into `pnpm build` (prebuild step).
3. `components/KnowledgeGraph.tsx` — canvas renderer per above.
4. New landing section + mobile behavior + reduced-motion (static render).
5. Verify at 1x/2x DPR + phone (the AgentSwarm lessons: replaced-element sizing,
   pointer mapping into draw-space, ResizeObserver).

Phases 2-3 are separate follow-ups, not v0.1.2 blockers.

## Open questions for Kevin

- Node inventory: which projects/concepts are in and which internal ones stay out
  (e.g. does Onyx/internal tooling appear, or only public-facing work)?
- Does an internal Obsidian vault already exist that should seed this, or do we
  start the vault fresh in this repo?
- Section heading/copy: "What we've built, and how it connects" vs "The Tempora
  knowledge graph" vs something else.
