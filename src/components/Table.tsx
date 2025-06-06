import * as Mui from "@mui/material"

import * as R from "remeda"

import type * as T from "@tanstack/table-core"
import { flexRender } from "@tanstack/react-table"

import { useTable } from "../hooks/use-table"

interface HeaderProps extends Omit<Mui.TableCellProps, "children"> {
	header: T.Header<T.RowData, unknown>
	tableSize?: "medium" | "small" | undefined
}

/**
 * Renders a header
 */
const Header = ({ header, tableSize, ...props }: HeaderProps) => {
	const { canSort, isSorted } = useTable(() => ({
		canSort: header.column.getCanSort(),
		isSorted: header.column.getIsSorted(),
	}))

	const { colSpan } = header

	const toggleSortingHandler = header.column.getToggleSortingHandler()

	return (
		<Mui.TableCell {...props} {...(colSpan && { colSpan })}>
			{header.isPlaceholder ?
				null
			: canSort ?
				<Mui.TableSortLabel
					active={isSorted !== false}
					{...(isSorted !== false && { direction: isSorted })}
					onClick={toggleSortingHandler}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</Mui.TableSortLabel>
			:	flexRender(header.column.columnDef.header, header.getContext())}
		</Mui.TableCell>
	)
}

interface HeaderGroupProps extends Omit<Mui.TableRowProps, "children"> {
	headerGroup: T.HeaderGroup<T.RowData>
	tableSize?: "medium" | "small" | undefined
}

/**
 * Renders a header group
 */
const HeaderGroup = ({ headerGroup, ...props }: HeaderGroupProps) => (
	<Mui.TableRow {...props}>
		{headerGroup.headers.map((header) => (
			<Header key={header.id} header={header} />
		))}
	</Mui.TableRow>
)

interface CellProps extends Omit<Mui.TableCellProps, "children"> {
	cell: T.Cell<T.RowData, unknown>
}

/**
 * Renders a cell
 */
const Cell = ({ cell, ...props }: CellProps) => {
	const { isPlaceholder } = useTable(() => ({
		isPlaceholder: cell.getIsPlaceholder(),
	}))

	return (
		<Mui.TableCell {...props}>
			{isPlaceholder ? null : (
				flexRender(cell.column.columnDef.cell, cell.getContext())
			)}
		</Mui.TableCell>
	)
}

interface RowProps extends Omit<Mui.TableRowProps, "children"> {
	row: T.Row<T.RowData>
	scrollDelta?: number | false | undefined
}

/**
 * Renders a row
 */
const Row = ({ row, scrollDelta, ...props }: RowProps) => {
	const { isSelected, visibleCells } = useTable(() => ({
		isSelected: row.getIsSelected(),
		visibleCells: row.getVisibleCells(),
	}))

	return (
		<Mui.TableRow hover {...props} selected={isSelected}>
			{visibleCells.map((cell) => (
				<Cell key={cell.id} cell={cell} />
			))}
		</Mui.TableRow>
	)
}

const areRowsEqual = (prev: T.Row<T.RowData>[], next: T.Row<T.RowData>[]) =>
	R.isShallowEqual(prev.map(R.prop("original")), next.map(R.prop("original")))

const useTableRows = () =>
	useTable<T.RowData, T.Row<T.RowData>[]>(
		({ table }) => table.getRowModel().rows,
		areRowsEqual,
	)

const TableBody = (props: Mui.TableBodyProps) => {
	const rows = useTableRows()
	return (
		<Mui.TableBody {...props}>
			{rows.map((row) => (
				<Row key={`${row.depth}.${row.id}`} row={row} />
			))}
		</Mui.TableBody>
	)
}

const Tableʹ = ({ ref }: { ref?: React.ForwardedRef<HTMLDivElement> }) => {
	const { headerGroups } = useTable(({ table }) => ({
		empty: table.getRowModel().rows.length === 0,
		headerGroups: table.getHeaderGroups(),
		visibleLeafColumns: table.getVisibleLeafColumns(),
	}))

	return (
		<Mui.TableContainer ref={ref}>
			<Mui.Table stickyHeader>
				<Mui.TableHead>
					{headerGroups.map((headerGroup) => (
						<HeaderGroup key={headerGroup.id} headerGroup={headerGroup} />
					))}
				</Mui.TableHead>
				<TableBody />
			</Mui.Table>
		</Mui.TableContainer>
	)
}

export { Tableʹ as Table }
