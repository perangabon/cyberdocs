import { WelcomeBlock } from "@/components/blocks/welcome-block";
import { NetworkPulseBlock } from "@/components/blocks/network-pulse-block";
import { StatusBlock } from "@/components/blocks/status-block";
import { TechStackBlock } from "@/components/blocks/tech-stack-block";
import { CategoryBentoBlocks } from "@/components/blocks/category-bento-blocks";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Bento Grid: 4 columns desktop, 1 column mobile, gap-6 (24px) */}
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
        {/* Bloc 1 — Span 2x2 — Welcome */}
        <WelcomeBlock />

        {/* Bloc 2 — Span 2x1 — Network Pulse */}
        <NetworkPulseBlock />

        {/* Bloc 3 — Span 1x1 — Status */}
        <StatusBlock />

        {/* Bloc 4 — Span 1x1 — Tech Stack */}
        <TechStackBlock />

        {/* Bloc 5 — Triple Bento — Categories */}
        <CategoryBentoBlocks />
      </div>
    </main>
  );
}
