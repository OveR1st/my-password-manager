import './index.css';
export const CredentialInfoItem = ({ email,
   name, pass, id, deleteUserCreds, setAddUser, setEditUser, setIdEdit }) => {

  const editUpdate = (id) => {
    setEditUser(true);
    setIdEdit(id)
  }

  const deleteUpdate = () => {
    setEditUser(false)
    setAddUser(true)
    deleteUserCreds(id)
  }

  const onVisible = () => {
    const input = document.getElementById(id)
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password'
    }
  }

  return(
    <li key={id} className="list-group-item d-flex flex-column">
      <div className="d-flex position-relative">
        <div className="d-flex flex-column">
          <h6>Name: {name}</h6>
          <label>Login: {email}</label>
          <div className="d-flex edit-input">
            <span>Password: </span>
            <input id={id} type="password" value={pass}></input>
          </div>   
        </div> 
        <div className="icon-container position-absolute">
          <button onClick={onVisible} type="button" className="btn btn-outline-info mr-2">
            <i className="fa fa-eye" aria-hidden="true"></i>
          </button>
          <button onClick={() => editUpdate(id)}type="button" className="btn btn-outline-warning mr-2">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button onClick={() => deleteUpdate()} type="button" className="btn btn-outline-danger">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </li>
  );
}