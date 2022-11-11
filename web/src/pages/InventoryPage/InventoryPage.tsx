import { MetaTags } from '@redwoodjs/web'
import ItemsCell from 'src/components/Item/ItemsCell'

const InventoryPage = () => {
  return (
    <>
      <MetaTags title="Inventory" description="Inventory page" />

      <ItemsCell />
    </>
  )
}

export default InventoryPage
