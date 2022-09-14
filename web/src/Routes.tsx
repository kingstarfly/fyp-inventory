// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import LocationsLayout from 'src/layouts/LocationsLayout'

import ItemsLayout from 'src/layouts/ItemsLayout'
import NavLayout from './layouts/NavLayout/NavLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

      <Private unauthenticated="login">
        <Set wrap={NavLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route notfound page={NotFoundPage} />

          <Route path="/items/new" page={ItemNewItemPage} name="newItem" />
          <Route path="/items/{id:Int}/edit" page={ItemEditItemPage} name="editItem" />
          <Route path="/items/{id:Int}" page={ItemItemPage} name="item" />
          <Route path="/items" page={HomePage} name="items" />

          <Set wrap={LocationsLayout}>
            <Route path="/locations/new" page={LocationNewLocationPage} name="newLocation" />
            <Route path="/locations/{id:Int}/edit" page={LocationEditLocationPage} name="editLocation" />
            <Route path="/locations/{id:Int}" page={LocationLocationPage} name="location" />
            <Route path="/locations" page={LocationLocationsPage} name="locations" />
          </Set>
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
