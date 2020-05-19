import { css, keyframes } from "otion";
import * as React from "react";

const pulse = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
});

export default function Home(): JSX.Element {
	return (
		<>
			<p className={css({ color: "blue" })}>I am blue</p>
			<p
				className={css({
					color: "blue",
					":hover": {
						animation: `${pulse} 3s infinite alternate`,
					},
				})}
			>
				I am also blue, reusing the CSS class injected by my sibling
			</p>
		</>
	);
}
