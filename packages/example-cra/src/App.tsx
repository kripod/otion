import { css, keyframes } from "otion";
import React from "react";

import logo from "./logo.svg";

const spin = keyframes({
	from: { transform: "rotate(0deg)" },
	to: { transform: "rotate(360deg)" },
});

export default function App(): JSX.Element {
	return (
		<div className={css({ textAlign: "center" })}>
			<header
				className={css({
					backgroundColor: "#282c34",
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "calc(10px + 2vmin)",
					color: "white",
				})}
			>
				<img
					src={logo}
					className={css({
						height: "40vmin",
						pointerEvents: "none",
						animation: `${spin} infinite 20s linear`,
						"@media": {
							"(prefers-reduced-motion: reduce)": {
								animation: "none",
							},
						},
					})}
					alt="logo"
				/>
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className={css({ color: "#61dafb" })}
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}
