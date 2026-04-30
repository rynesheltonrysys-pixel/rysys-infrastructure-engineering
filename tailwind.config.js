/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Zilla Slab',
  				'Inter',
  				'-apple-system',
  				'sans-serif'
  			],
			display: [
				'Oswald',
				'Zilla Slab',
				'Inter',
				'system-ui',
				'sans-serif'
			],
  			mono: [
  				'JetBrains Mono',
  				'Fira Code',
  				'Consolas',
  				'monospace'
  			]
  		},
  		borderWidth: {
  			'3': '3px',
  			'4': '4px'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			rysys: {
  				cream: '#fdfaf5',
  				grey: '#ececec',
  				blue: '#1e40af',
          'blue-power': '#418FDE',
          'green-power': '#00583F',
  				black: '#121212',
          gold: '#FFD100'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))'
  		},
  		boxShadow: {
  			brutal: '4px 4px 0px #121212',
  			'brutal-lg': '10px 10px 0px #121212',
  			'brutal-blue': '6px 6px 0px #418FDE',
        'brutal-blue-lg': '10px 10px 0px #418FDE',
        'brutal-blue-hover': '2px 2px 0px #418FDE',
        'brutal-green': '6px 6px 0px #00583F',
        'brutal-green-lg': '10px 10px 0px #00583F',
        'brutal-gold': '4px 4px 0px #FFD100',
        'brutal-gold-lg': '10px 10px 0px #FFD100',
        'brutal-gold-2': '4px 4px 0 #FFD100, 8px 8px 0 #121212',
        'brutal-gold-triple': '4px 4px 0 #FFD100, 8px 8px 0 #121212, 12px 12px 0 #FFD100',
        'brutal-faceted': 'inset 0 0 0 3px #121212, inset 0 0 0 6px #FFD100',
  			'brutal-hover': '2px 2px 0px #121212',
        'brutal-gold-hover': '2px 2px 0px #FFD100'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}