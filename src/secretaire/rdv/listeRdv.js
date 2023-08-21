import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Profil from '../profil/profil';
import { useState , useEffect} from 'react';
import SpecM from './specM';
import Calendar from './calender';
import UpdateRdv from './calender2';
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function ListeRdv(){


   

 

      const [patients, setPatients] = useState([]);
      const [medecin, setmed] = useState([]);
      
   
      useEffect(() => {
        async function fetchPatients() {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const { data: rdvs, error: rdvsError } = await supabase.from('Rdv').select('* , medecin(name)');
          if (rdvsError) {
            console.error('Error fetching Rdvs:', rdvsError);
            return;
          }
      
          const ids = rdvs.map((rdv) => rdv.idP);
          const { data: patientsData, error: patientsError } = await supabase.from('Patient').select('*').in('id', ids);
          if (patientsError) {
            console.error('Error fetching Patients:', patientsError);
            return;
          }
      
          const idM = rdvs.map((rdv) => rdv.idM);
          const { data: medData, error: medError } = await supabase.from('medecin').select('*').in('id', idM);
          if (medError) {
            console.error('Error fetching Medecins:', medError);
            return;
          }
      
      
          const medecinWithRdvs = medData.map((medecin) => {
            const medecinRdvs = rdvs.filter((rdv) => rdv.idM === medecin.id);
            return {
              ...medecin,
              rdvs: medecinRdvs,
            };
           });
      
          const patientsWithRdvs = patientsData.map((patient) => {
            const patientRdvs = rdvs.filter((rdv) => rdv.idP === patient.id);
            return {
              ...patient,
              rdvs: patientRdvs,
            };
          });
      
          setPatients(patientsWithRdvs);
          setmed(medecinWithRdvs);
        }
      
        fetchPatients();
      }, []);
      
      const [showFormA, setShowFormA] = useState(false);

      const handleAjouterClick = () => {
        setShowFormA(true);
      };
    
      const handleCloseAjouter = () => {
        setShowFormA(false);
      };
  
      const [showFormM, setShowFormM] = useState(false);
  
    
    
      const handleCloseModifier = () => {
        setShowFormM(false);
      };
   
    const [showCheckbox, setShowCheckbox] = useState(false);

    const handleUpdateClick = () => {
      setShowCheckbox(!showCheckbox);
  };

  const [showCheckbox1, setShowCheckbox1] = useState(false);

  const handleDeleteClick = () => {
    setShowCheckbox1(!showCheckbox1);
};
 



  const [showPopup, setShowPopup] = useState(false);


  const handleDelete = async () => {
    const { error } = await supabase.from('Rdv').delete().eq('idR', selecteidR);
 
    if (error) {
      console.error('Error deleting data:', error.message);

    } else {
      window.location.reload();
      
      console.log('Data deleted successfully');
      window.location.reload();
      setShowPopup(false);
      
    }
  };

 
  const [selecteidR, setSelecteidR] = useState(null);
  function handleShowPopup(idR) {
      setSelecteidR(idR);
     
      setShowPopup(true);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
  }
 const handleEdit = (patient) => {
    setShowFormM(true);
    // Sauvgarder le patient in localstorage 
    localStorage.setItem('patient', JSON.stringify(patient));
    
    //rederiger vers la page update :)
   
  
  };






  //button clor date 
  function getColor(date, time, text) {
    const today = new Date();
    const [year, month, day] = date.split('-');
    const appointmentDate = new Date(year, month - 1, day);
    appointmentDate.setHours(time);
  
    if (appointmentDate < today) {
      return { color: '#ebebf4', text: 'Rdv passé' };
    } else if (appointmentDate.getDate() === today.getDate()) {
      const currentHour = today.getHours();
      if (time < currentHour) {
        return { color: '#ebebf4', text: 'Rdv passé' };
      } else if (time === currentHour) {
        return { color: '#ebebf4', text: 'Rdv en cours' };
      } else {
        return { color: '#ebebf4', text: 'Aujourdhui' };
      }
    } else {
      return { color: '#CAD3E5', text: 'Rdv à venir' };
    }
  }
  
 
   
  const [showC, setShowC] = useState(false);

  const handleShowC = (rdvidR) => {
    localStorage.setItem("idrendezvsupdate", rdvidR);
    setShowC(true);
  };

  const handleCloseC = () => {
    setShowC(false);
  };





   const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
    return(

       

      <StyledDivListeRdv>    
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
        <div class="search-box">
            <i class="bx bx-search icon"></i>
            <input type="text" placeholder="Rechercher..." 
            
          
            />
        </div>
       
    </div>
   
      
              <div class="dash-content">
               
      
                  <div class="activity">
               


                  <div class="activity-data1">



<div class="data id">



<span class="data-title title this " >Liste des rendez-vous</span>

</div>
<div class="data names">

   
<button class="mybtn1" onClick={handleAjouterClick}>Ajouter rdv</button>
                          {showFormA ? (
              <div className="modal-overlay" onClick={handleCloseAjouter}>
                <div className="modal" onClick={(e) => e.stopPropagation()}> 
                      <SpecM></SpecM>
                </div>
              </div>
            ) : null}
                         
</div>



         
</div> 







                      
                          
                          
                          <div class="activity-data">
      
      
                         
                         
     
                 <div class="data names">
                     
                     <span class="data-title">Date </span>
                    
                     {patients.map((patient) => (
                         
                         <>

                         {patient.rdvs.map((rdv) => (

                    <span class="data-list">{rdv.date}</span>
                    ))}
                     </>
                    ))}
                    </div>
                    <div class="data names">
                     
                     <span class="data-title">Heur</span>
                    
                     {patients.map((patient) => (
                         
                 
                         <>

                         {patient.rdvs.map((rdv) => (

                    <span class="data-list">{rdv.time}H</span>
                    ))}
                     </>
                    ))}
                 </div>
                          
                 <div class="data type">
  <span class="data-title">Medecin</span>
  {patients.map((patient) => (
                         
                         <>

                         {patient.rdvs.map((rdv) => (
        <span class="data-list">{rdv.medecin.name}</span>
      ))}
    </>
  ))}
</div>
                          <div class="data type">
                              <span class="data-title">Type</span>
                              {patients.map((patient) => (
        <>

        {patient.rdvs.map((rdv) => (

   <span class="data-list">{rdv.type}</span>
   ))}
    </>
        ))}
                          </div>

                          <div class="data status">
                              <span class="data-title">Nom patient</span>
                              {patients.map((patient) => (
        
        <>

        {patient.rdvs.map((rdv) => (

   <span class="data-list">{patient.Name}</span>
   ))}
    </>
        ))}
                          </div>
                          <div class="data status">
                              <span class="data-title">Prenom</span>
                              {patients.map((patient) => (
        
        <>

        {patient.rdvs.map((rdv) => (

   <span class="data-list">{patient.prenom}</span>
   ))}
    </>
        ))}
                          </div>
                         
                         
                          <div class="data names">
  <span class="data-title">Rdv</span>
  {patients.map((appointment, index) => {
    return (
      <>
        {appointment.rdvs.map((rdv) => {
          const { date, time, text } = rdv;
          const color = getColor(date, time, text);

          return (
            <div key={index}>
              <button class=" rdv" style={{ backgroundColor: color.color, color: '#6688CC', fontSize: '12px', letterSpacing: '1px' }}>
                {color.text}
              </button>
            </div>
          );
        })}
      </>
    );
  })}
</div>
      
<div class="data">
<span class="data-title"></span>
                          {patients.map((patient) => (
                             <>

                             {patient.rdvs.map((rdv) => (
                     
                     <td>
                               <i  style={{ fontSize: '13px'}} class="bx bxs-edit-alt m data-list"  onClick={() => handleShowC(rdv.idR) }></i>
        {showC ? (
        <div className="modal-overlay1" onClick={handleCloseC}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
          <UpdateRdv></UpdateRdv>
          </div>
        </div>
      ) : null}
        <button style={{ fontSize: '13px'}}  class="bx bx-trash-alt m  data-list" onClick={() => handleShowPopup(rdv.idR) }></button>
        {showPopup ? (

<div className="popup">
<div className="popup-modal-content">
<i className="bx bx-calendar-exclamation"></i>
<h2>Attention</h2>
<h3>êtes vous sure de supprimer le rdv ? </h3>
<div className="buttons">
<button   onClick={ handleDelete }>Oui</button>
<button onClick={ handleClosePopup }>Non</button>
</div>
</div>
</div>


) : null}
        
   </td>
                           
                    
                        ))}
                         </>
        
                   ))}       
                          </div>
                           
              
                         
             
                       
                      </div> 
                      </div> 
                      </div>  
                      </section>
                      </body>
                      </StyledDivListeRdv  > 
           

    );
}

