import { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { login, getUserByEmail } from '../../api';

export const LoginForm = ({ isLoggedIn, onLoginHandler }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)

  const [emailError, setEmailError] = useState('Email cannot be empty')
  const [passwordError, setPasswordError] = useState('Password cannot be empty')

  const [formValid, setFormValid] = useState(false)

  const [noRegStatus, setRegStatus] = useState(false)
  const [noRegStatusMessage, setnoRegStatusMessage] = useState('')

  const [wrongData, setWrongData] = useState(false)
  const [wrongDataMessage, setWrongDataMessage] = useState('')

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const user = getUserByEmail(email);
    if (user && user.password === password) {
      login(user);
      onLoginHandler(true);
    } else {
      setRegStatus(true)
      setnoRegStatusMessage('You are not registered or not correct password')
    }
  }

  useEffect( () => {
    if(emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  },[emailError, passwordError])

  const emailValid = (e) => {
    const { value } = e.target;
    setEmail(value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value.toLowerCase())) {
      setEmailError('Invalid email')
    } else {
      setEmailError('')
    }
  }

  const passwordValid = (e) => {
    setPassword(e.target.value);
    if(!e.target.value) {
      setPasswordError('Password cannot be empty')
    }
    if (e.target.value.length < 3 || e.target.value.length > 16) {
      setPasswordError('Password must be longer than 3 or less than 16 characters')
    } else {
      setPasswordError('')
    }
  }

  const leaveInput = (e) => {
    switch(e.target.name) {
      case 'email' :
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

    if (isLoggedIn) {
      return <Redirect to={ROUTES.DASHBOARD} />
    }

    return( 
      <form onSubmit={(e) => handleSubmitLogin(e)}>
      <div className="mb-3">
        <label 
          htmlFor="exampleInputEmail1"
          className="form-label">
          Email address
        </label>

        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        {noRegStatus && <div style={{ color: 'red' }}>{noRegStatusMessage}</div>}
        <input
          onBlur={(e) => leaveInput(e)}
          name="email"
          onChange={(e) => emailValid(e)}
          value={email}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"/>
      </div>

      <div className="mb-3">
        <label 
          htmlFor="exampleInputPassword1"
          className="form-label">
          Password
        </label>

        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        {wrongData && <div style={{ color: 'red' }}>{wrongDataMessage}</div>}
        <input
          onBlur={leaveInput}
          name="password"
          onChange={(e) => passwordValid(e)}
          value={password}
          type="password"
          className="form-control"
          id="exampleInputPassword1"/>
      </div>

      <button disabled={!formValid}type="submit" className="btn btn-primary mb-4">Submit</button>
      <Link to={ROUTES.REGISTER}>
        <button type="button" className="btn btn-primary mb-4 float-sm-right m-0">Register</button>
      </Link>
    </form>
    );
}

