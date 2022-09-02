// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ItemGroupsLayout from 'src/layouts/ItemGroupsLayout'

import ItemsLayout from 'src/layouts/ItemsLayout'
import NavLayout from './layouts/NavLayout/NavLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ItemGroupsLayout}>
        <Route path="/item-groups/new" page={ItemGroupNewItemGroupPage} name="newItemGroup" />
        <Route path="/item-groups/{id:Int}/edit" page={ItemGroupEditItemGroupPage} name="editItemGroup" />
        <Route path="/item-groups/{id:Int}" page={ItemGroupItemGroupPage} name="itemGroup" />
        <Route path="/item-groups" page={ItemGroupItemGroupsPage} name="itemGroups" />
      </Set>
      <Set wrap={ItemsLayout}>
        <Route path="/items/new" page={ItemNewItemPage} name="newItem" />
        <Route path="/items/{id:Int}/edit" page={ItemEditItemPage} name="editItem" />
        <Route path="/items/{id:Int}" page={ItemItemPage} name="item" />
        <Route path="/items" page={ItemItemsPage} name="items" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      
      <Private unauthenticated="login">
        <Set wrap={NavLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
