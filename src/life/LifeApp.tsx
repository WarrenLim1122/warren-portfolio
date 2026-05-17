/**
 * LifeApp — the /life entry. Fully self-contained: nothing here imports
 * from src/components (the portfolio). Deleting src/life/ plus the three
 * additions in App.tsx removes this area with zero residue.
 *
 * Tabs are component state synced to the URL hash (#gallery / #golf) for
 * shareable deep links, no nested router. A future section is a one-line
 * addition to LIFE_TABS, a component, and the REGISTRY below.
 */

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { LIFE_TABS, type LifeTabId } from "./life-content";
import { LifeNav } from "./components/LifeNav";
import { GlobeGallery } from "./components/GlobeGallery";
import { GolfJourney } from "./components/GolfJourney";
import "./life.css";

const REGISTRY: Record<LifeTabId, ReactNode> = {
  gallery: <GlobeGallery />,
  golf: <GolfJourney />,
};

const TAB_IDS = LIFE_TABS.map((t) => t.id) as LifeTabId[];

function hashTab(): LifeTabId {
  const h = window.location.hash.replace("#", "") as LifeTabId;
  return TAB_IDS.includes(h) ? h : TAB_IDS[0];
}

export default function LifeApp() {
  const [tab, setTab] = useState<LifeTabId>(TAB_IDS[0]);

  // Adopt the hash on mount and follow back/forward navigation.
  useEffect(() => {
    setTab(hashTab());
    const onHash = () => setTab(hashTab());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const change = (id: LifeTabId) => {
    setTab(id);
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="life-root min-h-screen bg-paper font-sans text-ink">
      <LifeNav active={tab} onChange={change} />
      <main>{REGISTRY[tab]}</main>
      <footer className="border-t border-line px-6 py-10 text-center md:px-12 lg:px-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-graphite/60">
          {new Date().getFullYear()} Warren Lim Zhan Feng · The other side
          of the desk
        </p>
      </footer>
    </div>
  );
}
