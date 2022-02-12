module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#0A2E36",
				lightBackground: "#156271",
				middleBackground: "#004754",
				accent1: "#14CC60",
				accent2: "#27FB6B",
			},
			fontFamily: {
				"montserrat": ["'Montserrat'", "sans-serif"],
				"nunito": ["'Nunito'", "sans-serif"],
			}
		}
	},
	plugins: [],
};
