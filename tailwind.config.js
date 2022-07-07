module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"background-default": "#0A2E36",
				"lightBackground-default": "#156271",
				"middleBackground-default": "#004754",
				"accent1-default": "#14CC60",
				"accent2-default": "#27FB6B",
			},
			fontFamily: {
				"montserrat": ["'Montserrat'", "sans-serif"],
				"nunito": ["'Nunito'", "sans-serif"],
			}
		}
	},
	plugins: [],
};
