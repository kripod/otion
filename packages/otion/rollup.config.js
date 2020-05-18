import { getMainEntry, getServerEntry } from "../../rollup.config.base";
import pkg from "./package.json";

export default [
	getMainEntry(pkg, "development"),
	getMainEntry(pkg, "production"),
	getServerEntry(pkg, { input: "./src/server.ts" }),
];
