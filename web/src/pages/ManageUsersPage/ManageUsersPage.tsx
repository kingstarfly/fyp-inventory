import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

// TODO: Flesh out this page - Button to Create New User, Button to Modify User Roles.
const ManageUsersPage = () => {
  return (
    <>
      <MetaTags title="ManageUsers" description="ManageUsers page" />

      <h1>ManageUsersPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ManageUsersPage/ManageUsersPage.tsx</code>
      </p>
      <p>
        My default route is named <code>manageUsers</code>, link to me with `
        <Link to={routes.manageUsers()}>ManageUsers</Link>`
      </p>
    </>
  )
}

export default ManageUsersPage
