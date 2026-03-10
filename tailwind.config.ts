import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: { 900: '#0a0a0a', 800: '#111111', 700: '#1a1a1a', 600: '#222222', 500: '#2a2a2a' },
        accent: { DEFAULT: '#ff6b35', hover: '#ff8c5a' },
      },
    },
  },
  plugins: [],
}
export default config
