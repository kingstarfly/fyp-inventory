import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ItemGroupLayoutProps = {
  children: React.ReactNode
}

const ItemGroupsLayout = ({ children }: ItemGroupLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.itemGroups()}
            className="rw-link"
          >
            ItemGroups
          </Link>
        </h1>
        <Link
          to={routes.newItemGroup()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New ItemGroup
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ItemGroupsLayout
