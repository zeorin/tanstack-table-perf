import { use } from "react"
import invariant from "tiny-invariant"
import { TableContext } from "../contexts/TableContext"
import type { RowData, Table, TableState } from "@tanstack/table-core"
import { identity, isShallowEqual } from "remeda"

import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector"

import type { TableObserver } from "../observer"

export function useTable<
	const TData extends RowData = RowData,
	const Selected = TableState & { table: Table<TData> },
>(
	selector?: (state: TableState & { table: Table<TData> }) => Selected,
	isEqual?: NoInfer<(a: Selected, b: Selected) => boolean>,
): Selected {
	const observer = use<TableObserver<TData> | null>(TableContext)

	invariant(observer)

	const subscribe = (onStoreChange: () => void) =>
		observer.subscribe(onStoreChange)

	const getSnapshot = () => observer.getSnapshot()

	return useSyncExternalStoreWithSelector(
		subscribe,
		getSnapshot,
		null,
		selector ?? identity,
		isEqual ?? isShallowEqual,
	)
}
