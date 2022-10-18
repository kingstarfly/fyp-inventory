import { Title } from '@mantine/core'
import { MetaTags } from '@redwoodjs/web'
import ItemsCell from 'src/components/Item/ItemsCell'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <ItemsCell />
    </>
  )
}

export default HomePage
