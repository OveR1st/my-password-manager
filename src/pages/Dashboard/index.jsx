import { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { logout, getActiveUser, addCredsToUser } from '../../api';
import { CredentialAdd } from '../../components/CredentialAdd';
import { CredentialInfoList } from '../../components/CredentialInfoList';
import { CredentialEdit } from '../../components/CredentialEdit';

import './index.css';

export const Dashboard = ({ isLoggedIn, onLogoutHandler }) => {
  const [isAddUser, setAddUser] = useState(false)
  const [isEditUser, setEditUser] = useState(false)
  const [isIdEdit, setIdEdit] = useState(null)
  
  const onLogouthandler = () => {
    logout();
    onLogoutHandler();
  };

  if (isLoggedIn) {
    const activeUser = getActiveUser();
    
    return (
      <div className="container">        
          <div className="row d-flex justify-content-between mt-2">
            <span className="mt-4 ml-4">Hello! {activeUser.email}</span>
            <button onClick={onLogouthandler} type="button" className="logOut btn btn-outline-danger mt-2 mr-3">Log out</button>
          </div>
          <CredentialAdd addCredsToUser={addCredsToUser} setAddUser={setAddUser} />
          <div className="row mt-4">
            <div className="col-6 card">
              <CredentialInfoList isEditUser={isEditUser} isAddUser={isAddUser} setAddUser={setAddUser} setEditUser={setEditUser} setIdEdit={setIdEdit}/>
            </div>
            <div style={{padding: "0 63px 0 63px"}}className="col-6 card justify-content-center text-center">
              <CredentialEdit isEditUser={isEditUser} setEditUser={setEditUser} isIdEdit={isIdEdit} activeUser={activeUser}/>
            </div>
          </div>
      </div>
    );
  }
  return <Redirect to={ROUTES.LOGIN} />
};