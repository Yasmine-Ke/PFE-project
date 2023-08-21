/*import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [genre, setgenre] = useState('');
  
  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };
  const handlegenreChange = event => {
    setgenre(event.target.value);
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { name, email, tel, date, genre }; // Créer un objet JSON avec les données
      const response = await fetch('/api/update1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Envoyer l'objet JSON comme le corps de la requête POST
      });
      const data = await response.json();
      console.log(data); // Afficher un message de succès ou d'erreur selon la réponse de la route Express
    } catch (error) {
      console.error(error);
    }
  };

 
  
  // recuperation des donnees stocker dans localstorage :)
  const patientData = JSON.parse(localStorage.getItem('patientData'));




  
    // Sauvgarder les donnes de ce patient patient in localstorage 

    
    //rederiger vers la page update :)
    
  
  
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom:</label>
      <input 
        type="text"
        id="name"
        name="name"
        value={patientData.Name}
        onChange={handleNameChange}
        required
      /> 

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email }
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="tel">Téléphone:</label>
      <input
        type="text"
        id="tel"
        name="tel"
        value={tel }
        onChange={handlePhoneChange}
        required
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        id="genre"
        name="genre"
        value={ patientData.genre  }
        onChange={handlegenreChange}
        required
      />

<label htmlFor="genre">date de naissance</label>
      <input
        type="date"
        id="date"
        name="date"
        value={  patientData.date }
        onChange={handleDateChange}
        required
      />


<button type="submit">modifier</button>

    </form>
  );
}

*/

import { useState,  useEffect} from 'react';

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [genre, setgenre] = useState('');

  // récupération des données stockées dans localStorage
  const patientData = JSON.parse(localStorage.getItem('patientData'));

  // mise à jour des états
  useEffect(() => {
    setName(patientData.Name);
    setEmail("" ||email||patientData.email );
    setPhone(tel|| patientData.tel );
    setgenre(patientData.genre);
    setDate(patientData.date);
  }, [patientData]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handlegenreChange = event => {
    setgenre(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = { name, email, tel, date, genre }; // Créer un objet JSON avec les données
      const response = await fetch('/api/update1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoyer l'objet JSON comme le corps de la requête POST
      });
      const data = await response.json();
      console.log(data); // Afficher un message de succès ou d'erreur selon la réponse de la route Express
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name }
        onChange={handleNameChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="tel">Téléphone:</label>
      <input
        type="text"
        id="tel"
        name="tel"
        value={tel}
        onChange={handlePhoneChange}
        required
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        id="genre"
        name="genre"
        value={genre}
        onChange={handlegenreChange}
        required
      />

      <label htmlFor="genre">Date de naissance</label>
      <input
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={handleDateChange}
        required
      />
<button type="submit">modifier</button>

</form>
);
}


