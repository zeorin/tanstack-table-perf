import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"
import { defineConfig } from "eslint/config"

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.strictTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	pluginReact.configs.flat.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: { "react-hooks": reactHooks },
		rules: {
			"react-hooks/react-compiler": [
				"error",
				{
					reportableLevels: new Set([
						"InvalidJS",
						"InvalidReact",
						"InvalidConfig",
						"CannotPreserveMemoization",
						"Todo",
						"Invariant",
					]),
				},
			],
		},
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		...jsxA11y.flatConfigs.strict,
	},
])
