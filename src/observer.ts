import {
	createTable,
	type RowData,
	type Table,
	type TableOptions,
	type TableOptionsResolved,
	type TableState,
} from "@tanstack/table-core"

export class TableObserver<TData extends RowData> {
	#table: Table<TData>
	#state: TableState
	#snapshot: { table: Table<TData> } & TableState
	#listeners = new Set<() => void>()

	constructor(options: TableOptions<TData>) {
		const resolvedOptions: TableOptionsResolved<TData> = {
			state: {}, // Dummy state
			onStateChange: () => {}, // noop
			renderFallbackValue: null,
			...options,
		}

		this.#table = createTable<TData>(resolvedOptions)
		this.#state = this.#table.initialState
		this.#snapshot = { table: this.#table, ...this.#table.initialState }
		this.setOptions(options)
	}

	#setState(
		updater:
			| Partial<TableState>
			| ((state: TableState) => Partial<TableState>)
			| undefined,
	) {
		if (updater === undefined) {
			return
		}

		this.#state = {
			...this.#state,
			...(typeof updater === "function" ? updater(this.#state) : updater),
		}

		this.#table.setOptions((prev) => ({
			...prev,
			state: this.#state,
		}))

		this.#snapshot = {
			table: this.#table,
			...this.#table.getState(),
		}

		for (const listener of this.#listeners) {
			listener()
		}
	}

	setOptions(options: TableOptions<TData>) {
		this.#table.setOptions((prev) => ({
			...prev,
			...options,
			// Similarly, we'll maintain both our internal state and any user-provided
			// state.
			state: {
				...this.#state,
				...options.state,
			},
			onStateChange: (updater) => {
				this.#setState(updater)
				options.onStateChange?.(updater)
			},
		}))
	}

	subscribe(listener: () => void) {
		this.#listeners.add(listener)
		return () => {
			this.#listeners.delete(listener)
		}
	}

	getSnapshot() {
		return this.#snapshot
	}
}
