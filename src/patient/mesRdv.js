import { useState ,useEffect} from 'react';
import styled from 'styled-components';
 import UpdateRdv from './calender2';


export default function MesRdv(){
   



  const [showC, setShowC] = useState(false);

  const handleShowC = (rdvidpatient) => {
   localStorage.setItem("rdvidpatient" ,rdvidpatient );
    setShowC(true);
  };

  const handleCloseC = () => {
    setShowC(false);
  };


  const [showPopup, setShowPopup] = useState(false);
  
     
/*
  useEffect(() => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // If the user ID is not found in local storage, redirect to the login page
      window.location.href = '/login';
    
      return;
    }

    // Send a GET request to your server to retrieve the user's information
    fetch(`/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, []); 

       
          const [patients, setPatients] = useState([]);
  
          useEffect(() => {

            async function fetchPatients() {
              const patient = JSON.parse(localStorage.getItem('patientid'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
             
              const supabase = createClient(supabaseUrl, supabaseKey);
              const { data: rdvs, error: rdvsError } = await supabase.from('Rdv').select('*')
              .eq('idP', patient);
              if (rdvsError) {
                console.error('Error fetching Rdvs:', rdvsError);
                return;
              }
        
              const ids = rdvs.map((rdv) => rdv.idM);
              const { data: patientsData, error: patientsError } = await supabase.from('medecin').select('*')
              .in('id', ids)
             
             
              ;
              
              if (patientsError) {
                console.error('Error fetching Patients:', patientsError);
                return;
              }
        
              const patientsWithRdvs = patientsData.map((patient) => {
                const patientRdvs = rdvs.filter((rdv) => rdv.idM === patient.id);
                return {
                  ...patient,
                  rdvs: patientRdvs,
                };
              });
        
              setPatients(patientsWithRdvs);
            }
        
            fetchPatients();
          }, []);
      
          */
          const [patients, setPatients] = useState([]);
  
        

          
           
              useEffect(() => {
                // Retrieve the user ID from local storage
                const patient = JSON.parse(localStorage.getItem('patientid'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
                if (!patient) {
                  // If the user ID is not found in local storage, redirect to the login page
                  window.location.href = '/login';
                
                  return;
                }
            
                // Send a GET request to your server to retrieve the user's information
                fetch(`/mesrdv/${patient}`)
                  .then(response => response.json())
                  .then(data => setPatients(data))
                  .catch(error => console.error(error));
              }, []); 






  const [selectedtime, setSelectedtime] = useState(null);
  const [selecteddate, setSelecteddate] = useState(null);
  function handleShowPopup(idr) {
      setSelecteddate(idr);
    
      setShowPopup(true);
  };



  const handleClosePopup = () => {
    setShowPopup(false);
  }


  const handleDelete = async () => {
   // const { error } = await supabase.from('Rdv').delete().eq('idR', selecteddate);
 
  
        const response = await fetch(`/deleteRdv/${selecteddate}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error deleting data');
        }
  
        console.log('Data deleted successfully');
        window.location.reload();
        // Effectuez les actions nécessaires après la suppression des données
        setShowPopup(false);
     
  };




    return(

       

      <StyledDivMesRdv>    

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
         <body>
      <div class="page-wrapper">
    
     
    

      <>
      {patients.map((patient) => (
           
         

          
               
          <div class="column">
           
            <div class="section">
            <div class="page-wrapper">
    
      
      </div>
            </div>
            <div class="section">
            <div class="page-wrapper">
    
        <div class="row">
          <div class="column">
           
            <div >
              <h4>Date du rdv </h4>
              <p class="bx bx-calendar icon">{patient.date}</p>
            </div>
           
          </div>
          <div class="column">
           
            <div >
         
              <h4 >Heure du Rdv</h4>
              <p class="bx bx-time-five icon">{patient.time}:00h</p>
            </div>
            
          </div>
          <div class="column">
         
            <div >
              <h4>Medecin</h4>
              <p> {patient.medecin.name}</p>
            </div>
            
          </div>
          <div class="column">
         
         <div >
           <h4>service</h4>
           <p> {patient.medecin.Service}</p>
         </div>
         </div>
        
         
          {/*}  <div class="column">
         
         <div >
           <h4>Type</h4>
           <p>{patient.type} </p>
      </div> 
      </div>   {*/}
       <div class="column">
         
        
       <i class="bx bxs-edit-alt m" onClick={() => handleShowC(patient.idR)}></i>
        {showC ? (
        <div className="modal-overlay" onClick={handleCloseC}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
           <UpdateRdv></UpdateRdv>          </div>
        </div>
      ) : null}
        
         <i class="bx bx-trash-alt m" onClick={() => handleShowPopup(patient.idR)}></i>
         {showPopup ? (
             
             <div className="popup">
             <div className="popup-modal-content">
               <i className="bx bx-calendar-exclamation"></i>
               <h2>Attention</h2>
               <h3>Etes vous sure de supprimer le rdv ? </h3>
               <div className="buttons">
                 <button onClick={handleDelete}>Oui</button>
                 <button onClick={ handleClosePopup }>Non</button>
               </div>
             </div>
           </div>
             
            
            ) : null}
       
         
       </div>
       
        </div>
      </div>
            </div>
            <div class="section">
            <div class="page-wrapper">
    
      
      </div>


            </div>
           
          </div>
          
          ))}
              </>
          
         
      
      </div>
    </body>
                      </StyledDivMesRdv  > 
           

    );
}



const StyledDivMesRdv = styled.div`

    


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}

  
  .icon{
    color:#3B5D8F;
    
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    padding:10px;
  }
  
  .column {
    flex: 1;
    padding: 0 10px;
  }
  
  .section {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-left:4px solid #CAD3E7;
    margin-bottom: 20px;
    width:800px;
   
  }
  
p{
    color:rgb(55, 55, 55);
}



.m{
    color:  #3B5D8F;
    font-size:25px;
   
    margin-top:10px;
    cursor:pointer;
}

.m:hover{
    color:#788FB0;
}







.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:  rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    
  }
  
  .popup-modal-content {
     animation: popup 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    background-color: white;
    padding: 50px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  

body{
    padding:30px;
  }
  

  .modal-overlay {
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
    
       
    width: 50%;
    height: 100%;
    background-color: white;
  justify-content: center;
 
    padding: 20px;
  animation: slide-in 0.4s ease-in-out forwards;
  overflow-y: auto;
  }


  @keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
  
    `;