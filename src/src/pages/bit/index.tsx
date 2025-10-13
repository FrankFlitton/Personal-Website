import AsciiGrid from "@/components/CanvasAnimations/asciiGrid";
import PlatonicSolids3D from "@/components/CanvasAnimations/platonicSolids3D";
import CircleFlourish from "@/components/HomePage/CircleFlourish";
import EndlessCircleAnimation from "@/components/HomePage/EndlessCircleAnimation";
import useIsDark from "@/hooks/useIsDark";

export default function Home() {
    const isDark = useIsDark();
    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-[1px] h-screen bg-yellow-600 dark:bg-blue-800">
            <div className="col-span-2 row-span-3">
                <EndlessCircleAnimation isDark={isDark} />
            </div>
            <div className="row-span-2 p-2 bg-black">
                <AsciiGrid isDark={isDark} />
            </div>
            <div className="row-span-1 p-2 bg-black text-white">
                icon here
            </div>
            <div className="row-span-1 p-2 bg-black">
                <PlatonicSolids3D isDark={isDark} />
            </div>
            <div className="row-span-1 p-2 bg-black">
                <CircleFlourish isDark={isDark} full />
            </div>
            <div className="row-span-1 p-2 bg-black text-white">
                icon here
            </div>
        </div>
    );
}
