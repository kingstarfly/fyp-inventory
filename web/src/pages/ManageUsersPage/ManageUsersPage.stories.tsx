import type { ComponentMeta } from '@storybook/react'

import ManageUsersPage from './ManageUsersPage'

export const generated = () => {
  return <ManageUsersPage />
}

export default {
  title: 'Pages/ManageUsersPage',
  component: ManageUsersPage,
} as ComponentMeta<typeof ManageUsersPage>
