
import styled from 'styled-components';
import AddD from './addD';
import ModifierRdv from './modifierRdv';
import { useState , useEffect} from 'react';
import Diagnostic from './diagnostic/diagnostic';

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';


export default function ListeRdv(){
  const userprofil = localStorage.getItem('userprofil');
  const idmedecin = localStorage.getItem('idmedecin');
  const [patients, setPatients] = useState([]);

  
  const [medecin, setMedecin] = useState([]);

useEffect(() => {
  async function fetchPatients() {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: rdvs, error: rdvsError } = await supabase
      .from('Rdv')
      .select('*')
      .eq('idM', idmedecin);

    if (rdvsError) {
      console.error('Error fetching Rdvs:', rdvsError);
      return;
    }

    const ids = rdvs.map((rdv) => rdv.idP);
    const { data: patientsData, error: patientsError } = await supabase
      .from('Patient')
      .select('*')
      .in('id', ids);

    const names = patientsData.map((patient) => patient.Name);
    localStorage.setItem('patientNames', JSON.stringify(names));
    if (patientsError) {
      console.error('Error fetching Patients:', patientsError);
      return;
    }

    const idM = rdvs.map((rdv) => rdv.idM);
    const { data: medData, error: medError } = await supabase
      .from('medecin')
      .select('*')
      .in('id', idM);
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
    setMedecin(medecinWithRdvs);
  }

  fetchPatients();
}, []);






const [searchText, setSearchText] = useState('');

function handleSearch(event) {
  setSearchText(event.target.value);
}

const filteredRdvs = medecin.reduce((acc, curr) => {
  const matchingRdvs = curr.rdvs.filter(rdv => rdv.patientName?.toLowerCase().includes(searchText.toLowerCase()));
  if (matchingRdvs.length) {
    acc.push({
      medecin: curr,
      rdvs: matchingRdvs,
    });
  }
  return acc;
}, []);





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

const handleUpdateClick1= () => {
  setShowCheckbox1(!showCheckbox1);
};




const [showPopup, setShowPopup] = useState(false);


const [selectedtime, setSelectedtime] = useState(null);
const [selecteddate, setSelecteddate] = useState(null);
function handleShowPopup(time , date) {
    setSelecteddate(date);
    setSelectedtime(time);
    setShowPopup(true);
};


const handleClosePopup = () => {
  setShowPopup(false);
}
const handleEdit = (rdv) => {
  setShowFormM(true);
  // Sauvgarder le patient in localstorage 
  localStorage.setItem('patient', JSON.stringify(rdv));
  
  //rederiger vers la page update :)
 

};

const [showAdd, setShowAdd] = useState('');

const handleShowAdd = ( rdv  , patient) => {








  localStorage.setItem('rdv', JSON.stringify(rdv));
  localStorage.setItem('patientinfo', JSON.stringify(patient));
  setShowAdd(true);



};

