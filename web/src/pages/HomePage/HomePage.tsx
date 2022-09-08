import { MetaTags } from '@redwoodjs/web'
import { Text } from '@mantine/core'
import ItemsCell from 'src/components/Item/ItemsCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Text size="md" weight="bold">
        Inventory
      </Text>

      <div className="flex flex-col">
        <ItemsCell />
      </div>
    </>
  )
}

export default HomePage
