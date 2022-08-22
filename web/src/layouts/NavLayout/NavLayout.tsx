import { Button, Text } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
type NavLayoutProps = {
  children?: React.ReactNode
}

const NavLayout = ({ children }: NavLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <header className="px-4 border-b-2">
        <div className="flex items-center justify-between">
          {' '}
          <h1>IMS</h1>
          {isAuthenticated ? (
            <div className="flex flex-row items-center text-xs">
              <Text size="xs">{currentUser.email}</Text>{' '}
              <button
                className="p-2 ml-2 bg-blue-200 rounded-md"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
      </header>
      <div className="py-2 mx-4">{children}</div>
    </>
  )
}

export default NavLayout
