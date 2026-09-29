import dynamic from "next/dynamic";
import config from "@/sanity/sanity.config";

export const dynamic = "force-dynamic";

// NextStudio must only render in the browser — it uses browser-only APIs
// (localStorage, window, etc.) that cause hydration mismatches when SSR'd.
const Studio = dynamic(() =>
  import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <Studio config={config} />;
}
