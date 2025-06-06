import { faker } from "@faker-js/faker"
import { CssBaseline } from "@mui/material"
import { TableProvider } from "./providers/TableProvider"
import {
	createColumnHelper,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type ColumnDef,
} from "@tanstack/table-core"
import { Table } from "./components/Table"
import { RowActions } from "./components/RowActions"

interface Person {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: "active" | "stale"
	progress: number
}

const columnHelper = createColumnHelper<Person>()

faker.seed(42)

const createRandomPerson = (): Person => ({
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	age: faker.number.int({ min: 18, max: 65 }),
	visits: faker.number.int({ max: 20 }),
	status: faker.helpers.arrayElement(["active", "stale"]),
	progress: faker.number.int({ max: 100 }),
})

const createRandomPeople = (count: number): Person[] =>
	Array.from({ length: count }, () => createRandomPerson())

const data = createRandomPeople(10000)

const columns: ColumnDef<Person>[] = [
	// Display Column
	columnHelper.display({
		id: "actions",
		cell: ({ row }) => <RowActions row={row} />,
	}),
	// Grouping Column
	columnHelper.group({
		header: "Name",
		footer: (props) => props.column.id,
		columns: [
			// Accessor Column
			columnHelper.accessor("firstName", {
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			}),
			// Accessor Column
			columnHelper.accessor((row) => row.lastName, {
				id: "lastName",
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				footer: (props) => props.column.id,
			}),
		],
	}),
	// Grouping Column
	columnHelper.group({
		header: "Info",
		footer: (props) => props.column.id,
		columns: [
			// Accessor Column
			columnHelper.accessor("age", {
				header: () => "Age",
				footer: (props) => props.column.id,
			}),
			// Grouping Column
			columnHelper.group({
				header: "More Info",
				columns: [
					// Accessor Column
					columnHelper.accessor("visits", {
						header: () => <span>Visits</span>,
						footer: (props) => props.column.id,
					}),
					// Accessor Column
					columnHelper.accessor("status", {
						header: "Status",
						footer: (props) => props.column.id,
					}),
					// Accessor Column
					columnHelper.accessor("progress", {
						header: "Profile Progress",
						footer: (props) => props.column.id,
					}),
				],
			}),
		],
	}),
]

const rowModels = {
	getCoreRowModel: getCoreRowModel<Person>(),
	getExpandedRowModel: getExpandedRowModel<Person>(),
	getFacetedMinMaxValues: getFacetedMinMaxValues<Person>(),
	getFacetedRowModel: getFacetedRowModel<Person>(),
	getFacetedUniqueValues: getFacetedUniqueValues<Person>(),
	getFilteredRowModel: getFilteredRowModel<Person>(),
	getGroupedRowModel: getGroupedRowModel<Person>(),
	// getPaginationRowModel: getPaginationRowModel<Person>(),
	getSortedRowModel: getSortedRowModel<Person>(),
}

export const App = () => (
	<CssBaseline>
		<TableProvider
			{...{
				...rowModels,
				columns,
				data,
			}}
		>
			<Table />
		</TableProvider>
	</CssBaseline>
)