const StyledDivListeRdv = styled.div`

body{
  overflow-x: auto;
  white-space: nowrap;
}

.activity .activity-data1{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
 
 
 
}

.activity-data1 .data{
  display: flex;
  flex-direction: row;
  margin-left:10px;
  white-space: nowrap;
  
}
.activity-data1 .data-title{
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
  
  
  




.dashboard .dash-content{
    padding-top: 10px;
    margin-top:50px;
  

}

.dash-content .title{
    display: flex;
    align-items: center;
   
    
}
.title .text{
  font-size: 21px;
 
  color: #3B5D8F;
  margin-left: 12px;
 
  
}




.dash-content .activity .activity-data{
  
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
 margin-top:30px;
   
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
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: flex-end;
   

  }
  
  .modal-overlay1 {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.01);
    display: flex;
    justify-content: flex-end;
   

  }
  
  .modal {
    overflow-y:auto;
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
  background-color:  rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
}

.popup-modal-content {
   animation: popup 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  background-color:  white;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.01);
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



.rdv{
  padding:3px 10px 3px 10px;
  border:none;
  border-radius:20px;
  cursor:pointer;
  font-size:18px;

  margin-top:13px;
  margin-bottom:3px;
  }



.m{
  color:  #3B5D8F;
 
margin-right:15px;
  cursor:pointer;
  background-color :  rgb(248, 248, 252);

  border:none;
}

.m:hover{
  color:#788FB0;
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
    `;