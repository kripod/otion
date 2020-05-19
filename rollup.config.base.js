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

const tsPlugin = ts({
	transpiler: "babel",
	cwd: path.join(__dirname, "../.."),
	tsconfig: path.join(__dirname, "tsconfig.json"),
});

export function getMainEntries(pkg, env) {
	const nodeOutputs = getOutputs(pkg, ".");
	if (env === "development") {
		nodeOutputs.forEach((output) => {
			// eslint-disable-next-line no-param-reassign
			output.file = output.file.replace(".min.", ".");
		});
	}

	const denoOutput = {
		...nodeOutputs[0],
		file: nodeOutputs[0].file.replace(
			"dist-node/esm/bundle",
			`dist-deno/bundle.${env === "development" ? "dev" : "prod"}`,
		),
	};

	const commonLastPlugins = [
		resolve({ browser: true }),
		terser({ include: /\.min\.[^.]+$/ }),
	];

	const nodeEntry = {
		input: "./src/index.ts",
		output: nodeOutputs,
		plugins: [tsPlugin, ...commonLastPlugins],
		external: [/^@babel\/runtime\//],
	};

	const denoEntry = {
		...nodeEntry,
		output: denoOutput,
		plugins: [
			tsPlugin,
			replace({
				"process.env.NODE_ENV": JSON.stringify(env),
				"typeof window": "typeof document",
			}),
			...commonLastPlugins,
		],
	};

	return [nodeEntry, denoEntry];
}

export function getServerEntry(pkg, options) {
	return {
		...options,
		output: getOutputs(pkg, "./server"),
		plugins: tsPlugin,
	};
}