const handleCloseAdd = () => {
  setShowAdd(false);
};
  
    
    return(
<>
     
{showAdd ? (
               
               <Diagnostic></Diagnostic>
              
           ) : 
      <StyledDivListeRdv>    

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
            <input type="text" placeholder="Rechercher..." value={searchText} onChange={handleSearch}/>
        </div>
      
        {filteredRdvs.map(filtered => (
      <div key={filtered.medecin.id}>
        <h2>{filtered.medecin.nom}</h2>
        {filtered.rdvs.map(rdv => (
          <div key={rdv.id}>
            <p>{rdv.patientName}</p>
            <p>{rdv.date}</p>
            <p>{rdv.heure}</p>
          </div>
        ))}
      </div>
    ))}
    </div>
   
              <div class="dash-content">
               
      


              <div class="activity ">
         
             
         <div class="activity-data">



         <div class="data id">
    
      

   <span class="data-title title this " >Liste des rendez-vous</span>

</div>
          {/*}   <div class="data names">
    
            
         
         <button class="mybtn1"  onClick={handleUpdateClick}>Envoyer lien meet</button>
           
        </div>   {*/} 
        


                  
     </div> 
     </div> 









                  <div class="activity1">
               
                    
                          
                          <div class="activity-data1">
      
      
                         
     <div >
  <div class="data">
    <span class="data-title">Référence du Rdv</span>
    <span class="data-title">Date du Rdv</span>
    <span class="data-title">Heure</span>
    <span class="data-title">Type</span>
    <span class="data-title">Nom Patient</span>
    <span class="data-title">Prénom Patient</span>
    <span class="data-title">Rdv</span>
    <span class="data-title"></span>
  </div>

  {patients.map((patient) => (
    <>
      {patient.rdvs.map((rdv, index) => {
        const { date, time, text } = rdv;
        const color = getColor(date, time, text);
        
        return (
          <div class="data mylist">
             <div >

  
   

</div>

            <span class="data-list">{rdv.idR}</span>
            <span class="data-list">{rdv.date}</span>
            <span class="data-list">{rdv.time}h</span>
           
            <span class="data-list">{rdv.type}</span>
            <span class="data-list">{patient.Name}</span>
            <span class="data-list">{patient.prenom}</span>
            <button class="data-list rdv" style={{ backgroundColor: color.color, color: '#6688CC', fontSize: '12px', letterSpacing: '1px' }}>
              {color.text}
            </button>
       
              <button class=" data-list bx bx-list-plus myicon" ></button>
             
            <>
     
     <tr key={patient.name}>
       {showCheckbox && (
         <td>
           <button className="bx bx-check icon  my" onClick={() => handleEdit(rdv)}></button>
           {showFormM && (
             <div className="popup" onClick={handleCloseModifier}>
               <div className="popup-modal-content" onClick={(e) => e.stopPropagation()}> 
                 <ModifierRdv></ModifierRdv>
               </div>
             </div>
           )}
         </td>
       )}
     </tr>
  
 </>

          </div>
  
        );
      })}
    </>
  ))}
</div>






                      </div> 
                      </div> 
                      
                      </div> 
                       
                      </section>
                  
                      </StyledDivListeRdv  > 
}
                      </>
    );
}

const StyledDivListeRdv = styled.div`

    


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
  margin: 0 30px;
  margin-left: 85px;
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
  left: 20px;

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
  font-size: 21px;
 
  color: #3B5D8F;
  margin-left: 12px;
 
  
}





.activity .activity-data{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
 
 
 
}

.activity-data .data{
  display: flex;
  flex-direction: row;
  margin-left:10px;
  white-space: nowrap;
  
}
.activity-data .data-title{
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
.activity-data .data .data-list{
  margin-right:100px;
  font-size: 17px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  white-space: nowrap;
  cursor:pointer;

 

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
  background-color:  rgba(0, 0, 0, 0.02);
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
  

.rdv{
  padding:10px 0 10px 0;
  border:none;
  border-radius:20px;
  
  }

  .myicon{
    background-color:rgb(248, 248, 252);
    border:none;
    color:#3B5D8F;

  cursor :pointer;


  }


  .activity1 .activity-data1 {
    display: table;
    width: 100%;

  }
  
  .activity-data1 .data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:15px;

  }
  .activity-data1 .mylist{
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding:10px;
  }
  .activity-data1 .data-title {
    flex-basis: 15%; /* adjust this value as needed */
    font-size: 14px;
    font-weight: 600;
    padding-right: 40px;

  }
  
  .activity-data1 .data .data-list {
    flex-basis: 20%; /* adjust this value as needed */
    font-size: 13px;
    font-weight: 400;

    white-space: nowrap;
    cursor:pointer;

  }
  @media (max-width: 1150px) {
 
    .dashboard{
     
      left: 73px;
      width: calc(100% + 300px);
     
    }
    }
    `;