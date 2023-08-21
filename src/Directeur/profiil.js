import styled from 'styled-components';
import { useState} from 'react';

import back from'./back.png'
import secretary from './navbar/secretary.png'
export default function Profiil(){
    const StyledDiv = styled.div`

*{
 
  font-family: 'Poppins', sans-serif;
  color:black;

}

    .page-wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color:#3B5D8F;
    }
    
    .top-section {
      height: 20%;
      width:410px;
      background-color: #3B5D8F;
     
    }
    
    .bottom-section {
      height: 80%;
      width:410px;
      background-color:white;
      position: relative;
      border-radius:30px 30px 0 0;
    }
    
    .overlay {
      position: absolute;
    
      top: 20%;
      left: 100px;
      right: 100px;
      transform: translateY(-50%);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background-color:white;
      height: 180px;
      border-radius:40px;
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

  
  .form{

 margin-top:150px;
 margin-left:20px;
 margin-right:35px;

  }

    .info{
      font-size:13px;
     padding:7px;
      background-color:#ebebf4;
      color:grey;
      letter-spacing:1px;
    }
   .content{


 margin-top:30px;
 margin-bottom:30px;
   }

   button{
    margin-top:30px;
    border:2px solid white;
    background-color: #3B5D8F;  /* blue background */
    color:white;
    padding: 12px 165px; /* add some padding for spacing */
   letter-spacing:2px;
    font-size: 15px;
  


   }

    `;
    return(
<StyledDiv>
  

    <div class="page-wrapper">
  <div class="top-section"></div>
  <div class="bottom-section">
   <div className='form'>
  <div className='info'>MES INFORMATION</div>
      <div className='content'>
        <label >Nom et prenom :</label>
        <span > Nom asma </span>
       <br/>
        <label>genre : </label>
        <span>Femal </span>
        <br/>
        <label>Date de naissance : </label>
        <span>01/01/1990</span>
       
      </div>
      <div className='info'>MES CONTACTS</div>
      <div className='content'>
        <label>Email : </label>
        <span> Nomasma@gmail</span>
        <br/>
        <label>Numéro téléphone : </label>
        <span>0754318769</span>
       
      </div>
      </div>
      <button>Modifier </button>
  </div>
  <div class="overlay">
  <div class="profile-header">
    <div class="profile-icon">
      <img src="icon-image.png" alt="Profile Icon"/>
    </div>
    <div class="profile-name">
      <h4>nom asma </h4>
      <h5>Nomasma@gmail.com </h5>
    </div>
  </div>
  
  </div>
 
</div>



</StyledDiv>
    );
}

