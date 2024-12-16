import { Page } from "@/components/page";
import dynamic from "next/dynamic";

const Checkers = dynamic(() => import("@/components/Experiments/Checkers"), {
  ssr: false,
});

export default function Home() {
  return (
    <Page>
      <Checkers />
    </Page>
  );
}
