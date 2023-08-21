import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState , useEffect } from 'react';

export default function ListePatient(){
    const [patients, setPatients] = useState([]);
    const navigate=useNavigate();
 
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
    
    const [showCheckbox, setShowCheckbox] = useState(false);

    const handleDeleteClick = () => {
      setShowCheckbox(!showCheckbox);
  };
  

  const handleEdit = (patient) => {
    setShowFormM(true);
    // Sauvgarder le patient in localstorage 
    localStorage.setItem('patientData', JSON.stringify(patient));
    
    //rederiger vers la page update :)
   
  };




  const [selectedPatient, setSelectedPatient] = useState(null);

  const [showPopup, setShowPopup] = useState(Array(patients.length).fill(false));
  const handleShowPopup = (index) => {
    setShowPopup((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };
  
  const handleClosePopup = () => {
    setSelectedPatient(null);
  };
  


    return(

       

        <StyledDivListePatient>    

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
           
  
          <div class="activity1">
                 
                      
                            
                 <div class="activity-data1">
  
  
                
  <div >
  <div class="data">
  <span class="data-title">Id</span>
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
 
  </div>
  
  
  
  </>
  ))}
  </div>
  
  
  
  
  
  
             </div> 
             </div> 
  
  
  
  
  
  
  
  
  
  
                  </div>  
                  </section>
            
                </StyledDivListePatient  > 
         
           

    );
}


const StyledDivListePatient = styled.div`

    

i{
  color:#3B5D8F;
   margin-left:8px;
   }
   
   
     
 .points{
   margin-left:200px;
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
 @media (max-width: 1150px) {
 
  .dashboard{
   
    left: 73px;
    width: calc(100% + 300px);
   
  }
  }
    `;