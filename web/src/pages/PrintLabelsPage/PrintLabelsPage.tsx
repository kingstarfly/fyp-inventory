import { TransferList } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import PrintLabelsCell from 'src/components/PrintLabelsCell/PrintLabelsCell'

const PrintLabelsPage = () => {
  return (
    <>
      <MetaTags title="PrintLabels" description="PrintLabels page" />

      <h1>PrintLabelsPage</h1>
      <PrintLabelsCell />
    </>
  )
}

export default PrintLabelsPage
