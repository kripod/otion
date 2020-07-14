import { css, keyframes } from "otion";
import * as React from "react";

import logo from "./logo.svg";

const app = css({ textAlign: "center" });

const logoSpin = keyframes({
	from: { transform: "rotate(0deg)" },
	to: { transform: "rotate(360deg)" },
});

const appLogo = css({
	height: "40vmin",
	pointerEvents: "none",
	animation: `${logoSpin} infinite 20s linear`,
});

const appHeader = css({
	backgroundColor: "#282c34",
	minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "calc(10px + 2vmin)",
	color: "white",
});

const appLink = css({ color: "#61dafb" });

function App(): JSX.Element {
	return (
		<div className={app}>
			<header className={appHeader}>
				<img src={logo} className={appLogo} alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className={appLink}
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

export default App;
