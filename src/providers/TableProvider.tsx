import { useEffect, useState } from "react"
import type { RowData, TableOptions } from "@tanstack/table-core"
import { TableObserver } from "../observer"
import { TableContext } from "../contexts/TableContext"

export const TableProvider = <TData extends RowData>({
	children,
	...options
}: TableOptions<TData> & { children?: React.ReactNode }) => {
	const [observer] = useState(() => new TableObserver(options))

	useEffect(() => {
		observer.setOptions(options)
	}, [observer, options])

	return <TableContext value={observer}>{children}</TableContext>
}
