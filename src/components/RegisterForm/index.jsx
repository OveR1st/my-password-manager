import { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { addUser, getUserByEmail } from '../../api';

export const Register = ({ isRegisterIn, onRegisterHandler }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)

  const [emailError, setEmailError] = useState('Email cannot be empty')
  const [passwordError, setPasswordError] = useState('Password cannot be empty')

  const [formValid, setFormValid] = useState(false)
  
  const [noReg, setnoIsReg] = useState(false)
  const [noRegMessage, setnoIsRegMessage] = useState('')

  const [regDone, setRegDone] = useState(false)
  const [regDoneMessage, setRegDoneMessage] = useState('')

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const isExistsUser = !!getUserByEmail(email);
    
    if (isExistsUser) {
      setnoIsReg(true);
      setnoIsRegMessage('User with this email is already registered');
    } else {
      addUser(email, password);
      setRegDone(true)
      setRegDoneMessage('You have successfully registered')
      onRegisterHandler(true);
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
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(e.target.value).toLowerCase())) {
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
    if (isRegisterIn) {  // Сделать задержку
      onRegisterHandler(false)
      return <Redirect to={ROUTES.LOGIN}/>
    }

    return( 
      <Fragment>
        <form onSubmit={(e) => handleSubmitRegister(e)}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>

          {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
          {noReg && <div style={{color: 'red'}}>{noRegMessage}</div>}
          {regDone && <div style={{color: 'green'}}>{regDoneMessage}</div>}

          <input
            onBlur={(e) => leaveInput(e)}
            name="email"
            onChange={(e) => emailValid(e)}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label 
            for="exampleInputPassword1"
            className="form-label">
            Password
          </label>

          {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

          <input
            onBlur={(e) => leaveInput(e)}
            name="password"
            onChange={(e) => passwordValid(e)}
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"/>
        </div>

        <button disabled={!formValid}type="submit" className="btn btn-primary mb-4">Submit</button>
        <Link to={ROUTES.LOGIN}>
          <button type="button" className="btn btn-primary mb-4 float-sm-right m-0">Back</button>
        </Link>
      </form>
      </Fragment>
    );
}