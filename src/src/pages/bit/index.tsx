import AsciiGrid from "@/components/CanvasAnimations/asciiGrid";
import EndlessCircleAnimation from "@/components/HomePage/EndlessCircleAnimation";
import useIsDark from "@/hooks/useIsDark";

export default function Home() {
    const isDark = useIsDark();
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-screen p-4">
            <div className="col-span-2 row-span-2">
                <EndlessCircleAnimation
                    isDark={isDark}
                />
            </div>
            <div
                className="row-span-1"
            ><AsciiGrid isDark={isDark} /></div>
            <div
                className="row-span-1"
            ><AsciiGrid isDark={isDark} /></div>
            <div
                className="row-span-1"
            ><AsciiGrid isDark={isDark} /></div>
        </div>
    );
}
