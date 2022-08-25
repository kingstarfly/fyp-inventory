import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ItemLayoutProps = {
  children: React.ReactNode
}

const ItemsLayout = ({ children }: ItemLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.items()}
            className="rw-link"
          >
            Items
          </Link>
        </h1>
        <Link
          to={routes.newItem()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Item
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ItemsLayout
