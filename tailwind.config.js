// copied from projects/themes/index.ts
// TODO: migrate projects/themes/index.ts into tailwind.config.js
const spacingRhythm = 8;
const Spacing = {
  xs: `${spacingRhythm / 2}px`,
  sm: `${spacingRhythm}px`,
  md: `${spacingRhythm * 2}px`,
  lg: `${spacingRhythm * 3}px`,
  xl: `${spacingRhythm * 4}px`,
  xxl: `${spacingRhythm * 5}px`,
  xxxl: `${spacingRhythm * 6}px`,
  xxxxl: `${spacingRhythm * 7}px`,
  xxxxxl: `${spacingRhythm * 8}px`,
  xxxxxxl: `${spacingRhythm * 9}px`,
  xxxxxxxl: `${spacingRhythm * 10}px`,
  xxxxxxxxl: `${spacingRhythm * 11}px`,
  xxxxxxxxxl: `${spacingRhythm * 12}px`,
};
const textFontSize = {
  countdown: "64px",
  main: "32px",
  titleL: "24px",
  title: "20px",
  subhead: "16px",
  body: "14px",
  caption: "12px",
  footnote: "10px",
};

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: { ...Spacing },
      fontSize: {
        ...textFontSize,
      },
    },
  },
  plugins: [],
};
