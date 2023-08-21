import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AjouterPatient from './ajouterPatient';
import ModifierPatient from './modifierPatient';
import Profil from '../profil/profil';
import { useState , useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function ListePatient(){
    const [patients, setPatients] = useState([]);
    const navigate=useNavigate();
    const [showProfil, setShowProfil] = useState(false);

   
    const handleCloseProfil = () => {
      setSelectedPatient2(null);
    };

    useEffect(() => {
        // Fetch user data from Express server
        const fetchUsers = async () => {
          const response = await fetch('/api/listepatient');
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
    
  const handleEdit = (patient) => {
    setShowFormM(true);
    // Sauvgarder le patient in localstorage 
    localStorage.setItem('patientData', JSON.stringify(patient));
    
    //rederiger vers la page update :)
   
  };




  const [selectedPatient, setSelectedPatient] = useState(null);


  const [selectedPatient2, setSelectedPatient2] = useState(null);
  
  const handleClosePopup = () => {
    setSelectedPatient(null);
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

 

  
  const [searchText, setSearchText] = useState('');
  const fetchUsers = async () => {
    const response = await fetch('/api/listepatient');
    const data = await response.json();
    const filteredPatients = data.filter((patient) => {
      if (!patient || !patient.Name) {
        return false;
      }
      const name = patient.Name.toLowerCase();
      const searchTextLowerCase = searchText.toLowerCase();
      return name.includes(searchTextLowerCase);
    });
    
    setPatients(filteredPatients);
  };
  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


    return(

       

        <StyledDivListePatient>    
<body>
<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
            
            <section class="dashboard">
              
       
              <div class="top">
          
          <div class="title">
                 
               
                 <span class="text"> Centre médical de la mémoire</span>
                
               
                
                 </div>
                 <div>
                 <div class="search-box">
            <i class="bx bx-search icon"  onClick={fetchUsers}></i>
           
            <input type="text" placeholder="Rechercher..." value={searchText} onChange={(e) => setSearchText(e.target.value)} 
            
            onClick={fetchUsers}/>
                
        </div>
      <ul>
        {searchResults.map((patient) => (
          <li key={patient.id}>{patient.Name}</li>
        ))}
      </ul>
    </div>
          
      </div>
      
         
          <div class="dash-content">
           
          <div class="activity-data2">



<div class="data id">



<span class="data-title title this " >Liste des Patients</span>

</div>
<div class="data names">

   
<button class="mybtn1" onClick={handleAjouterClick}>ajouter Patient</button>
                          {showFormA ? (
              <div className="modal-overlay" onClick={handleCloseAjouter}>
                <div className="modal" onClick={(e) => e.stopPropagation()}> 
<AjouterPatient></AjouterPatient>
                </div>
              </div>
            ) : null}
                         
</div>



         
</div> 
          <div class="activity1">
                 
                      
                            
                 <div class="activity-data1">
  
  
                
  <div >
  <div class="data">
  <span class="data-title">Identifiant</span>
  <span class="data-title">Nom</span>
  <span class="data-title">Prenom</span>
  <span class="data-title">Date naissaance</span>
  <span class="data-title">Genre</span>
  <span class="data-title">Adresse</span>
  <span class="data-title">Contact</span>
  
  
  <span class="data-title"></span>
  </div>
  
  {patients.map((patient,index) => (
  <>
  
  
  
  
  
  <div class="data mylist">
    <div >
  
  
  
  
  </div>
  
   <span class="data-list">{patient.id}</span>
   <span class="data-list">{patient.Name}</span>
   <span class="data-list">{patient.prenom}</span>
   <span class="data-list">{patient.date}</span>
   <span class="data-list">{patient.genre}</span>
   
   <span class="data-list">{patient.adresse}</span><i class="bx bx-phone" onClick={() => setSelectedPatient(patient)}>  
  <i class="bx bx-envelope" onClick={() => setSelectedPatient(patient)}></i></i>
  {selectedPatient && selectedPatient.id === patient.id && (
    <div className="popup" onClick={handleClosePopup}>
      <div className="popup-modal-content">
        <div class="contact">
          <i class="bx bx-phone"></i>
          <span >Numero telephone : </span>
          <span class="data-list">{selectedPatient.tel}</span>
        </div>
        <div>
          <i class="bx bx-envelope"></i>
          <span>Adresse E-mail : </span>
          <span class="data-list">{selectedPatient.email}</span>
        </div>
      </div>
    </div>
  )}
 
   <>
  
  </>

<div class="data names">

<button class="bx bxs-edit-alt m" onClick={() => handleEdit(patient)}></button>
                           {showFormM ? (
        <div className="modal-overlay2" onClick={handleCloseModifier}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
                <ModifierPatient></ModifierPatient>
          </div>
        </div>
      ) : null}
                         
</div>
  <i class=" points bx bx-dots-vertical-rounded" onClick={() => setSelectedPatient2(patient)}/> 
 
                   
  {selectedPatient2 && selectedPatient2.id === patient.id && (
        <div className="modal-overlay" onClick={handleCloseProfil}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
             
  <div class="bottom-section">
   <div className='form'>

     
      <div className='info'> INFORMATIONS PERSONNEL</div>
      <div className='content'>
        <label >Nom : </label>
        <span >{selectedPatient2.Name}</span>
        <br/> <br/>
        <label >Prenom : </label>
        <span >{selectedPatient2.prenom}</span>
        <br/> <br/>
        <label >Date de naissance : </label>
        <span >{selectedPatient2.date}</span>
        <br/> <br/>
        <label >Genre : </label>
        <span >{selectedPatient2.genre}</span>
        <br/> <br/>
        <label >Adresse : </label>
        <span >{selectedPatient2.adresse}</span>
        <br/> <br/>
       </div>
     
      </div>
      <div className='form'>
   
      
      <div className='info'>CONTACTS</div>
      <div className='content'>
        <label>Télephone : </label>
        <span>{selectedPatient2.tel} </span>
        <br/> <br/>
        <label>Email : </label>
        <span> {selectedPatient2.email}</span>
        <br/> <br/>
        <label>Partenaire 1  : </label>
        <span>{selectedPatient2.Nompartenaire} </span>
        <br/> <br/>
        <label>Télephone : </label>
        <span>{selectedPatient2.Numpartenaire} </span>
        <br/> <br/>
        <label>Partenaire 2  : </label>
        <span>{selectedPatient2.nompartenaire2}  </span>
        <br/> <br/>
        <label>Télephone : </label>
        <span>{selectedPatient2. Numpartenaire2} </span>
       
     </div>
     
     </div>
  </div>
          </div>
        </div>
      )}
  </div>
  
  
 
  </>
  ))}
  </div>
  
  
  
  
  
  
             </div> 
             </div> 
  
  
  
  
  
  
  
  
  
  
                  </div>  
                  </section>
                  </body>
                </StyledDivListePatient  > 
         
           

    );
}


const StyledDivListePatient = styled.div`

    
 
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

i{
  color:#3B5D8F;
   margin-left:8px;
   }
   
   
  
 
.m{
  color:  #3B5D8F;
  font-size:20px;

  cursor:pointer;
  background-color :  rgb(248, 248, 252);
  margin-left:200px;
  border:none;
}

.m:hover{
  color:#788FB0;
}

 *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: 'Poppins', sans-serif;
  

 }
 body{
  overflow-x: auto;
  white-space: nowrap;
 
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
    
 
 
 
 .dashboard .dash-content{
   padding-top: 10px;
   margin-top:50px;
 
 
 }
 .dash-content .title{
   display: flex;
   align-items: center;
   margin-top: 20px ;
  
   
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
 .title .text{
 font-size: 19px;
 
 color: #3B5D8F;
 margin-left: 12px;
 
 
 }
 
 
 
 button{
 cursor:pointer;
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
 
 
 
 .popup {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color:  rgba(0, 0, 0, 0.3);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 9999;
 
 }
 
 .popup-modal-content {
  animation: popup 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
 background-color:  white;
 padding: 40px;
 border-radius: 5px;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.01);
 text-align: center;
 width:700px;
 }
 .my{
 
 background-color: #f2f2fa; 
 margin-bottom:6px;
 padding: 0.5px 0.5px; 
 border:1px solid #c7d4ed;
 border-radius: 2px; /* round the button corners */
 color:  #f2f2fa;
 margin-left:-50px;
 }
 
 .my:hover{
 
 
 color:#b1c4eb;
 }
 
 
 .myicon{
   background-color:rgb(248, 248, 252);
   border:none;
   color:#3B5D8F;
 
 cursor :pointer;
 
 
 }
 
 .modal-overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
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
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-end;
 

}

.modal {
  position: fixed;
  top: 0;
  right:0;
  left: auto;
  width: 48%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: slide-in 0.4s ease-in-out forwards;
 
}
@media (max-width: 1300px) {
 
  .modal{
   
    width: 100%;
   
  }
  }


@keyframes slide-in {
from {
  transform: translateX(100%);
}
to {
  transform: translateX(0);
}
}

 
 .activity1 .activity-data1 {
   display: table;
   width: 100%;
 
 }
 
 .activity-data1 .data {
   display: flex;
 margin-top:4px;
   align-items: center;
  
 
 }
 .activity-data1 .mylist{
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
   padding:15px 10px  15px 10px ;

 }
 
 
 
 .activity-data1 .data-title {
   flex-basis: 20%;
   font-size: 13px;
   font-weight: 600;
   padding-right: 40px;
 margin-top:20px;
 margin-bottom:10px;
 
 }
 
 .activity-data1 .data .data-list {
   flex-basis: 12.5%; /* adjust this value as needed */
   font-size: 14px;
   font-weight: 400;
   cursor:pointer;
 
 }







 .bottom-section {
  height: 120%;
  width:100%;
 
  position: relative;
 
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

@media (max-width: 1150px) {
 
  .dashboard{
   
    left: 73px;
    width: calc(100% + 300px);
   
  }
  }

    `;