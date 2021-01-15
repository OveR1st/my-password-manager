import { Register as RegisterForm } from '../../components/RegisterForm';

export const Register = ({ isRegisterIn, onRegisterHandler }) => (
  <div className="container">
    <h2 className="text-center mt-3">Registration</h2>
    <RegisterForm isRegisterIn={isRegisterIn} onRegisterHandler={onRegisterHandler} />
  </div>
);