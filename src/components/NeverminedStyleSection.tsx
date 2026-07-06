'use client';

export default function NeverminedStyleSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#f7fff9]">
      {/* Animated aurora */}
      <div className="pointer-events-none absolute inset-0">
        <div className="nm-aurora-bg absolute inset-[-20%]" />
      </div>

      {/* Mesh lines */}
      <img
        src="/nevermesh.svg"
        alt=""
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Veil for readability */}
      <div className="pointer-events-none absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row">
        {/* SECTION A - The Problem */}
        <div className="flex-1 rounded-3xl bg-[#eefaf6] p-10 shadow-sm border border-white/60">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            The Problem
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            The Old Way
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-slate-700 leading-relaxed">
            <li>Hacking Stripe instead of building agents</li>
            <li>Weeks spent on subscriptions + access control</li>
            <li>Unclear pricing → revenue left on table</li>
            <li>No agent-native integrations or automation</li>
          </ul>
        </div>

        {/* SECTION B - The Solution */}
        <div className="flex-1 rounded-3xl bg-gradient-to-tr from-[#daf96c] via-[#e8fbd1] to-[#abe2dd] p-10 shadow-sm border border-white/40">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-900/70">
            The Solution
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-950">
            The Tempora Way
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-emerald-950/90 leading-relaxed">
            <li>Launch ready-made agent workflows instantly</li>
            <li>Usage + outcome-based pricing natively supported</li>
            <li>Every request automatically metered + billed</li>
            <li>Agent-to-agent payments built into the core</li>
          </ul>
        </div>
      </div>
    </section>
  );
}






