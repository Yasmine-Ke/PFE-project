import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import ModifierProfil from './modifierProfil';
import secretary from './secretary.png'
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function ProfilB(){

  const [use, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [showProfilEdit, setShowProfilEdit] = useState(false);


  

  useEffect(() => {
     // Retrieve the user ID from local storage
     const userprofil = localStorage.getItem('idmedecin');
     if (!userprofil) {
       // If the user ID is not found in local storage, redirect to the login page
       window.location.href = '/login';
       return;
     }
 
     // Send a GET request to your server to retrieve the user's information
     fetch(`/userrp/${userprofil}`)
       .then(response => response.json())
       .then(data => setUser(data))
       .catch(error => console.error(error));



       
   }, []);
 
   if (!use) {
     return <div>Loading...</div>;
   }
 
  
   
  
   

  const handleProfileEdit = () => {
    setShowProfilEdit(true);
  };

    const StyledDiv = styled.div`

*{
 
  font-family: 'Poppins', sans-serif;
  color:black;

}

    .page-wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: rgb(248, 248, 252);
    }
    
    .top-section {
      height: 33%;
      width:410px;
      background-color: rgb(248, 248, 252);
     
    }
    
    .bottom-section {
      height: 70%;
      width:410px;
      background-color:rgb(248, 248, 252);
      position: relative;
     
    }
    
  
    .profile-header {
     
      display: flex;
      flex-direction:column;
      align-items: center;
    }
    
    .profile-icon {
      margin-top:30px;
      margin-bottom:15px;
      width: 80px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    
    .profile-icon img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .profile-name {
      margin-left: 10px;
    }
    
    .profile-name h4 {
      font-size: 17px;
      margin-left:25px;
      color:black;
      
    }
    .profile-name h5{
      color:grey;
    }

  
    .info{
      margin-top:10px;
      margin-bottom:15px;
      font-size:13px;
     padding:7px;
      background-color:#ebebf4;
      color:grey;
      letter-spacing:1px;
    }
    .form .content{
      margin-bottom:20px;
    }
   .form{
background-color:white;
    border-radius:10px 10px 10px 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    margin-top:10px;
    margin-bottom:30px;
    padding:20px;

   }

   button{
    margin-top:20px;
   border:none;
   border-radius:5px;
    background-color: #3B5D8F;  /* blue background */
    color:white;
    padding: 12px 16px; /* add some padding for spacing */
   letter-spacing:2px;
    font-size: 10px;
    cursor:pointer;
  


   }

   button:hover{
    opacity:0.9;


   }

    `;
    return(

 
   
      <div>
{showProfilEdit ? (


      
       <ModifierProfil></ModifierProfil>
       ) : 
       <StyledDiv>
       <div class="page-wrapper">
  <div class="top-section">
  <div class="profile-header">
    <div class="profile-icon">
    <img src={secretary} alt="Profile Icon"/>
    </div>
    <div class="profile-name">
      <h4>{use.name} </h4>
      <h5> {use.email}</h5>
    </div>
    <button onClick={ handleProfileEdit}>Modifier mon profil  </button>
    </div>
  </div>
   
         
    
  
  <div class="bottom-section">
   <div className='form'>

     
      <div className='info'>MES INFORMATION</div>
      <div className='content'>
        <label >Nom et prénom :</label>
        <span >{use.name} </span>
      
        <br/>
        <label>Date d'arrive : </label>
        <span>{use.dateR}</span>
        <br/>
        <label>Sérvice : </label>
        <span>{use.Service}</span>
        
       </div>
     
      </div>
      <div className='form'>
    
      
      <div className='info'>MES CONTACTS</div>
      <div className='content'>
        <label>Email : </label>
        <span> {use.email}</span>
        <br/>
        <label>Numéro téléphone : </label>
        <span>{use.Num}</span>
        <br/>
        <label>Adresse : </label>
        <span>{use.adresse}</span>
     </div>
     
     </div>
  </div>
  </div>
</StyledDiv>
}
 
</div>



    );
}

