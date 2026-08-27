import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // ← Yahan apni marzi ke colors daal sakte ho
          primary: '#2563eb',
          'primary-dark': '#1d4ed8',
          surface: '#0f172a',
          border: '#1e293b',
        },
      },
      animation: {
        'bounce-delay-1': 'bounce 1.2s infinite 0s',
        'bounce-delay-2': 'bounce 1.2s infinite 0.2s',
        'bounce-delay-3': 'bounce 1.2s infinite 0.4s',
      },
    },
  },
  plugins: [],
}

export default config