import { MetaTags } from '@redwoodjs/web'
import PrintLabelsCell from 'src/components/PrintLabelsCell/PrintLabelsCell'

const PrintLabelsPage = () => {
  return (
    <>
      <MetaTags title="PrintLabels" description="PrintLabels page" />
      <PrintLabelsCell />
    </>
  )
}

export default PrintLabelsPage
