import { css, keyframes } from "otion";
import * as React from "react";

const pulse = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
});

export default function IndexPage(): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const unusedElement = ( // lgtm [js/unused-local-variable]
		<div
			className={css({
				content: `"This text shouldn't appear in the SSR-collected style sheet."`,
			})}
		/>
	);

	return (
		<React.StrictMode>
			<h1>Hello, world!</h1>
			<p
				className={css({
					color: "green",
					fontWeight: "bold",
					fontSize: 30,
					textEmphasis: "filled   red",
					animation: `${pulse} 3s infinite alternate`,
					paddingLeft: 16,
					paddingRight: 24,
					padding: 8,

					selectors: {
						"& > * + *": {
							// These are only to be observed in developer tools
							paddingLeft: 48,
							color: "teal",
						},
						"  &:focus ,  &:active": {
							outline: "solid",
						},
					},

					":hover": {
						padding: 32,
					},

					"@media": {
						" (min-width:  \n600px)   ": {
							":hover": {
								color: "palevioletred  ",
								background: "papayawhip",
							},
						},

						"(min-width:1024px)": {
							"@supports": {
								"  (  display:  grid  )  ": {
									display: ["float", "flex", "grid"],
								},
							},
						},
					},
				})}
			>
				This is some long dummy text to demonstrate the styling capabilities
				provided by the underlying library.
			</p>

			<div
				className={css({
					"@media": {
						"(min-width: 2px)": { color: "green" },
					},
				})}
			/>
			<p
				className={css({
					"@media": {
						"(min-width: 1px)": { color: "red" },
						"(min-width: 2px)": { color: "green" },
					},
				})}
			>
				Conditional rule precedence management test #1, should be green
			</p>
			<p
				className={css({
					color: "red",
					"@media": {
						"(min-width: 2px)": { color: "green" },
					},
				})}
			>
				Conditional rule precedence management test #2, should be green
			</p>
		</React.StrictMode>
	);
}
