
import styled from 'styled-components';
import AjouterPatient from '../secretaire/patient/ajouterPatient';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';

export default function Liste(){
    const [patients, setPatients] = useState([]);
    const navigate=useNavigate();
    
    useEffect(() => {
        // Fetch user data from Express server
        const fetchUsers = async () => {
          const response = await fetch('/api/listepatient');
          const data = await response.json();
          
          setPatients(data);
        };
    
        fetchUsers();
      }, []);
    
    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
      setShowForm(true);
    };
  
    const handleCloseModal = () => {
      setShowForm(false);
    };

    const handleEdit = (patient) => {
        // Sauvgarder le patient in localstorage 
        localStorage.setItem('patientData', JSON.stringify(patient));
        
        //rederiger vers la page update :)
        navigate(`/update`);
      };
      
      
      

    const StyledDiv = styled.div`

    
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

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
    flex-grow: 0.3;
  }

.spacer1 {
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

  .mybtn2 {
    font-size: 15px;
    background-color: #6688CC; /* blue background */
    color: white; /* black text */
    padding: 13px 20px; /* add some padding for spacing */
    border:2px solid #6688CC;
    border-radius: 5px; /* round the button corners */
    transition: background-color 0.3s ease; /* transition for hover effect */
    font-family: 'Poppins', sans-serif;
  }





  

  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
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
  
  

    `;
    return(

       

        <StyledDiv>    
            
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
                    <span class="text">Liste des patients</span>
                    <div class="spacer"></div>
                    <button class="mybtn1" onClick={handleButtonClick}>ajouter patient</button>
                    {showForm ? (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
                <AjouterPatient></AjouterPatient>
          </div>
        </div>
      ) : null}
                    <div class="spacer1"></div>
                    <button class="mybtn2">modifier patient</button>
                    </div>
                    
                    <div class="activity-data">
                   
                   
                   
                    <div class="data actions">
                    <div class="data action">
                      <span class="data-title">Actions</span>
                      {patients.map((patient) => (
  <span class="data-list">
    <button class="mybtn2" onClick={() => handleEdit(patient)}>modifier patient</button>
  </span>
))}


           </div> </div>
                    <div class="data names">
               
                        <span class="data-title">Nom</span>
                        {patients.map((patient) => (
  
                       <span class="data-list">{patient.Name}</span>
                       ))}
                    </div>
                    <div class="data email">
                        <span class="data-title">Email</span>
                        {patients.map((patient) => (
  
  <span class="data-list">{patient.email}</span>
  ))}
                    </div>
                    <div class="data joined">
                        <span class="data-title">Telephone</span>
                        {patients.map((patient) => (
  
  <span class="data-list">{patient.tel}</span>
  ))}
                    </div>
                    <div class="data type">
                        <span class="data-title">Genre</span>
                        {patients.map((patient) => (
  
  <span class="data-list">{patient.genre}</span>
  ))}
                    </div>
                    <div class="data status">
                        <span class="data-title">Date de naissance</span>
                        {patients.map((patient) => (
  
  <span class="data-list">{patient.date}</span>
  ))}
                    </div>
                </div> 
                </div> 
                </div>  
                </section>
            
                </StyledDiv  > 
         
           

    );
}