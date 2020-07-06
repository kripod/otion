module.exports = {
	preset: "ts-jest",
	testPathIgnorePatterns: ["/node_modules/", "/.cache/"],
	globals: {
		"ts-jest": {
			tsConfig: "./tsconfig-test.json",
		},
	},
};
