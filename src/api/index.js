const SESSION_USER_KEY = 'sessionUser';
const USERS_KEY = 'users';

// session
export const getActiveUser = () => JSON.parse(localStorage.getItem(SESSION_USER_KEY));

export const login = (user) => localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));

export const logout = (user) => localStorage.removeItem(SESSION_USER_KEY);

// users
export const getAllUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || {};

export const addUser = (email, password) => {
  const newUser = {
    email,
    password,
    credentials: [],
  };
  const allUsers = getAllUsers();
  const updatedUsers = {
    ...allUsers,
    [email]: newUser,
  };

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return newUser;
};

export const getUserByEmail = (email) => {
  const allUsers = getAllUsers();
  return allUsers[email];
};

// user credentials
export const addCredsToUser = (creds) => {
  const activeUser = getActiveUser();
  const { email, credentials } = activeUser
  credentials.push([...creds])

  const allUsers = getAllUsers();
  const updatedUsers = {
    ...allUsers,
    [email]: activeUser,
  };

  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(activeUser));
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers)); 
};

export const editUserCreds = (id, login, pass) => {
  const activeUser = getActiveUser();
  const { email, credentials } = activeUser;

  const neededСred = credentials[id]

  const newCred = [
    login,
    neededСred[1],
    pass
  ]

  const allUsers = getAllUsers();
  const updatedUsers = {
    ...allUsers,
    [email]: activeUser,
  };

  activeUser.credentials[id] = newCred;

  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(activeUser));
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers)); 
};

export const deleteUserCreds = (id, creds) => {
  const activeUser = getActiveUser();

  const { email, credentials } = activeUser;

  const newCred = [
    ...credentials.slice(0, id),
    ...credentials.slice(id + 1)
  ];

  const allUsers = getAllUsers();
  const updatedUsers = {
    ...allUsers,
    [email]: activeUser,
  };

  activeUser.credentials = newCred;

  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(activeUser));
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));  
};
