import React, { useState } from "react";

function InsertionC() {
  const [nameF, setNameF] = useState("");
  const [nameP, setNameP] = useState("");
  const [date, setDate] = useState("");
  const [nbrF, setNbrF] = useState("");
  const idP = localStorage.getItem("patientid");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/insertionC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idP, date, nbrF ,nameF}),
      });

      if (response.ok) {
        alert("Données insérées avec succès !");
      } else {
        alert("Erreur lors de l'insertion des données.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'insertion des données.");
    }



    const response = await fetch('/api/Alzheimer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idP , date})
    });
    const { data, error } = await response.json();
    if (!error) { // vérifier si l'insertion a réussi
      console.log('fichier inserted successfully');
   
      window.location.reload();
    } else {
      console.log('Insertion failed:', error);
    
    }
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <label htmlFor="nameF">Nom de famille :</label>
        <input
          type="text"
          id="nameF"
          value={nameF}
          onChange={(event) => setNameF(event.target.value)}
        />
      </div>

      

      <div className="input-box">
        <label htmlFor="date">Date :</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div className="input-box">
        <label htmlFor="nbrF">Le nombre de personne qui veulent assister :</label>
        <input
          type="number"
          id="nbrF"
          value={nbrF}
          onChange={(event) => setNbrF(event.target.value)}
        />
      </div>

      <button type="submit">Insérer</button>
    </form>
  );
}

export default InsertionC;
