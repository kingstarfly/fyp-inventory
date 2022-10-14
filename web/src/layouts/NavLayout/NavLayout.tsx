import {
  Anchor,
  Button,
  Divider,
  Drawer,
  Group,
  Menu,
  Navbar,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { TbLayoutDashboard, TbTable, TbTableExport } from 'react-icons/tb'
import NavBarButton from 'src/components/NavBarButton/NavBarButton'

type NavLayoutProps = {
  children?: React.ReactNode
}

const NavLayout = ({ children }: NavLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [drawerOpened, setDrawerOpened] = React.useState(false)
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
              <Button color="dark.5" onClick={() => setDrawerOpened(true)}>
                More
              </Button>
              <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title={<Title order={3}>Menu</Title>}
                padding="md"
                size="md"
              >
                <div className="flex h-[90%] flex-1 flex-col">
                  <div className="flex flex-1 flex-col">
                    <NavBarButton
                      href="/"
                      icon={<TbTable size={24} />}
                      label="Inventory"
                    />

                    <NavBarButton
                      href="/"
                      icon={<TbLayoutDashboard size={24} />}
                      label="Summary"
                    />
                  </div>
                  <Divider my="sm" />
                  <div className="flex flex-col">
                    <NavBarButton
                      href="/export"
                      target="_blank"
                      icon={<TbTableExport size={24} />}
                      label="Export Inventory to CSV"
                    />
                  </div>
                </div>
              </Drawer>
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
