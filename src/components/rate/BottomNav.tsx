"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCommunity } from "@/components/community/CommunityProvider";
import { stripLocale } from "@/i18n/href";

function Icon({ name, active }: { name: "star" | "check" | "pulse" | "search" | "user"; active: boolean }) {
  const common = { className: "h-6 w-6", fill: active && name === "star" ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (name) {
    case "star":
      return <svg {...common}><path strokeLinejoin="round" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" /></svg>;
    case "check":
      return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 4-4.5M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
    case "pulse":
      return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2.5-6 4 12 2.5-6H21" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M20 20l-3.5-3.5" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path strokeLinecap="round" d="M4 20.5c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5" /></svg>;
  }
}

/** Phone-first tab bar. Four places to go, one tap each. Hidden on desktop where the header carries the same links. */
export default function BottomNav() {
  const { t, href } = useLocale();
  const { mode, user, openSignIn } = useCommunity();
  const pathname = usePathname();
  const { path } = stripLocale(pathname);

  const tabs = [
    { key: "rate", to: "/", icon: "star" as const, label: t.rate.navRate, active: path === "/" },
    { key: "promises", to: "/promises", icon: "check" as const, label: t.rate.navPromises, active: path.startsWith("/promises") || path.startsWith("/p/") },
    { key: "mood", to: "/mood", icon: "pulse" as const, label: t.rate.navMood, active: path.startsWith("/mood") },
    { key: "search", to: "/candidates", icon: "search" as const, label: t.rate.navSearch, active: path.startsWith("/candidates") || path.startsWith("/party") },
  ];

  const cls = (active: boolean) =>
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] font-medium transition " + (active ? "text-gold" : "text-muted hover:text-ink");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden" aria-label="Bottom">
      <div className="mx-auto flex max-w-lg">
        {tabs.map((tab) => (
          <Link key={tab.key} href={href(tab.to)} className={cls(tab.active)} aria-current={tab.active ? "page" : undefined}>
            <Icon name={tab.icon} active={tab.active} />
            {tab.label}
          </Link>
        ))}
        {mode === "live" && (
          <button type="button" onClick={openSignIn} className={cls(false)} aria-label={t.rate.navMe}>
            <Icon name="user" active={false} />
            {user ? (user.displayName ?? `···${user.phoneLast4}`).slice(0, 10) : t.rate.navMe}
          </button>
        )}
      </div>
    </nav>
  );
}
