import humanize from 'humanize-string'
import { Link, routes } from '@redwoodjs/router'
import { CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Item/ItemsCell'
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
import ItemsCell from 'src/components/Item/ItemsCell'
import { faker } from '@faker-js/faker'
import { FindItems } from 'types/graphql'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ItemsList = ({ items }) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [data, setData] = React.useState(() => makeData(200))
  const refreshData = () => setData(() => makeData(200))

  const columnHelper = createColumnHelper<CellSuccessProps<FindItems>>()
  const columns = React.useMemo<ColumnDef<CellSuccessProps<FindItems>>[]>(
    () => [
      columnHelper.accessor(
        ({
          id,
          itemStatus,
          thumbnailUrl,
          block,
          floorSection,
          room,
          subIndex,
          loan,
          loanHistory,
        }) => ({
          id,
          itemStatus,
          thumbnailUrl,
          block,
          floorSection,
          room,
          subIndex,
          loan,
          loanHistory,
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
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
    }
  }

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
    // <div className="rw-segment rw-table-wrapper-responsive">
    //   <table className="rw-table">
    //     <thead>
    //       <tr>
    //         <th>Image</th>
    //         <th>Name</th>
    //         <th>Category</th>
    //         <th>Description</th>
    //         <th>&nbsp;</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {items.map((item) => (
    //         <tr key={item.id}>
    //           <td>
    //             <div className="flex flex-row items-stretch h-12 mr-4">
    //               <div
    //                 className={`${
    //                   status === 'available' ? 'bg-green-400' : 'bg-red-400'
    //                 } my-1 mr-2 rounded-xl pl-0.5`}
    //               />
    //               <div className="z-0 w-12 h-12 my-auto">
    //                 <Image
    //                   src={item.thumbnailUrl}
    //                   radius="md"
    //                   withPlaceholder
    //                   style={{ zIndex: 0 }}
    //                 />
    //               </div>
    //             </div>
    //           </td>
    //           <td>{truncate(item.name)}</td>
    //           <td>{truncate(item.category)}</td>
    //           <td>{truncate(item.description)}</td>
    //           <td>
    //             <nav className="rw-table-actions">
    //               <Link
    //                 to={routes.item({ id: item.id })}
    //                 title={'Show item ' + item.id + ' detail'}
    //                 className="rw-button rw-button-small"
    //               >
    //                 Show
    //               </Link>
    //               <Link
    //                 to={routes.editItem({ id: item.id })}
    //                 title={'Edit item ' + item.id}
    //                 className="rw-button rw-button-small rw-button-blue"
    //               >
    //                 Edit
    //               </Link>
    //               <button
    //                 type="button"
    //                 title={'Delete item ' + item.id}
    //                 className="rw-button rw-button-small rw-button-red"
    //                 onClick={() => onDeleteClick(item.id)}
    //               >
    //                 Delete
    //               </button>
    //             </nav>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  )
}

export default ItemsList

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
