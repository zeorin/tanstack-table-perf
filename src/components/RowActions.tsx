import type { CellContext, RowData } from "@tanstack/table-core"
import { useTable } from "../hooks/use-table"
import { Checkbox, Tooltip } from "@mui/material"

export const RowActions = <TData extends RowData, TValue>({
	row,
}: {
	row: CellContext<TData, TValue>["row"]
}) => {
	const { canSelect, isSelected } = useTable(() => ({
		canSelect: row.getCanSelect(),
		isSelected: row.getIsSelected(),
	}))

	const toggleSelectedHandler = row.getToggleSelectedHandler()

	return (
		canSelect && (
			<Tooltip title={isSelected ? "Unselect" : "Select"}>
				<Checkbox checked={isSelected} onChange={toggleSelectedHandler} />
			</Tooltip>
		)
	)
}
