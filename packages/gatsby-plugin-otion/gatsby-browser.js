import { hydrate, setup } from "otion";

import options from "./src/options";

/** @type {import("gatsby").GatsbyBrowser["onClientEntry"]} */
export const onClientEntry = () => {
	setup(options);
	hydrate();
};
