import useTheme from "@/hooks/useTheme";
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";
import { Icon } from "@mdi/react";
const DarkToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={() => toggleTheme()} title="Toggle theme" className="">
      <Icon
        className="hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110 mb-[-0.5rem] p-1"
        path={isDark ? mdiWeatherSunny : mdiWeatherNight}
        color={isDark ? "white" : "white"}
        size={1.2}
      />
    </button>
  );
};

export default DarkToggle;
