import Auth from './Components/Auth/Auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from './Components/Home/Navigation/Navigation';

import { Home } from './Components/Home/Home';


import CartScreen from "./Screens/CartScreen/CartScreen";
import BookScreen from "./Screens/BookScreen/BookScreen";
import WishlistScreen from "./Screens/WishlistScreen/WishlistScreen";
import AuthorBooksScreen from './Screens/AuthorBooksScreen/AuthorBooksScreen';
import ReviewScreen from './Screens/ReviewScreen/ReviewScreen';
import Browser from './Screens/Browser/Browser';

import { SideBar } from './Components/Dashboard/SideBar/SideBar';
import { DashboardHome } from './Components/Dashboard/DashboardHome/DashboardHome';
import { PersonalInfoManager } from './Components/Dashboard/PersonalInfoManager/PersonalInfoManager';
import { LoginManager } from './Components/Dashboard/LoginManager/LoginManager';
import { NewCreditCard } from './Components/Dashboard/CreditCardManager/NewCreditCard';
import { NewShippingAddress } from './Components/Dashboard/ShippingAddressManager/NewShippingAddress';
import { ManageCreditCard } from './Components/Dashboard/CreditCardManager/ManageCreditCard';
import { ManageShippingAddress } from './Components/Dashboard/ShippingAddressManager/ManageShippingAddress';
import { UpdateCreditCard } from './Components/Dashboard/CreditCardManager/UpdateCreditCard';
import { UpdateShippingAddress } from './Components/Dashboard/ShippingAddressManager/UpdateShippingAddress';

function App() {
  return (
    <Router >
      <Navigation />
      <Switch>

        <Route path='/dashboard'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <DashboardHome />
          </div>
        </Route>

        <Route path='/dashboard/updating-shipping-adress'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <UpdateShippingAddress />
          </div>
        </Route>

        <Route path='/dashboard/updating-credit-card'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <UpdateCreditCard />
          </div>
        </Route>


        <Route path='/dashboard/manage-shipping-address'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <ManageShippingAddress />
          </div>
        </Route>

        <Route path='/dashboard/manage-credit-card'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <ManageCreditCard />
          </div>
        </Route>
        <Route path='/dashboard/add-new-shipping-address'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the suer dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <NewShippingAddress />
          </div>
        </Route>
        <Route path='/dashboard/add-new-credit-card'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the suer dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <NewCreditCard />
          </div>
        </Route>
        <Route path='/dashboard/update-login-details'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the suer dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <LoginManager />
          </div>
        </Route>
        <Route path='/dashboard/update-info'
          exact={true}>
          {/* After the user clicks the dashboard link, it opens the dashboard page */}
          <div className="dashboard-divider">
            <SideBar />{/*Displays to the suer dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
            <PersonalInfoManager />
          </div>
        </Route>


        <Route path='/auth' exact={true}>
          <Auth />
        </Route>

        <Route path='/' exact={true}>
          <Home />
        </Route>

        <Route path='/browse' exact={true}>
          <Browser />
        </Route>

        <Route path='/cart/:id?'>
          <CartScreen />
        </Route>

        <Route exact path='/book/:id' component={BookScreen} />
        <Route exact path='/wishlist/:id?' component={WishlistScreen} />
        <Route exact path='/authorbooks/:id' component={AuthorBooksScreen} />
        <Route exact path='/book/:id/reviews' component={ReviewScreen} />
      </Switch>
    </Router>
  );
}

export default App;
