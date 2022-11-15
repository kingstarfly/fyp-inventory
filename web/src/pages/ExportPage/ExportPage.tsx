import { MetaTags } from '@redwoodjs/web'

import ExportCell from 'src/components/ExportCell'

const ExportPage = () => {
  return (
    <>
      <MetaTags title="Export" description="Export page" />

      <ExportCell />
    </>
  )
}

export default ExportPage
