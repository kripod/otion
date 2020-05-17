import resolve from "@rollup/plugin-node-resolve";
import ts from "@wessberg/rollup-plugin-ts";
import * as path from "path";
import { terser } from "rollup-plugin-terser";

export const commonPlugins = [
	ts({
		transpiler: "babel",
		cwd: path.join(__dirname, "../.."),
		tsconfig: path.join(__dirname, "tsconfig.json"),
	}),
];

export function getMainEntry(pkg) {
	const minifiedOutputs = [
		{
			file: pkg.exports["."].import,
			format: "esm",
		},
		{
			file: pkg.exports["."].require,
			format: "cjs",
			externalLiveBindings: false,
		},
	];

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
		output: [
			{
				file: pkg.exports["./server"].import,
				format: "esm",
			},
			{
				file: pkg.exports["./server"].require,
				format: "cjs",
				externalLiveBindings: false,
			},
		],
		plugins: commonPlugins,
	};
}
