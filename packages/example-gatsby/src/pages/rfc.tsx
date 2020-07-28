/* eslint-disable simple-import-sort/sort */
import {
	css as orgCSS,
	stylesCompose,
	stylesCreate,
	stylesClassnames,
} from "otion";
import * as React from "react";

/**
 * `css` would have this API
 */
interface ExtendedCSS {
	create: typeof stylesCreate;
	compose: typeof stylesCompose;
	cls: typeof stylesClassnames;
}
const css: typeof orgCSS & ExtendedCSS = Object.assign(orgCSS, {
	create: stylesCreate,
	compose: stylesCompose,
	cls: stylesClassnames,
});

const styles = css.create({
	blue: { color: "blue", border: "1px solid" },
	green: { color: "green" },
	hotpink: { color: "hotpink", selectors: { "&:hover": { color: "pink" } } },
});
const combined = stylesCompose(styles.blue, styles.green, styles.hotpink);
const className = stylesClassnames(styles.blue, styles.hotpink);

export default function IndexPage(): JSX.Element {
	return (
		<React.StrictMode>
			<h1 className={css({ color: "hotpink" })}>Hello, world!</h1>
			<h2>Style Object (styles):</h2>
			<pre>
				<code>{JSON.stringify(styles, null, 2)}</code>
			</pre>
			<h2>
				Combine style objects (styles.blue, styles.green, styles.hotpink):
			</h2>
			<pre>
				<code>{JSON.stringify(combined, null, 2)}</code>
			</pre>
			<h2>
				Single className from style objects (styles.blue, styles.hotpink):
			</h2>
			<pre>
				<code>{JSON.stringify(className, null, 2)}</code>
			</pre>
		</React.StrictMode>
	);
}
