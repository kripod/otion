import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { setup } from "otion";
import {
	filterOutUnusedRules,
	getStyleElement,
	VirtualInjector,
} from "react-otion/server";

import options from "../otion.config";

export default class MyDocument extends Document {
	static async getInitialProps({
		renderPage,
	}: DocumentContext): Promise<DocumentInitialProps> {
		const injector = VirtualInjector();
		setup({ ...options, injector });

		const page = await renderPage();
		return {
			...page,
			styles: getStyleElement(filterOutUnusedRules(injector, page.html)),
		};
	}
}
