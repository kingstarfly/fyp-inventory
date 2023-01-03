import React from 'react'

import { ActionIcon, Image, Popover } from '@mantine/core'
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
import { TbEye, TbSearch } from 'react-icons/tb'
import { GetItemSummaries } from 'types/graphql'

import { CellSuccessProps } from '@redwoodjs/web'

import DebouncedInput from '../DebouncedInput/DebouncedInput'
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
        accessorFn: (row) => row.qtyFaulty,
        id: 'qtyWriteOff',
        header: 'Write-off',
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
                  <Image
                    src={imgUrl}
                    width={200}
                    height={200}
                    withPlaceholder
                  />
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
      <div className="my-4 flex w-full flex-row items-center justify-between">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg w-1/3 rounded-sm border bg-white p-2 shadow-md"
          placeholder="Search item name..."
          icon={<TbSearch size={16} />}
        />
      </div>
      <div className="h-2" />
      <div className="my-6 overflow-x-scroll rounded-lg shadow-xl">
        <table className="w-full min-w-max text-xs md:text-base">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-slate-200 uppercase text-slate-700 md:text-sm"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-5 text-left tracking-wider"
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
                <tr key={row.id} className="border-b border-slate-200 bg-white">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4 py-3 ">
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
      </div>

      <div className="h-2" />

      <div className="md:text-md flex flex-wrap items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="rounded border p-1"
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
              className="w-16 rounded border p-1"
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
