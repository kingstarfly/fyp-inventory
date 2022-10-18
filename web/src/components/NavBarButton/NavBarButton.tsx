import { NavLink, ThemeIcon } from '@mantine/core'
import { AnchorHTMLAttributes } from 'react'
import { TbChevronRight } from 'react-icons/tb'

export interface NavBarButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode
  label: string
}

const NavBarButton = ({ icon, label, href, target }: NavBarButtonProps) => {
  return (
    <NavLink
      component="a"
      label={label}
      icon={
        <ThemeIcon color="dark" variant="light" size="lg">
          {icon}
        </ThemeIcon>
      }
      rightSection={<TbChevronRight size={16} />}
      href={href}
      target={target}
    />
  )
}

export default NavBarButton
