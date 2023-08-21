import styled from 'styled-components';
import React, { useState} from 'react';

export default function ModifierRdv() {

   
const patient = JSON.parse(localStorage.getItem('patient'));
const [meetLink, setMeetLink] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  const {  idR } = patient;
  const data = { idR ,  meetLink };

  try {
    const response = await fetch('/api/meet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('lien insere avec succes!');
      window.location.reload();
      setMeetLink('');
    } else {
      alert('Erreur lors de l envoi des donnÃ©es');
    }
  } catch (error) {
    console.error('Erreur lors de l envoi des donnÃ©es', error);
    alert('Erreur lors de l envoi des donnÃ©es');
  }
};
  
  
  const StyledDiv = styled.div`
  form .user-details {
    display: flex; 
    justify-content: space-around; 
    align-items: center; 
   
  }
  
  form .user-details .input-box input {
    height: 35px;
    width:400px;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1.2px solid gray;
    transition: all 0.3s ease;
    color: #3B5D8F;
  }
  
  form .button input {
    height: 35px;
    width: 100px;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 10px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #3B5D8F;
  }
  
  `;

    return(
      <StyledDiv>



<form onSubmit={handleSubmit}>
            <div className="user-details">
             
            <span className="details">Lien : </span>
     
              
              <div className="input-box">

  <input 
   type="text"
   placeholder="Lien meet"
   value={meetLink}
   onChange={(e) => setMeetLink(e.target.value)}
 />
 
   



  
</div>

<div className="button">
              <input type="submit" value="enregistrer" />
            </div>
           



</div>

          </form >




    </StyledDiv>
  );
    


}