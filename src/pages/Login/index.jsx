import { LoginForm } from '../../components/LoginForm';

export const Login = ({ isLoggedIn, onLoginHandler }) => (
  <div className="container loginPage">
    <h2 className="text-center mt-3">Loggin Page!</h2>
    <LoginForm isLoggedIn={isLoggedIn} onLoginHandler={onLoginHandler} />
  </div>
);