/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				goldColor: 'var(--gold-color)'
			},
			gridTemplateColumns: {
				fluid: 'repeat(auto-fit, minmax(200px, 1fr)'
			},
			aspectRatio: {
				'4/3': '4 / 3'
			}
			// textColor: {
			// }
		}
	},
	plugins: []
};
