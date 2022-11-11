import { MetaTags } from '@redwoodjs/web'
import SummariesCell from 'src/components/Summary/SummariesCell'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <SummariesCell />
    </>
  )
}

export default HomePage
