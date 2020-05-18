import resolve from "@rollup/plugin-node-resolve";
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

export function getMainEntry(pkg) {
	const minifiedOutputs = getOutputs(pkg, ".");

	const unminifiedOutputs = minifiedOutputs.map(({ file, ...rest }) => ({
		...rest,
		file: file.replace(".min.", "."),
	}));

	return {
		input: "./src/index.ts",
		output: [...unminifiedOutputs, ...minifiedOutputs],
		plugins: [
			...commonPlugins,
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
