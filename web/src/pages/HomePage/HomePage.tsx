import { MetaTags } from '@redwoodjs/web'
import ItemsCell from 'src/components/Item/ItemsCell'
// TODO: Add new page to show summaries of all items. /summary. Also add ability to export.
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ItemsCell />
    </>
  )
}

export default HomePage
