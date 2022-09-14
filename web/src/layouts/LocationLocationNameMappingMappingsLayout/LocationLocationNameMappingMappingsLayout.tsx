import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LocationNameMappingLayoutProps = {
  children: React.ReactNode
}

const LocationNameMappingsLayout = ({ children }: LocationNameMappingLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.locationNameMappings()}
            className="rw-link"
          >
            LocationNameMappings
          </Link>
        </h1>
        <Link
          to={routes.newLocationNameMapping()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New LocationNameMapping
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default LocationNameMappingsLayout
