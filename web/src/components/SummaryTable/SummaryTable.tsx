import React from 'react'
import { TbEye } from 'react-icons/tb'
import { GetItemSummaries } from 'types/graphql'

import { ActionIcon, Popover, TextInput } from '@mantine/core'
import { CellSuccessProps } from '@redwoodjs/web'
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import {
  Column,
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import { ItemSummaryRow } from '../Summary/SummariesCell'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const SummaryTable = ({
  itemSummaries,
}: CellSuccessProps<GetItemSummaries>) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columns = React.useMemo<ColumnDef<ItemSummaryRow, any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.qtyAvailable,
        id: 'qtyAvailable',
        header: 'Available',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },

      {
        accessorFn: (row) => row.qtyReserved,
        id: 'qtyReserved',
        header: 'Reserved',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.qtyLoaned,
        id: 'qtyLoaned',
        header: 'Loaned',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.qtyFaulty,
        id: 'qtyFaulty',
        header: 'Faulty',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.qtyTotal,
        id: 'qtyTotal',
        header: 'Total',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.imgUrl,
        id: 'imgUrl',
        cell: (info) => {
          const imgUrl = info.getValue()
          if (imgUrl) {
            return (
              <Popover position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon variant="subtle">
                    <TbEye size={16} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <img src={imgUrl} width={500} height={500} />
                </Popover.Dropdown>
              </Popover>
            )
          }
          return null
        },
        header: 'Image',
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
    ],

    []
  )
  const table = useReactTable<ItemSummaryRow>({
    data: itemSummaries,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  return (
    <div className="p-2">
      <div className="flex flex-row items-center justify-between w-full my-4">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 border shadow font-lg border-block"
          placeholder="Search item name..."
        />
      </div>
      <div className="h-2" />
      <table className="w-full text-xs border-separate border-spacing-y-3 md:text-base">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-2 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <>
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
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-2 ">
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
        </tbody>
      </table>

      <div className="h-2" />

      <div className="flex flex-wrap items-center justify-between text-xs md:text-md">
        <div className="flex items-center gap-2">
          <button
            className="p-1 border rounded"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="p-1 border rounded"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong className="whitespace-nowrap">
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="w-16 p-1 border rounded"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-4" />

      {/* To remove outside of debugging */}
      {/* <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  )
}

export default SummaryTable

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border rounded shadow"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border rounded shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onFocus={() => column.setFilterValue('')}
        onChange={(value) => {
          column.setFilterValue(value)
        }}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="border rounded shadow w-36"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <TextInput
      {...props}
      size="xs"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      aria-label="search"
      variant="filled"
      className="flex-1"
    />
  )
}
