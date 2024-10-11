import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 10s ease-in-out infinite',
        wave: 'wave 4s linear infinite',
        floatAround: 'floatAround 20s linear infinite',
        floatMinimal: 'floatMinimal 30s ease-in-out infinite',
      },
      keyframes: {

        floatMinimal: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20vw, 10vh) rotate(45deg)' },
          '50%': { transform: 'translate(-15vw, -20vh) rotate(90deg)' },
          '75%': { transform: 'translate(10vw, 15vh) rotate(135deg)' },
          '100%': { transform: 'translate(0, 0) rotate(180deg)' },
        },
        floatAround: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(50vw, 20vh)' },
          '50%': { transform: 'translate(-30vw, -30vh)' },
          '75%': { transform: 'translate(30vw, 40vh)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(5px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100px)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
