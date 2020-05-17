import { setup } from "otion";
import {
	filterOutUnusedRules,
	getStyleElement,
	VirtualInjector,
} from "react-otion/server";

import options from "./src/options";

/** @type {Map<string, ReturnType<typeof VirtualInjector>>} */
const injectorsByPathname = new Map();

/** @type {import("gatsby").GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ pathname, element }) => {
	const injector = VirtualInjector();
	setup({ ...options, injector });
	injectorsByPathname.set(pathname, injector);

	return element;
};

/**
 * @param {{
 *   pathname: string;
 *   bodyHtml: string;
 *   setHeadComponents: (components: React.ReactNode) => void;
 * }} apiCallbackContext
 */
export const onRenderBody = ({ pathname, bodyHtml, setHeadComponents }) => {
	const injector = injectorsByPathname.get(pathname);
	if (injector) {
		setHeadComponents(
			getStyleElement(filterOutUnusedRules(injector, bodyHtml)),
		);
		injectorsByPathname.delete(pathname);
	}
};
