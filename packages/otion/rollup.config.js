import { getMainEntries, getServerEntry } from "../../rollup.config.base";
import pkg from "./package.json";

export default [
	...getMainEntries(pkg, "development"),
	...getMainEntries(pkg, "production"),
	getServerEntry(pkg, { input: "./src/server.ts" }),
];
