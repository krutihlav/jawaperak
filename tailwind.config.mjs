/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F5',
        'paper-2': '#F2EFE9',
        card: '#FFFFFF',
        ink: '#141312',
        mute: '#3E3A33',
        'mute-2': '#524E46',
        perak: '#8B2014',
        'perak-hover': '#A32618',
        gold: '#C89D42',
        rule: '#E2DDD5',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
