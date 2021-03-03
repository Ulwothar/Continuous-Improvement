const UserLogout = async () => {
  //let auth = useContext(AuthContext);
  console.log('user logout copmponent');
  try {
    console.log('before fetching');
    await fetch(process.env.REACT_APP_USER_LOGOUT, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        if (!res) {
          //auth.logout();
          console.log('no message from server!');
        }
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result.message);
        //auth.logout();
      });
  } catch (error) {
    console.log(error);
  }
};

export default UserLogout;
