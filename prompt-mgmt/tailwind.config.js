module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        // Agenta.ai color palette
        accent: '#6941C6',
        bg: '#f8fafc',
        sidebar: '#F8FAFC',
        sidebarSelected: '#1D2939',
        sidebarText: '#667085',
        sidebarAvatar: '#F2F4F7',
        sidebarBorder: '#EAECF0',
        primary: '#101828',
        primaryHover: '#344054',
        cardBorder: '#EAECF0',
        cardBg: '#FFFFFF',
        cardTitle: '#101828',
        cardSubtitle: '#667085',
        chartLine: '#12B76A',
        infoIcon: '#98A2B3',
        // Rich color palette
        background: {
          light: '#f8fafc', // slate-50
          dark: '#0f172a',  // slate-900
        },
        foreground: {
          light: '#ffffff', // white
          dark: '#1e293b',  // slate-800
        },
        primary: {
          light: '##1c2c3d', // gray
          dark: '#10b981',  // emerald-500
        },
        accent: {
          light: '#10b981', // emerald-500
          dark: '#34d399',  // emerald-400
        },
        creative: {
          light: '#9333ea', // purple-600
          dark: '#a855f7',  // purple-500
        },
        warning: {
          light: '#f59e0b', // amber-500
          dark: '#fbbf24',  // amber-400
        },
        error: {
          light: '#e11d48', // rose-600
          dark: '#f43f5e',  // rose-500
        },
        success: {
          light: '#059669', // emerald-600
          dark: '#10b981',  // emerald-500
        },
        info: {
          light: '#0ea5e9', // sky-500
          dark: '#38bdf8',  // sky-400
        }
      },
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 