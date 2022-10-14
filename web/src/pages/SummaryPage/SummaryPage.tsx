import { MetaTags } from '@redwoodjs/web'
import SummariesCell from 'src/components/Summary/SummariesCell'
const SummaryPage = () => {
  return (
    <>
      <MetaTags title="Summary" description="Summary page" />

      <h1>SummaryPage</h1>
      <SummariesCell />
    </>
  )
}

export default SummaryPage
