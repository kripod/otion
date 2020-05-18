import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "@wessberg/rollup-plugin-ts";
import * as path from "path";
import { terser } from "rollup-plugin-terser";

function getOutputs(pkg, subpath) {
	return [
		{
			file: pkg.exports[subpath].import,
			format: "esm",
		},
		{
			file: pkg.exports[subpath].require,
			format: "cjs",
			externalLiveBindings: false,
		},
	];
}

export const commonPlugins = [
	ts({
		transpiler: "babel",
		cwd: path.join(__dirname, "../.."),
		tsconfig: path.join(__dirname, "tsconfig.json"),
	}),
];

export function getMainEntry(pkg, env) {
	const outputs = getOutputs(pkg, ".");
	if (env === "development") {
		outputs.forEach((output) => {
			// eslint-disable-next-line no-param-reassign
			output.file = output.file.replace(".prod.min.", ".dev.");
		});
	}

	return {
		input: "./src/index.ts",
		output: outputs,
		plugins: [
			...commonPlugins,
			replace({ "process.env.NODE_ENV": JSON.stringify(env) }),
			resolve({ browser: true }),
			terser({ include: /\.min\.[^.]+$/ }),
		],
		external: [/^@babel\/runtime\//],
	};
}

export function getServerEntry(pkg, options) {
	return {
		...options,
		output: getOutputs(pkg, "./server"),
		plugins: commonPlugins,
	};
}
