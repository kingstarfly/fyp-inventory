// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import NavLayout from './layouts/NavLayout/NavLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />

      <Private unauthenticated="login">
        <Set wrap={NavLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/inventory" page={InventoryPage} name="inventory" />
          <Route path="/export" page={ExportPage} name="export" />

          <Route path="/items/new" page={ItemNewItemPage} name="newItem" />
          <Route path="/items/{id:Int}/edit" page={ItemEditItemPage} name="editItem" />
          <Route path="/items/{id:Int}" page={ItemItemPage} name="item" />
          <Route path="/items" page={HomePage} name="items" />

          <Route path="/locations/new" page={LocationNewLocationPage} name="newLocation" />
          <Route path="/locations/{id:Int}/edit" page={LocationEditLocationPage} name="editLocation" />
          <Route path="/locations/{id:Int}" page={LocationLocationPage} name="location" />
          <Route path="/locations" page={LocationLocationsPage} name="locations" />

          <Route path="/print-labels" page={PrintLabelsPage} name="printLabels" />

          <Private unauthenticated="home" roles="admin">
            <Set wrap={ScaffoldLayout} title="Manage Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
              <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
              <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
              <Route path="/users" page={UserUsersPage} name="users" />
            </Set>
          </Private>
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
