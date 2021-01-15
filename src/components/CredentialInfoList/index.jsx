import { CredentialInfoItem } from "../CredentialInfoItem"
import { getActiveUser, deleteUserCreds } from '../../api'
import { useEffect } from 'react'

export const CredentialInfoList = ({ isEditUser, isAddUser, setAddUser, setEditUser, setIdEdit}) => { 
  const activeUser = getActiveUser()

  useEffect(() => {
    setAddUser(false)
  }, [isAddUser, isEditUser])

  if (activeUser.credentials.length === 0) {
    return(
      <h3 className="text-center">Cred not at the moment</h3>
    );
  }
  
  const element = activeUser.credentials.map((el,id) => {
    return (
      <CredentialInfoItem 
        key={id}
        email={el[0]}
        name={el[1]}
        pass={el[2]}
        id={id} 
        deleteUserCreds={deleteUserCreds} 
        setAddUser={setAddUser} 
        setEditUser={setEditUser} 
        setIdEdit={setIdEdit}/>
    );
  })
  
  return(
    <ul className="list-group list-group-flush">
      {
        element    
      }
    </ul>
  );
}