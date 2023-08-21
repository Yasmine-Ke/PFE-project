import React from 'react';
import { useState, useEffect } from 'react';

export default function Directeur() {
  const [Patient, setPatient] = useState([]);
 

  const insertPatient = async (nom,prenom,genre,date,tel) => {
    try {
      // Insert patient data into Express server
      const response = await fetch('/api/insertPatientD', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nom,prenom,genre,date,tel})// from name
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
        const nom= e.target.elements.nom.value;
        const prenom= e.target.elements.prenom.value;
        const genre = e.target.elements.genre.value;
        
        const date = e.target.elements.date.value;
        const tel=e.target.elements.tel.value;
        insertPatient(nom,prenom,genre,date,tel);
        e.target.reset();
      }}>
         <label>
          nom:
          <input type="text" name="nom" />
        </label>
        <label>
          prenom:
          <input type="text" name="prenom" />
        </label>
        <label>
          genre:
          <input type="text" name="genre" />
        </label>
        <label>
          date:
          <input type="text" name="date" />
        </label>
        <label>
          tel:
          <input type="text" name="tel" />
        </label>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
   
  
}