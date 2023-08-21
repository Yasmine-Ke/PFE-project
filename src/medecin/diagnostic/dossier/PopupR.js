
import styled from 'styled-components';


import { useState , useEffect} from 'react';


export default function PopupR(){
  
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    // Retrieve the service value from local storage
    const name = localStorage.getItem('name');
    if (!name) {
      // If the service value is not found in local storage, redirect to the login page
      window.location.href = '/login';
      return;
    }
  
    // Send a GET request to your server to retrieve the list of appointments
    fetch(`/api/listerdv/${name}`)
      .then(response => response.json())
      .then(data => {
        setPatients(data);
        // Store the list of patient names in local storage
        const names = data.map(patient => patient.name);
        localStorage.setItem('patientNames', JSON.stringify(names));
      })
      .catch(error => console.error(error));
  }, []);


  //rdv color 


 
  

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
const handleEdit = (patient) => {
  setShowFormM(true);
  // Sauvgarder le patient in localstorage 
  localStorage.setItem('patient', JSON.stringify(patient));
  
  //rederiger vers la page update :)
 

};


  
    
    return(

       

      <StyledDivpopup>    

      <link
            href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
            rel="stylesheet"
          />
                  
                  <section>
            
                          <div class="activity-data3">
      
                          <div class="data3 id">
              
              <span class="d">c</span>
             
              {patients.map((patient) => (
                  
          
             <span class="bx bx-check  data-list3 my"  ></span>
             ))}
          </div>


                          <div class="data3 names">
                     
                              <span class="data-title3">Date du Rdv</span>
                             
                              {patients.map((patient) => (
                                  
                          
                             <span class="data-list3">{patient.date}</span>
                             ))}
                          </div>
                          <div class="data3 names">
                     
                     <span class="data-title3">Heur</span>
                    
                     {patients.map((patient) => (
                         
                 
                    <span class="data-list3">{patient.time}</span>
                    ))}
                 </div>
                        
                       
                          <div class="data3 status">
                              <span class="data-title3">Nom du patient</span>
                              {patients.map((patient) => (
        
        <span class="data-list3">{patient.name}</span>
        ))}
                          </div>



                        



                       
  
                        
       
                      </div>  
                      </section>
                  
                      </StyledDivpopup  > 
           

    );
}

const StyledDivpopup = styled.div`

    

    .activity-data3{
        padding:20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
       
    }
    
    .activity-data3{
        display: flex;
      
       
    }
    .activity-data3 .data3{
        display: flex;
        flex-direction: column;
       
       
       
    }
    .activity-data3 .data-title3{
        font-size: 14px;
        font-weight: 500;
        color: black;
     
       
    }
    .activity-data3 .data3 .data-list3{
       
        font-size: 13px;
        font-weight: 400;
        margin-top: 20px;
        white-space: nowrap;
       
      
    }


.my{

    background-color: #f2f2fa; 
    margin-bottom:6px;
  
    padding: 0.5px 0.5px; 
    border:1px solid #c7d4ed;
    border-radius: 2px; /* round the button corners */
   color:  #f2f2fa;
  }
  
  .my:hover{
  
    
   color:#b1c4eb;
  }
     
    
  .d{
    color:white;
    font-size:22px;
  }




.rdv{

    padding:4px 20px 5px 20px;
    border:none;
    border-radius:20px;
  
    }
    `;