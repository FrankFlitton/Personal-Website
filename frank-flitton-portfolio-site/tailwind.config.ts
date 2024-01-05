import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: ["Futura", "sans-serif"],
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
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
  plugins: [],
};
export default config;
