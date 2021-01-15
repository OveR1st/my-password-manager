import { useState, useEffect } from 'react';
import './index.css';
export const CredentialAdd = ({ addCredsToUser, setAddUser }) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false)

  useEffect( () => {
    if(!email || !name || !password) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  },[email, name, password])

  const inputValueEmail = (e) => {
    setEmail(e.target.value)
  }

  const inputValueName = (e) => {
    setName(e.target.value)
  }

  const inputValuePassword = (e) => {
      setPassword(e.target.value)
  }

  const handleSubmitAdd = (e) => {
    
    e.preventDefault();
  
    const creds = [
      email,
      name,
      password  
    ]

    setEmail('');
    setName('');
    setPassword('');

    addCredsToUser(creds)
    setAddUser(true)
  }

  return(
  <div className="d-flex justify-content-center mt-4">
    <form onSubmit={handleSubmitAdd}>
      <input onChange={inputValueEmail} value={email} className="mr-3" type="email" placeholder="Email"></input>
      <input onChange={inputValueName} value={name} className="mr-3" type="text" placeholder="NameService"></input>
      <input onChange={inputValuePassword} value={password} className="mr-3" type="password" placeholder="Password"></input>
      <button disabled={!formValid} className="btnAdd btn btn-success" type="submit">Add</button>
    </form>
  </div>
  );
}