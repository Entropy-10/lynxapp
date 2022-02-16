module.exports = {
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				main: ['Catamaran'],
			},
			colors: {
				'lynx-bg-light': '#38395f',
				'lynx-bg-slight-dark': '#2e2f4f',
				'lynx-bg-dark': '#2a2a46',
				'lynx-bg-mid-dark': '#242439',
				'lynx-bg-very-dark': '#1c1c2f',
				'lynx-bg-accent': '#34355b',
				'lynx-text-light': '#ebeaf0',
				'lynx-text-dark': '#B6b6bb',
			},
			backgroundImage: {
				'osu-btn': "url('/images/osu-bg.png')",
			},
		},
	},
	variants: {
		scrollbar: ['rounded'],
		extend: {},
	},
	plugins: [
		require('tailwind-scrollbar')
	],
};
