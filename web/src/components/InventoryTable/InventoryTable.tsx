import React from 'react'
import { RiAddBoxFill, RiQrScanLine } from 'react-icons/ri'
import { TbSearch } from 'react-icons/tb'
import { capitalize } from 'src/library/display-names'
import { FindItems } from 'types/graphql'
import { CSVLink } from 'react-csv'

import {
  ActionIcon,
  Anchor,
  Badge,
  BadgeProps,
  Button,
  clsx,
  Menu,
} from '@mantine/core'
import { navigate, routes } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import DebouncedInput from '../DebouncedInput/DebouncedInput'
import { ItemRow } from '../Item/ItemsCell'
import QrScanModal from '../QrScanModal/QrScanModal'
import { getLocationString } from './helper'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import dayjs from 'dayjs'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const DELETE_ITEMS_MUTATION = gql`
  mutation DeleteItemsMutation($ids: [Int!]!) {
    deleteItems(ids: $ids)
  }
`
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

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const InventoryTable = ({ items, refetch }: CellSuccessProps<FindItems>) => {
  const [modalOpened, setModalOpened] = React.useState(false)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columns = React.useMemo<ColumnDef<ItemRow, any>[]>(
    () => [
      {
        id: 'select',
        enableHiding: true,
        header: ({ table }) => (
          <div className="flex justify-left">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-left">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorFn: (row) => row.id,
        id: 'id',
        header: () => 'ID',
        size: 50,
      },

      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => getLocationString(row),
        id: 'location',
        header: 'Location',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => capitalize(row.assetType),
        id: 'assetType',
        header: 'Asset Type',
      },
      {
        accessorFn: (row) => row.itemStatus,
        cell: (info) => <StatusBadge status={info.getValue()} />,
        id: 'status',
        header: 'Status',
      },
    ],

    []
  )
  const table = useReactTable<ItemRow>({
    data: items,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },

    // Select column is initially hidden
    initialState: {
      columnVisibility: {
        select: false,
      },
    },
    onColumnFiltersChange: setColumnFilters,
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

  const [deleteItems] = useMutation(DELETE_ITEMS_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
      refetch()
      table.resetRowSelection()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteItemsClick = () => {
    if (
      confirm(
        `Are you sure you want to delete the ${
          Object.keys(table.getState().rowSelection).length
        } selected items?`
      )
    ) {
      deleteItems({
        variables: {
          ids: table.getSelectedRowModel().rows.map((row) => row.original.id),
        },
      })
    }
  }

  return (
    <div className="p-2">
      <QrScanModal opened={modalOpened} onClose={() => setModalOpened(false)} />

      <div className="my-4 flex w-full flex-row items-center gap-4">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg w-5/6 rounded-sm border bg-white p-2 shadow-md sm:w-1/3"
          placeholder="Search all columns..."
          icon={<TbSearch size={16} />}
        />
        <div className="flex flex-row items-center gap-2">
          <ActionIcon size={40} onClick={() => setModalOpened(true)}>
            <div className="flex flex-col items-center justify-center text-slate-800">
              <RiQrScanLine size={24} />
              <label className="cursor-pointer text-xs">Scan</label>
            </div>
          </ActionIcon>
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon size={40}>
                <div className="flex flex-col items-center justify-center text-slate-800">
                  <RiAddBoxFill size={24} />
                  <label className="cursor-pointer text-xs">New</label>
                </div>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate(routes.newItem())}>
                Item
              </Menu.Item>
              <Menu.Item onClick={() => navigate(routes.newLocation())}>
                Location
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
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
                            className={clsx(
                              'mb-2 align-text-top',
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : ''
                            )}
                            onClick={header.column.getToggleSortingHandler()}
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
                            <Filter column={header.column} table={table} />
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
              const isManaging = table.getColumn('select').getIsVisible()
              return (
                <tr
                  key={row.id}
                  onClick={() => {
                    if (!isManaging) {
                      navigate(routes.item({ id: `${row.original.id}` }))
                    }
                  }}
                  className={clsx(
                    !isManaging && 'cursor-pointer',
                    'border-b border-slate-200 bg-white hover:bg-slate-100'
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4 py-3">
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

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Button
            color="dark.7"
            onClick={() => {
              table.getColumn('select').toggleVisibility()
            }}
          >
            {table.getColumn('select').getIsVisible() ? 'Done' : 'Manage'}
          </Button>

          {
            // Get number of selected rows
            Object.keys(table.getState().rowSelection).length > 0 && (
              <Button
                color="red.8"
                onClick={() => {
                  onDeleteItemsClick()
                }}
              >
                Delete
              </Button>
            )
          }
        </div>
        <Anchor
          component={CSVLink}
          underline
          data={items}
          filename={dayjs().toISOString() + '.csv'}
        >
          Export to CSV
        </Anchor>
      </div>

      {/* To remove outside of debugging */}
      {/* <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  )
}

export default InventoryTable

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
        className="w-1/2 px-1 border rounded shadow"
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
        className="w-1/2 px-1 border rounded shadow"
      />
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
        className="w-full px-1 border rounded shadow"
        list={column.id + 'list'}
      />
    </>
  )
}

export function StatusBadge({ status }: { status: string }) {
  // Depending on the status, we can return a different badge
  // Status can be: 'available', 'loaned', 'reserved', 'faulty', 'write-off',
  // Define a type where the key is the status and the value is the gradient

  const gradients: {
    [key: string]: BadgeProps['gradient']
  } = {
    available: { from: 'teal.6', to: 'teal.8', deg: 135 },
    loaned: { from: 'yellow.6', to: 'yellow.8', deg: 135 },
    reserved: { from: 'indigo.4', to: 'indigo.8', deg: 135 },
    faulty: { from: 'red.5', to: 'red.8', deg: 135 },
    'write-off': { from: 'gray.6', to: 'gray.8', deg: 135 },
  }

  return (
    <Badge variant="gradient" gradient={gradients[status]}>
      {capitalize(status)}
    </Badge>
  )
}
