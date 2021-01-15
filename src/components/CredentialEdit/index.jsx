import { useEffect, useState } from 'react';
import { editUserCreds } from '../../api'

import "./index.css";

export const CredentialEdit = ({isEditUser, setEditUser, isIdEdit, activeUser}) => {

  const [loginV, setLogin] = useState('')
  const [passwordV, setPassword] = useState('')
  const [formValid, setFormValid] = useState(false)

  const onEditCred = (e, id, login, pass) => {
    e.preventDefault();
    editUserCreds(id, login, pass);
    setEditUser(false)
  }

  useEffect( () => {
    if(!loginV || !passwordV) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  },[loginV, passwordV])

  const onChangeInputLogin = (e) => {
    setLogin(e.target.value)
  }
  const onChangeInputPassword = (e) => {
    setPassword(e.target.value)
  }

  if (isEditUser) {
  
    const { credentials } = activeUser
    if ( !!credentials[isIdEdit] === false ){
      setEditUser(false)
    }
 
    const nameService = credentials[isIdEdit][1]

    const onVisible = () => {
      const input = document.getElementById('passInput');
      if (input.type === 'password') {
        input.type = 'text'
      } else {
        input.type = 'password'
      }
    }

    return( 
      <>  
      <h3 className="card-title">Edit Login and Password: {nameService}</h3>
      <form className="d-flex flex-column">
        <input onChange={onChangeInputLogin} className="form-control mt-2" type="email" placeholder='Login' value={loginV} autoComplete="off"></input>
        <div className="IconContainer">
          <input id="passInput" onChange={onChangeInputPassword} className="form-control mt-2" type="password" placeholder='Password' value={passwordV} autocomplete="off"></input>
          <button onClick={onVisible} type="button" className="btnEye btn btn-outline-secondary">
            <i class="btnIcon fa fa-eye" aria-hidden="true"></i>  
          </button>  
        </div>    
        <div className="d-flex justify-content-center mt-4 mb-4">
          <button disabled={!formValid} onClick={(e) => onEditCred(e, isIdEdit, loginV, passwordV)}className="btn btn-primary card-link" type="submit">Edit</button>
          <button onClick={() => setEditUser(false)} className="btn btn-primary card-link" type="button">Cancle</button>
        </div>
      </form>
      </>
    );
  }
  return(
    <><h3></h3></>
  );
}