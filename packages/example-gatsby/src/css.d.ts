import "csstype";

declare module "csstype" {
	interface PropertiesFallback {
		// Add a custom property
		"--text-color"?: "red" | "green";
	}
}
