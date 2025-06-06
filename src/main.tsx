import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
