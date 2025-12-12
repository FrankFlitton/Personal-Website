import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
import containerQueriesPlugin from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  plugins: [typographyPlugin, containerQueriesPlugin],
  theme: {
    extend: {
      fontFamily: {
        futura: ["Futura", "sans-serif"],
      },
      screens: {
        'hzphone': { 'raw': '(min-device-width: 480px) and (max-height: 600px) and (orientation: landscape)' }
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.7',
          },
        },
        lg: {
          css: {
            lineHeight: '1.7',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
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
        featureSliderIn: "featureSliderInKF 0.2s ease forwards",
        featureSliderOut: "featureSliderOutKF 0.2s ease forwards",
      },
    },
  },
};

export default config;
