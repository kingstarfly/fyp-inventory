import { MetaTags } from '@redwoodjs/web'
import ItemsCell from 'src/components/Item/ItemsCell'

const HomePage = () => {
  // TODO: Add a button to "Export all to CSV"
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ItemsCell />
    </>
  )
}

export default HomePage
