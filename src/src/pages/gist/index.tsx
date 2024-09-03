import { useRouter } from "next/router";
import GistClient from "@/components/gistClient";

/**
 * Provide a (relatively) empty page for github to draw content via script.
 * @returns
 */
function Page() {
  const router = useRouter();
  const slug = router.query.gist || "";

  const isServer = !globalThis.window;
  if (isServer) return <></>;

  return <>{slug && <GistClient id={`${slug}`} />}</>;
}

export default Page;
