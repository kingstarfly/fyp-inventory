import { Avatar, createStyles, Menu, Text } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { TbLogout, TbUsers } from 'react-icons/tb'

const useStyles = createStyles((theme) => ({
  item: {
    '&[data-hovered]': {
      backgroundColor: theme.colors.gray[2],
    },
  },
}))

// TODO: Create a helper function to generate initials from the user's name or email.
// TODO: Create a helper function to generate a random color from the user's name or email.
// TODO: Create a new "Manage Users" page and link the button to it.

const UserDisplay = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const { classes } = useStyles()

  if (isAuthenticated) {
    return (
      <Menu
        shadow="md"
        classNames={classes}
        withArrow
        arrowPosition="center"
        position="left-start"
      >
        <Menu.Target>
          <Avatar radius="xl" src={null} alt={currentUser.email}>
            VR
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col items-center justify-center mb-4">
            <Avatar radius="xl" size="lg" src={null} alt={currentUser.email}>
              VR
            </Avatar>

            <Text size="sm">{currentUser.email}</Text>
          </div>

          <Menu.Item icon={<TbUsers size={14} />}>
            <Link to={routes.manageUsers()}>
              <Text size="xs">Manage Users</Text>
            </Link>
          </Menu.Item>

          <Menu.Item
            icon={<TbLogout size={14} />}
            color="red.7"
            onClick={logOut}
          >
            <Text size="xs">Log Out</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  } else {
    return <Link to={routes.login()}>Login</Link>
  }
}

export default UserDisplay
