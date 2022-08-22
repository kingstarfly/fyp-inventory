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
import { ActionIcon, Text, TextInput } from '@mantine/core'
import { RiAddBoxFill, RiFilter2Fill, RiQrScanLine } from 'react-icons/ri'

const HomePage = () => {
  const [searchValue, setSearchValue] = React.useState('')
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
            // <p>Item</p>
            <InventoryRowItemDetails {...details.getValue()} />
          ),
          header: () => <span>Item</span>,
        }
      ),
      columnHelper.accessor('quantity', {
        cell: (info) => info.getValue(),
        header: () => <span>Qty</span>,
        size: 50,
      }),
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(200))
  const refreshData = () => setData(() => makeData(200))

  /* For Table */
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
      <Text size="md" weight="bold">
        Inventory
      </Text>
      <div className="flex flex-row items-center justify-between w-full my-4">
        <TextInput
          size="xs"
          placeholder="Search name, barcode, category..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          aria-label="search"
          variant="filled"
          className="flex-1"
        />
        <div className="flex flex-row items-center justify-end">
          <ActionIcon className="mx-2 text-slate-800">
            <div className="flex flex-col items-center justify-center ">
              <RiQrScanLine />
              <label className="text-xs cursor-pointer">Scan</label>
            </div>
          </ActionIcon>

          <ActionIcon className="mx-2 text-slate-800">
            <div className="flex flex-col items-center justify-center">
              <RiFilter2Fill />
              <label className="text-xs cursor-pointer">Filter</label>
            </div>
          </ActionIcon>

          <ActionIcon className="ml-2 text-slate-800">
            <div className="flex flex-col items-center justify-center">
              <RiAddBoxFill />
              <label className="text-xs cursor-pointer">New</label>
            </div>
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col">
        <div ref={tableContainerRef} className="h-[60vh] overflow-auto">
          <table className="relative w-full border-collapse border-none table-fixed">
            <thead className="border-b-2 border-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        className="pb-4 text-left "
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