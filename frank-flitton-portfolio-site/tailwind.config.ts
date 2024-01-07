import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import containerQueriesPlugin from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typographyPlugin, containerQueriesPlugin],
  theme: {
    extend: {
      fontFamily: {
        futura: ["Futura", "sans-serif"],
      },
      keyframes: {
        featureSliderInKF: {
          "0%": { opacity: "0", left: "-300vw" },
          "0.11%": { left: "0" },
          "100%": { opacity: "1", left: "0" },
        },
        featureSliderOutKF: {
          "0%": { opacity: "1", left: "0" },
          "99.99%": { left: "0" },
          "100%": { opacity: "0", left: "-300vw" },
        },
      },
      animation: {
        featureSliderIn: "featureSliderInKF 1s ease forwards",
        featureSliderOut: "featureSliderOutKF 0.5s ease forwards",
      },
    },
  },
};

export default config;
