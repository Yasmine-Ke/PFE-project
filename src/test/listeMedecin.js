
import styled from 'styled-components';


import { useState , useEffect} from 'react';

import Ajoutermedecin from './ajoutermedecin';
import Modifiermedecin from './modifierMedecin';


const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);


export default function Listemedecin(){
  const [patient, setPatients] = useState([]);



  useEffect(() => {
      // Fetch user data from Express server
      const fetchUsers = async () => {
        const response = await fetch('/api/listemedecin');
        const data = await response.json();
        
        setPatients(data);
      };
  
      fetchUsers();
    }, []);
  
  const [showFormA, setShowFormA] = useState(false);

  const handleAjouterClick = () => {
    setShowFormA(true);
  };

  const handleCloseAjouter = () => {
    setShowFormA(false);
  };

  const [showFormM, setShowFormM] = useState(false);

 /* const handleModifierClick = () => {
    setShowFormM(true);
  };*/

  const handleCloseModifier = () => {
    setShowFormM(false);
  };
  
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleupdateClick = () => {
    setShowCheckbox(!showCheckbox);
};
const [showCheckbox1, setShowCheckbox1] = useState(false);

const handleDeleteClick = () => {
  setShowCheckbox1(!showCheckbox1);
};


const handleEdit = (patient) => {
  setShowFormM(true);
  // Sauvgarder le patient in localstorage 
  localStorage.setItem('patientData', JSON.stringify(patient));
  
  //rederiger vers la page update :)
 
};



  
  
   






const [showPopup, setShowPopup] = useState(false);


const [selectedPatientId, setSelectedPatientId] = useState(null);

function handleShowPopup(patientId) {
    setSelectedPatientId(patientId);
    setShowPopup(true);
};

const handleDelete = async () => {
  
  const { error } = await supabase.from('medecin').delete().eq('id', selectedPatientId);

  if (error) {
    console.error('Error deleting data:', error.message);

  } else {
    console.log('Data deleted successfully');
    window.location.reload();
    setShowPopup(false);
    
  }
};



const handleClosePopup = () => {
  setShowPopup(false);
}




 
  return(

     

      <StyledDivliste>    

<link
    href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
    rel="stylesheet"
  />
          
          <section class="dashboard">
      <div class="top">
      
      
          <div class="search-box">
              <i class="bx bx-search icon"></i>
              <input type="text" placeholder="Rechercher..."/>
          </div>
          <ul>
   
       
      </ul>
        
      </div>

      <div class="dash-content">
       

          <div class="activity">
       
              <div class="title">
                 
                  <i class="bx bx-user icon"></i>
                  <span class="text">Liste des Medecins</span>
                  <div class="spacer"></div>
                  <button class="mybtn1" onClick={handleAjouterClick}>Ajouter Medecin</button>
                  {showFormA ? (
      <div className="modal-overlay" onClick={handleCloseAjouter}>
        <div className="modal" onClick={(e) => e.stopPropagation()}> 
              <Ajoutermedecin></Ajoutermedecin>
        </div>
      </div>
    ) : null}
                
                  </div>
                  <div class="activity-data">



                  <div class="data id">
             
             <span class="data-title">Id</span>
            
             {patient.map((patients) => (
                 
         
            <span class="data-list">{patients.id}</span>
            ))}
         </div>
                  <div class="data names">
             
                      <span class="data-title">Nom et Prenom </span>
                     
                      {patient.map((patients) => (
                          
                  
                     <span class="data-list">{patients.name}</span>
                     ))}
                  </div>
                  <div class="data status">
                      <span class="data-title">D.Naissance</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.dateN}</span>
))}
                  </div>
                  <div class="data e">
                      <span class="data-title">Genre</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.genre}</span>
))}
                  </div>
                  <div class="data type">
                      <span class="data-title">Adresse</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.adresse}</span>
))}
                  </div>
                  <div class="data y">
                      <span class="data-title">Telephone</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.tel}</span>
))}
                  </div>
                  
                  <div class="data email">
                      <span class="data-title">D.Recrut</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.dateA}</span>
))}
                  </div>
                  <div class="data ke">
                      <span class="data-title">Service</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.service}</span>
))}
                  </div>
                 
                 
                

                          
              
                  <div class="data action">
<span class="b" >M</span>
      {patient.map((patient) => (
          <tr key={patient.name}>
            
                              <td>

                              <button class="bx bxs-edit-alt m" onClick={() => handleEdit(patient)}></button>
                              {showFormM ? (
           <div className="modal-overlay2" onClick={handleCloseModifier}>
             <div className="modal" onClick={(e) => e.stopPropagation()}> 
                  <Modifiermedecin></Modifiermedecin>
             </div>
           </div>
         ) : null}
                         </td>
                           
                            </tr>
                                ))}            
        </div>

        <div class="data action">
