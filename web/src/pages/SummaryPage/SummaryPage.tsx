import { Title } from '@mantine/core'
import { MetaTags } from '@redwoodjs/web'
import SummariesCell from 'src/components/Summary/SummariesCell'
const SummaryPage = () => {
  return (
    <>
      <MetaTags title="Summary" description="Summary page" />

      <SummariesCell />
    </>
  )
}

export default SummaryPage
