import type { Metadata } from "next";
import ModerationQueue from "./ModerationQueue";

export const metadata: Metadata = { title: "Moderation", robots: { index: false, follow: false } };

export default function ModerationPage() {
  return <ModerationQueue />;
}
