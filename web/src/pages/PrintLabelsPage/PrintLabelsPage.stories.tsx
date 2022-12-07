import type { ComponentMeta } from '@storybook/react'

import PrintLabelsPage from './PrintLabelsPage'

export const generated = () => {
  return <PrintLabelsPage />
}

export default {
  title: 'Pages/PrintLabelsPage',
  component: PrintLabelsPage,
} as ComponentMeta<typeof PrintLabelsPage>
