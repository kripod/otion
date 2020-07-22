import { AppProps } from "next/app";
import { hydrate, setup } from "otion";
import * as React from "react";

import options from "../otion.config";

if (typeof window !== "undefined") {
	setup(options);
	hydrate();
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return <Component {...pageProps} />;
}
