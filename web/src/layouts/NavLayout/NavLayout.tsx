import {
  Anchor,
  Burger,
  Button,
  clsx,
  Container,
  createStyles,
  Divider,
  Drawer,
  Group,
  Menu,
  Navbar,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { ReactNode, useState } from 'react'

import { TbLayoutDashboard, TbTable, TbTableExport } from 'react-icons/tb'
import NavBarButton, {
  NavBarButtonProps,
} from 'src/components/NavBarButton/NavBarButton'

type NavLayoutProps = {
  children?: React.ReactNode
}

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}))

const links: NavBarButtonProps[] = [
  {
    label: 'Inventory',
    href: '/',
    icon: <TbTable size={24} />,
  },
  {
    label: 'Summary',
    href: '/summary',
    icon: <TbLayoutDashboard size={24} />,
  },
  {
    label: 'Export to CSV',
    href: '/export',
    target: '_blank',
    icon: <TbTableExport size={24} />,
  },
]

const NavLayout = ({ children }: NavLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const { classes } = useStyles()
  const { pathname } = useLocation()

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="border-b-2 px-4 py-2">
        <div className="flex h-full items-center justify-between">
          <h3>Logo</h3>

          <div className="hidden items-center justify-between sm:flex">
            <div className="flex flex-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={clsx(classes.link, {
                    [classes.linkActive]: link.href === pathname,
                  })}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center justify-between sm:flex">
            {isAuthenticated ? (
              <div className="flex flex-row items-center text-xs">
                <Text size="xs">{currentUser.email}</Text>{' '}
                <Button color="dark.5" mx="md" onClick={logOut}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to={routes.login()}>Login</Link>
            )}
          </div>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className="block sm:hidden"
          />
        </div>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={() => closeDrawer()}
        title={<Title order={3}>Menu</Title>}
        padding="md"
        size="md"
      >
        <div className="flex h-[95%] flex-1 flex-col">
          <div className="flex flex-1 flex-col">
            {links.map((link) => (
              <NavBarButton {...link} />
            ))}
          </div>

          <Divider my="sm" />

          {isAuthenticated ? (
            <div className="flex flex-col items-center justify-center text-xs">
              <Text size="md">{currentUser.email}</Text>{' '}
              <Button
                size="sm"
                variant="outline"
                color="dark.5"
                mt="md"
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
      </Drawer>
      <div className="mx-4 py-2">{children}</div>
    </>
  )
}

export default NavLayout
