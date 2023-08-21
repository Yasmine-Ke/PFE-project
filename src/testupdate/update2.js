import { useState } from 'react';

export default function Up() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    genre: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Vous pouvez envoyer les données du formulaire au serveur ou les gérer de toute autre manière ici
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom:</label>
      <input 
        type="text"
        id="name"
        name="name"
        value="tel"
        onChange={handleChange}
        required
      /> 

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value="tel"
        onChange={handleChange}
        required
      />

      <label htmlFor="tel">Téléphone:</label>
      <input
        type="text"
        id="tel"
        name="tel"
        value="tel"
        onChange={handleChange}
        required
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        id="genre"
        name="genre"
        value="tel"
        onChange={handleChange}
        required
      />

<label htmlFor="genre">date de naissance</label>
      <input
        type="date"
        id="date"
        name="date"
        value="tel"
        onChange={handleChange}
        required
      />


<button type="submit">Submit</button>
    </form>
  );
}




