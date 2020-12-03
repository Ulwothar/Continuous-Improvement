import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/AuthContext';
import './Authenticate.css';

// const DUMMY_USER = {
//   name: 'Mateusz',
//   password: 'qwerty',
// };

let userDetails = {
  userName: '',
  password: '',
};

const Authenticate = () => {
  const auth = useContext(AuthContext);

  const [value, setValue] = useState('');

  const changeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.name === 'userName') {
      userDetails.userName = event.target.value;
    } else {
      userDetails.password = event.target.value;
    }
  };

  const logInSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          login: userDetails.userName,
          password: userDetails.password,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    if (document.cookie) {
      //console.log(document.cookie);     //Checking if no httpOnly cookie was
      auth.login();
    } else {
      console.log('Wrong username or password'); //ToDo: add invalid input handler for user info
    }
  };

  const logOutSubmitHandler = () => {
    auth.logout();
  };

  if (!auth.isLogged) {
    return (
      <div className="authenticate-window">
        <form className="login-form" onSubmit={logInSubmitHandler}>
          <label className="name-label">
            USERNAME
            <input
              type="text"
              className="input-text"
              name="userName"
              onChange={changeHandler}
              required
            />
          </label>
          <label className="password-label">
            PASSWORD
            <input
              type="password"
              className="input-text"
              name="password"
              onChange={changeHandler}
              required
            />
          </label>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>
    );
  }
  if (auth.isLogged) {
    return (
      <form className="login-form" onSubmit={logOutSubmitHandler}>
        <button type="submit">LOGOUT</button>
      </form>
    );
  }
};

export default Authenticate;
