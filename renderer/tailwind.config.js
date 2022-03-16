module.exports = {
	content: [
    'renderer/pages/**/*.{ts,tsx}',
    'renderer/components/**/*.{ts,tsx}',
  ],
  theme: {
		extend: {
			fontFamily: {
				main: ['Catamaran'],
			},
			colors: {
				'lynx-light': '#38395f',
				'lynx-slight-dark': '#2e2f4f',
				'lynx-mid-dark': '#2a2a46',
				'lynx-dark': '#242439',
				'lynx-very-dark': '#1c1c2f',
				'lynx-accent': '#34355b',
				'lynx-text-light': '#ebeaf0',
				'lynx-text-dark': '#B6b6bb',
			},
			backgroundImage: {
				'osu-btn': "url('/images/osu-bg.png')",
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar')
	],
}
