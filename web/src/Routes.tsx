// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import LocationNameMappingsLayout from 'src/layouts/LocationNameMappingsLayout'

import ItemsLayout from 'src/layouts/ItemsLayout'
import NavLayout from './layouts/NavLayout/NavLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={LocationNameMappingsLayout}>
        <Route path="/location-name-mappings/new" page={LocationNameMappingNewLocationNameMappingPage} name="newLocationNameMapping" />
        <Route path="/location-name-mappings/{id:Int}/edit" page={LocationNameMappingEditLocationNameMappingPage} name="editLocationNameMapping" />
        <Route path="/location-name-mappings/{id:Int}" page={LocationNameMappingLocationNameMappingPage} name="locationNameMapping" />
        <Route path="/location-name-mappings" page={LocationNameMappingLocationNameMappingsPage} name="locationNameMappings" />
      </Set>
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
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
