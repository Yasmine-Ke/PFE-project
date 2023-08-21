import { useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
function SignUpForm() {


  const [name, setName] = useState("");
  const [mode, setmodee] = useState("");
  const [prenom, setprenom] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/patient/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, prenom ,mode ,  gender, address, email, phone, username, password, birthdate })
    });
    const data = await response.json();
    if (data.message === 'Patient added successfully') {
      alert('Sign up with success!');
      window.location.href = '/patient/login';
    } else {
      alert('Sign up failed veuillez changer votre user and password !');
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNameChange = (e) => {
    const newValue = capitalizeFirstLetter(e.target.value);
    setName(newValue);
  };
  const capitalizeFirstLetter2 = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNameChange2 = (e) => {
    const newValue = capitalizeFirstLetter2(e.target.value);
    setprenom(newValue);
  };
  return (
    <Form>
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
      <div className="form-group">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Prénom</label>
        <input
          type="text"
          id="prenom"
          value={prenom}
          onChange={handleNameChange2}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Genre</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Selectionner</option>
          <option value="Homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Situation familiale</label>
        <select
          id="gender"
          value={mode}
          onChange={(e) => setmodee(e.target.value)}
          required
        >
          <option value="">Selectionner</option>
          <option value="Celibataire">Celibataire</option>
          <option value="Merie(e)">Marié(e)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="address">Adresse</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Veuillez entrer une adresse email valide."
      
          style={{ display: 'inline-block', cursor: 'help' }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Télephone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="[0-9]{10}"
          title="Veuillez entrer un numéro de téléphone valide composé de 10 chiffres."
          
          style={{ display: 'inline-block', cursor: 'help' }}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthdate">Date de naissance</label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Inscrire</button>
      
        <Link to="/patient/login"> <p>Vous avez déja  un compte ?</p></Link>
      </div>
    </form>
    </Form>
  );
}

export default SignUpForm;

const Form= styled.div`.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.signup-form h2 {
  text-align: center;
}

.form-row {
  display: flex;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #3B5D8F;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

p {
  text-align: center;
}

p a {
  text-decoration: none;
  color: #3B5D8F;
}


`;
    