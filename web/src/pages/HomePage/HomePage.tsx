import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { faker } from '@faker-js/faker'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
import InventoryRowItemDetails from 'src/components/InventoryRowItemDetails/InventoryRowItemDetails'

const HomePage = () => {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<InventoryItemRow>()

  const columns = React.useMemo<ColumnDef<InventoryItemRow>[]>(
    () => [
      columnHelper.accessor(
        ({ status, thumbnail, name, storageLocationString, category }) => ({
          status,
          thumbnail,
          name,
          storageLocationString,
          category,
        }),
        {
          id: 'item',
          cell: (details) => (
            <InventoryRowItemDetails {...details.getValue()} />
          ),
          header: () => <span>Item</span>,
        }
      ),
      columnHelper.accessor('quantity', {
        cell: (info) => info.getValue(),
        header: () => <span>Quantity</span>,
      }),
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(200))
  const refreshData = () => setData(() => makeData(200))

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="p-6">
        <div ref={tableContainerRef} className="h-64 overflow-auto">
          <table className="w-full border-collapse table-fixed border-spacing-0">
            <thead className="border-b-2 border-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        className="sticky top-0 text-left bg-white"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<InventoryItemRow>
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => rerender()}>Force Rerender</button>
        </div>
        <div>
          <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
      </div>
    </>
  )
}

export default HomePage

export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  createdAt: Date
}

export type InventoryItemRow = {
  id: number
  status: 'available' | 'on loan' | 'in use' | 'under repair' | 'deprecated'
  thumbnail: string
  name: string
  category: 'Inventory' | 'Asset'
  storageLocationString: string
  quantity: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newInventoryItemRow = (index: number): InventoryItemRow => {
  return {
    id: index + 1,
    status: faker.helpers.shuffle<InventoryItemRow['status']>([
      'available',
      'on loan',
      'in use',
      'under repair',
      'deprecated',
    ])[0],
    thumbnail: faker.image.imageUrl(100, 100),
    name: faker.commerce.productName(),
    // Randomly choose between Inventory and Asset using faker.helpers.shuffle
    category: faker.helpers.shuffle<InventoryItemRow['category']>([
      'Inventory',
      'Asset',
    ])[0],
    // Generate regex of this format "24B-02-23-01"
    storageLocationString: faker.helpers.regexpStyleStringParse(
      '[12-150]-0[1-5]-[1-25]-0[1-5]'
    ),
    quantity: faker.datatype.number({ min: 1, max: 250 }),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): InventoryItemRow[] => {
    const len = lens[depth]!
    return range(len).map((d): InventoryItemRow => {
      return {
        ...newInventoryItemRow(d),
      }
    })
  }

  return makeDataLevel()
}