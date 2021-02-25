const UserLogout = async () => {
  //let auth = useContext(AuthContext);
  console.log('user logout copmponent');
  try {
    console.log('before fetching');
    await fetch('http://localhost:5000/api/users/logout', {
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
