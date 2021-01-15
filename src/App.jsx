import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState } from 'react';
import { ROUTES } from './constants/routes';
import { getActiveUser } from './api';
import { Login as LoginPage } from './pages/Login';
import { Register as RegisterPage } from './pages/Register';
import { Dashboard as DashboardPage } from './pages/Dashboard';

import './global.css';

const App = () => {
  const hasActiveUser = !!getActiveUser();
  const [isLoggedIn, setIsLoggedIn] = useState(hasActiveUser)
  const [isRegisterIn, setRegisterIn] = useState(false)

  return (
    <div className="app-manager d-flex flex-column">
      <Router>
        <Switch>
          <Redirect from="/" to="/dashboard" exact />
          <Route path={ROUTES.LOGIN} exact render={() => (
            <LoginPage isLoggedIn={isLoggedIn} onLoginHandler={setIsLoggedIn} />
          )} />
          <Route path={ROUTES.REGISTER} exact render={() => (
            <RegisterPage isRegisterIn={isRegisterIn} onRegisterHandler={setRegisterIn} />
          )} />   
          <Route path={ROUTES.DASHBOARD} exact component={() => (
            <DashboardPage isLoggedIn={isLoggedIn} onLogoutHandler={setIsLoggedIn} />
          )} />
          <Route path="*">404 Page not found</Route>
        </Switch>
      </Router>
    </div>
  )
};
export default App;