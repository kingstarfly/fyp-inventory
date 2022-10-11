import { Anchor, Button, Menu, Text } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { TbTableExport } from 'react-icons/tb'

type NavLayoutProps = {
  children?: React.ReactNode
}

const NavLayout = ({ children }: NavLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="border-b-2 px-4">
        <div className="flex items-center justify-between">
          <h1 className="m-0 font-semibold">
            <Link to={routes.home()}>IMS</Link>
          </h1>

          {isAuthenticated ? (
            <div className="flex flex-row items-center text-xs">
              <Text size="xs">{currentUser.email}</Text>{' '}
              <Button
                // variant="light"
                color="dark.5"
                mx="md"
                onClick={logOut}
              >
                Logout
              </Button>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button color="dark.5">More</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    icon={<TbTableExport size={14} />}
                    component="a"
                    href="/export"
                    target="_blank"
                  >
                    Export All to CSV
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
      </header>
      <div className="mx-4 py-2">{children}</div>
    </>
  )
}

export default NavLayout
