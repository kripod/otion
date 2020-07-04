export const STYLE_ELEMENT_ID = "__otion";

export function getStyleElement(): HTMLStyleElement {
	// Hydrate existing style element if available
	let el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
	if (el) return el;

	// Create a new one otherwise
	el = document.createElement("style");
	el.id = STYLE_ELEMENT_ID;

	return document.head.appendChild(el);
}
