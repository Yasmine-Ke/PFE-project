import { useEffect, useState } from 'react';

function UserInfoPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // If the user ID is not found in local storage, redirect to the login page
        window.location.href = '/login';
        return;
      }
  
      // Send a GET request to your server to retrieve the user's information
      fetch(`/user/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, []);
  
    if (!user) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.Name}</p>
      <p>Email: {user.Adresse}</p>
      <p>Phone: {user.Tel}</p>
      <p>Date de naissance : {user.Date}</p>
    </div>
  );
}

export default UserInfoPage;
