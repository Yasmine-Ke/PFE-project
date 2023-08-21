/*import { useEffect, useState } from 'react';

function UserInfoPagem() {
    const [user, setUser] = useState(null);

useEffect(() => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    fetch(`/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }
}, [setUser]);

if (!user) {
  return <div>Loading...</div>;
}

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.adresse}</p>
      <p>Phone: {user.tel}</p>
    
    </div>
  );
}

export default UserInfoPagem;*/
import { useEffect, useState } from 'react';

function UserInfoPagem() {
    const [userM, setUser] = useState(null);

    useEffect(() => {
      // Retrieve the user ID from local storage
      const userIdd = localStorage.getItem('userIdd');
      if (!userIdd) {
        // If the user ID is not found in local storage, redirect to the login page
      
        return;
      }
  
      // Send a GET request to your server to retrieve the user's information
      fetch(`/userr/${userIdd}`)
        .then(response => response.json())
        .then(dataa => setUser(dataa))
        .catch(error => console.error(error));
    }, []);
  
    if (!userM) {
      return <div>Loading.....</div>;
    }

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {userM.name}</p>
      
  
    </div>
  );
}

export default UserInfoPagem;
