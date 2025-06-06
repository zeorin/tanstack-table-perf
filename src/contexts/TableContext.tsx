import { createContext } from "react"

import type { TableObserver } from "../observer"

export const TableContext = createContext<TableObserver<any> | null>(null)

TableContext.displayName = "TableContext"
