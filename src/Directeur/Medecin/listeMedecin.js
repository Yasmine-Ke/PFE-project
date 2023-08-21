
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
  const [searchText, setSearchText] = useState('');




  
  const fetchUsers = async () => {
    const response = await fetch('/api/listemedecin');
    const data = await response.json();
    const filteredPatients = data.filter((patient) => {
      if (!patient || !patient.name) {
        return false;
      }
      const name = patient.name.toLowerCase();
      const searchTextLowerCase = searchText.toLowerCase();
      return name.includes(searchTextLowerCase);
    });
    
    setPatients(filteredPatients);
  };
  
  

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
const [selectedPatientIduser, setSelectedPatientIduser] = useState(null);
function handleShowPopup(patientId) {
    setSelectedPatientId(patientId.id);
    setSelectedPatientIduser(patientId.iduser);
    setShowPopup(true);
};

const handleDelete = async () => {
  
  const { error } = await supabase.from('user').delete().eq('iduser', selectedPatientIduser);
  const { errormedecin } = await supabase.from('medecin').delete().eq('id', selectedPatientId);
  if (error || errormedecin) {
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

     

      <StyledDiv>    

<link
    href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
    rel="stylesheet"
  />
          
          <section class="dashboard">
          <div class="top">
        
        <div class="title">
               
             
               <span class="text"> centre medical de la memoire</span>
              
             
              
               </div>
               <div class="search-box">
            <i class="bx bx-search icon"  onClick={fetchUsers}></i>
           
            <input type="text" placeholder="Rechercher..." value={searchText} onChange={(e) => setSearchText(e.target.value)} 
            
            onClick={fetchUsers}/>
                
        </div>
      
      
       
    </div>

      <div class="dash-content">
       

          <div class="activity">
       
          <div class="activity-data2">



<div class="data id">



<span class="data-title title this " >Liste des professionnels de santé </span>

</div>
<div class="data names">

   
<button class="mybtn1" onClick={handleAjouterClick}>ajouter </button>
                          {showFormA ? (
              <div className="modal-overlay" onClick={handleCloseAjouter}>
                <div className="modal" onClick={(e) => e.stopPropagation()}> 
<Ajoutermedecin></Ajoutermedecin>
                </div>
              </div>
            ) : null}
                         
</div>



         
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
                 
                 
                  <div class="data type">
                      <span class="data-title">Adresse</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.adresse}</span>
))}
                  </div>
                  <div class="data y">
                      <span class="data-title">Email</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.email}</span>
))}
                  </div>
                  
                  <div class="data y">
                      <span class="data-title">Telephone</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.Num}</span>
))}
                  </div>
                  
                  <div class="data email">
                      <span class="data-title">D.Recrut</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.dateR}</span>
))}
                  </div>
                  <div class="data email">
                      <span class="data-title">Service</span>
                      {patient.map((patients) => (

<span class="data-list">{patients.Service}</span>
))}
                  </div>
                 
                

                          
              
                  <div class="data action">
<span class="b" >M</span>
      {patient.map((patient) => (
          <tr key={patient.name}>
            
                              <td>

                              <button class="bx bxs-edit-alt data-list m" onClick={() => handleEdit(patient)}></button>
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
                            
                                 <button class="bx bx-trash-alt data-list m2 m" onClick={() => handleShowPopup(patient)}></button>
                                 {showPopup ? (
             
             <div className="popup">
             <div className="popup-modal-content">
               <i className="bx bx-calendar-exclamation"></i>
               <h2>Attention</h2>
               <h3>etes vous sure de supprimer l'assistant ? </h3>
               <div className="buttons">
                 <button  onClick={() => handleDelete(patient.iduser)}>Oui</button>
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
          
              </StyledDiv  > 
       
         

  );
}


 const StyledDiv = styled.div`

 .activity-data2{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
 
 
 
}

.activity-data2 .data{
  display: flex;

  margin-left:10px;
  white-space: nowrap;
  
}
.activity-data2 .data-title{
  font-size: 18px;
  margin-right:30px;
  cursor:pointer;
 font-weight:600;
 margin-top:30px;
 
}
.this{
  color: #3B5D8F;
  border-bottom:1px solid  #3B5D8F;
}


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}


.dashboard{
    position: relative;
    left: 250px;
    min-height: 100vh;
    width: calc(100% - 250px);
    padding: 10px 14px;
    background-color :  rgb(248, 248, 252);
}
.dashboard .top {
position: absolute;
top: 0;
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 14px;
background-color: white;
left: 0;
width: 100%;
}

.dashboard .top .search-box {
position: relative;
height: 45px;
max-width: 600px;
width: 100%;
margin: 0 135px;
cursor:pointer;
}

.dashboard .top .search-box input {
border: 0.8px solid  #f2f2fa;
background-color: #f2f2fa;
padding: 0 25px 0 60px;
border-radius: 10px;
height: 100%;
width: 100%;
color: #6688CC;
font-size: 15px;
font-weight: 400;
outline: none;
}

.dashboard .top .search-box i {
display: block;
position: absolute;

left:10px;
font-size: 28px;
z-index: 10;
top: 50%;
transform: translateY(-50%);
color: gray;
}





.title .text{
  font-size: 21px;
 
  color: #3B5D8F;
  margin-left: 12px;
 
  
}


.dashboard .dash-content{
    padding-top: 10px;
    margin-top:50px;
  

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
    font-size: 15px;
    font-weight: 600;
    color: black;
 
   
}
.activity-data .data .data-list{
   
    font-size: 14px;
    font-weight: 400;
    margin-top: 20px;
    white-space: nowrap;
   
  
}
   
}
    
}


.spacer {
    flex-grow: 0.1;
  }

.spacer1 {
    flex-grow: 0.1;
  }


  .mybtn1 {
    border:1px solid #3B5D8F;
    background-color: #3B5D8F;  /* blue background */
    color:white;
    padding: 10px 10px; /* add some padding for spacing */
   margin-top:20px;
    border-radius: 5px; /* round the button corners */
    transition: background-color 0.3s ease; /* transition for hover effect */
    font-size: 13px;
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
    width: 48%;
    height: 100%;
    background-color: #fff;
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
  font-size:15px;
  cursor:pointer;
  background-color :  rgb(248, 248, 252);
  border:none;
}

.m:hover{
  color:#788FB0;
}
.m2{
  margin-left:-50px;
}
.b{
  color :  rgb(248, 248, 252);
}
@media (max-width: 1150px) {
 
  .dashboard{
   
    left: 73px;
    width: calc(100% + 300px);
   
  }
  }
  @media (max-width: 1300px) {
 
    .modal{
     
      width: 100%;
     
    }
    }
  
  `;