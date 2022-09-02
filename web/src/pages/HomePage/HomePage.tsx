import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { ActionIcon, Text, TextInput } from '@mantine/core'
import { RiAddBoxFill, RiFilter2Fill, RiQrScanLine } from 'react-icons/ri'
import ItemGroupsCell from 'src/components/ItemGroup/ItemGroupsCell'

const HomePage = () => {
  const [searchValue, setSearchValue] = React.useState('')

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
        <ItemGroupsCell />
      </div>
    </>
  )
}

export default HomePage