<span class="b">S</span>
      {patient.map((patient) => (
          <tr key={patient.date}>
            
                            <td>
                            
                                 <button class="bx bx-trash-alt m" onClick={() => handleShowPopup(patient.id)}></button>
                                 {showPopup ? (
             
             <div className="popup">
             <div className="popup-modal-content">
               <i className="bx bx-calendar-exclamation"></i>
               <h2>Something ...</h2>
               <h3>etes vous sure de supprimer l'assistant ? </h3>
               <div className="buttons">
                 <button  onClick={() => handleDelete(patient.id)}>Oui</button>
                 <button onClick={ handleClosePopup }>Non</button>
               </div>
             </div>
           </div>
             
            
            ) : null}
                                 
                            </td>
                           
                            </tr>
                                ))}                
    </div> 
               
              </div> 
              </div> 
              </div>  
              </section>
          
              </StyledDivliste> 
       
         

  );
}

const StyledDivliste = styled.div`

  
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}
.activity-data .data .data-list span {
  margin-right: 100px;
}


.dashboard{
    position: relative;
    left: 250px;
    min-height: 100vh;
    width: calc(100% - 250px);
    padding: 10px 14px;
    background-color :  rgb(248, 248, 252);
}
.dashboard .top{
    position: fixed;
    top:0;
    height:90px;
    left: 255px;
    display: flex;
    width: calc(100% - 250px);
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background-color:white;
   

   
}
.dashboard .top .search-box{
    position: relative;
    height: 45px;
    max-width: 300px;
    width: 100%;
    margin: 0 30px;
    margin-left:850px;
    margin-top:10px;
   
}
.top .search-box input{
    position: absolute;
    border: 0.8px solid #7f9dda;
    background-color: #f2f2fa;
    padding: 0 25px 0 50px;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    color: #6688CC;
    font-size: 15px;
    font-weight: 400;
    outline: none;
   
}
.top .search-box i{
    position: absolute;
    left: 240px;
    font-size: 28px;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    color: #6688CC;

}





.dashboard .dash-content{
    padding-top: 10px;
    margin-top:50px;
  
    overflow-x: auto; /* ajout de la propriété overflow-x */
    white-space: nowrap;
}
.dash-content .title{
    display: flex;
    align-items: center;
    margin: 60px 0 30px 0;
   
    
}
.dash-content .title i{

    height: 40px;
    width: 40px;
    background-color: #3B5D8F;
    border-radius: 6px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
   
}
.dash-content .title .text{
    font-size: 24px;
    font-weight: 500;
    color: #3B5D8F;
    margin-left: 12px;
   
    
}




.dash-content .activity .activity-data{
    padding:20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
   
}

.activity .activity-data{
    display: flex;
  
   
}
.activity-data .data{
    display: flex;
    flex-direction: column;
   
   
   
}
.activity-data .data-title{
    font-size: 20px;
    font-weight: 500;
    color: black;
 
   
}
.activity-data .data .data-list{
   
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    white-space: nowrap;
   
  
}
   
}
    
}


.spacer {
    flex-grow: 0.1;
  }


  .mybtn1 {
    border:2px solid #3B5D8F;
    background-color: #3B5D8F;  /* blue background */
    color:white;
    padding: 13px 20px; /* add some padding for spacing */
   
    border-radius: 5px; /* round the button corners */
    transition: background-color 0.3s ease; /* transition for hover effect */
    font-size: 15px;
  }

  





  

  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
   

  }

  .modal-overlay2 {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-end;
   

  }
  
  .modal {
    position: absolute;
    top: 0;
    right:0;
    left: auto;
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: slide-in 0.4s ease-in-out forwards;
   
  }


  @keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
  
  
.delete{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid red;
  border-radius: 50%; /* round the button corners */
 color: red;
}

.delete:hover{

  background-color: red; /* blue background */
 color:white
}
  

.check{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid #6688CC;
  border-radius: 50%; /* round the button corners */
 color: #6688CC;
}

.check:hover{

  background-color: #6688CC; /* blue background */
 color:white
}


.delete{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid red;
  border-radius: 50%; /* round the button corners */
 color: red;
}

.delete:hover{

  background-color: red; /* blue background */
 color:white
}
  

.check{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid #6688CC;
  border-radius: 50%; /* round the button corners */
 color: #6688CC;
}

.check:hover{

  background-color: #6688CC; /* blue background */
 color:white
}


.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:  rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
}

.popup-modal-content {
   animation: popup 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  background-color:  rgb(248, 248, 252);
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  text-align: center;
 
}

.popup-modal-content i {
  font-size: 80px;
  color: #3B5D8F;
  margin-bottom: 20px;

}

.popup-modal-content h2 {
  font-size: 27px;
  margin-bottom: 10px;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
 
}

.popup-modal-content h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color:grey;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
  
  
}

.popup-modal-content .buttons {
  display: flex;
  justify-content: center;
}

.popup-modal-content button {
  margin: 0 30px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3B5D8F;
  color: #fff;
  border: none;
  letter-spacing:4px;
}

.popup-modal-content button:hover {
  opacity: 0.8;
}


  
  
@keyframes popup {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

}



.m{
  color:  #3B5D8F;
  font-size:25px;

  margin-top:17px;
  margin-bottom:5px;

  cursor:pointer;
  background-color :  rgb(248, 248, 252);
  margin-left:10px;
  border:none;
}

.m:hover{
  color:#788FB0;
}

.b{
  color :  rgb(248, 248, 252);
}

`;
