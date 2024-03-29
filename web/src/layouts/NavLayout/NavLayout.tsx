import {
  Anchor,
  Burger,
  Button,
  clsx,
  createStyles,
  Divider,
  Drawer,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TbLayoutDashboard, TbPrinter, TbTable } from 'react-icons/tb'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import NavBarButton, {
  NavBarButtonProps,
} from 'src/components/NavBarButton/NavBarButton'
import UserDisplay from 'src/components/UserDisplay/UserDisplay'
import IconWithWords from 'src/components/SVGLogos/IconWithWords'

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
    fontWeight: 800,

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
    label: 'Home',
    href: '/',
    icon: <TbLayoutDashboard size={24} />,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: <TbTable size={24} />,
  },
  {
    label: 'Print Labels',
    href: '/print-labels',
    icon: <TbPrinter size={24} />,
  },
]

const NavLayout = ({ children }: NavLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const { classes } = useStyles()
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen min-w-screen bg-slate-100">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="px-4 py-2 bg-blue-300 border-b-2">
        <div className="flex flex-row items-center justify-between h-full">
          <Anchor href="/">
            <IconWithWords height={40} />
          </Anchor>

          <div className="items-center justify-between hidden sm:flex">
            <div className="flex flex-1 gap-4">
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

          <div className="items-center justify-between hidden sm:flex">
            <UserDisplay />
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
        classNames={{ body: 'flex flex-col h-full' }}
      >
        <div className="flex h-[95%] flex-col">
          <div className="flex flex-col flex-1">
            {links.map((link) => (
              <NavBarButton {...link} key={link.label} />
            ))}
          </div>

          <Divider my="sm" />

          <div className="flex flex-col items-center justify-center text-xs">
            <UserDisplay />
          </div>
        </div>
      </Drawer>
      <div className="py-2 mx-4">{children}</div>
    </div>
  )
}

export default NavLayout
