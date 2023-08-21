import React from 'react';
import { useState, useEffect } from 'react';

export default function Assistante() {
  const [Patient, setPatient] = useState([]);
 

  const insertPatient = async (user,name, genre, phone, email) => {
    try {
      // Insert patient data into Express server
      const response = await fetch('/api/insertPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user, name, genre, phone, email })// from name
      });

      const data = await response.json();
      console.log('data inserted');

      setPatient([...Patient, data]);
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }
  };
  return (
   
    <div>
    { /* <div  className='Patient'>
      <h2>User List</h2>
     <ul>
        {Patient.map((user) => (
          <li key={user && user?.Name}>
            {user?.Name}:::: {user?.Genre}
          </li>
        ))}
      </ul>
        </div>*/}

      <form onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const genre = e.target.elements.genre.value;
        const phone = e.target.elements.phone.value;
        const email = e.target.elements.email.value;
        const user=e.target.elements.user.value;
        insertPatient(user,name, genre, phone, email);
        e.target.reset();
      }}>
         <label>
          user:
          <input type="text" name="user" />
        </label>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
   
  
}