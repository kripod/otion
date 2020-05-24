import { AppProps } from "next/app";
import { hydrate, setup } from "otion";
import * as React from "react";
import { useRef } from "react";

import options from "../otion.config";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const isOtionSetupNeeded = useRef(true);
	if (typeof window !== "undefined") {
		if (isOtionSetupNeeded.current) {
			setup(options);
			isOtionSetupNeeded.current = false;
		}
		hydrate();
	}

	return <Component {...pageProps} />;
}
