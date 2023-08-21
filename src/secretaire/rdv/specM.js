import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState} from 'react';

import Select from 'react-select';
import {  useEffect} from 'react';
import Calendar from './calender';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);



export default function  SpecM(){

  const [showC, setShowC] = useState(false);
  const [idp, setidP] = useState('');
  const [prenom, setprenom] = useState('');
  const [id, setidpat] = useState('');
  const handleShowC = () => {
    setShowC(true);
  };

  const handleCloseC = () => {
    setShowC(false);
  };


  const handleEdit = (patient) => {
    setShowPopupP(false);
    // Sauvgarder le patient in localstorage 
    localStorage.setItem('idpatientrdv', JSON.stringify(patient.id));
  // setdateC(patient.date);
    setidP(patient.Name);
    setprenom(patient.prenom);
    setidpat(patient.id);
    //rederiger vers la page update :)
   
  
  };
    const MyStyle = styled.div`
   

    .container .title{
      font-size: 20px;
      margin-top:40px;
      font-weight: 600;
      position: relative;
      padding-bottom:20px;
      border-bottom:1.2px solid gray;
      margin-bottom:20px;
      
    }
    form .user-details .input-box{
      margin-bottom: 30px;
  
      
    
    }
    form .input-box span.details{
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
     
    }
    .user-details .input-box input{
      height: 35px;
      width: 100%;
      outline: none;
      font-size: 16px;
      border-radius: 5px;
      padding-left: 15px;
      border: 1.2px solid #D2D2D2;
      transition: all 0.3s ease;
      color:#3B5D8F ;
      
    }
    
    .popup-modal-content1 {

      background-color: white;
  margin-top:-45px;
      overflow-y: auto;
      width:650px;
      border-radius: 4px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      height:300px;
      max-height: 300px; /* set the maximum height to 500px */
      }


.popup1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
}







.activity1 .activity-data1{
  display: flex;

 
}
.activity-data1 .data1{
  display: flex;
  flex-direction: column;
  margin-left:50px;
 
 
 
}
.activity-data1 .data-title1{
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin-top: 5px;
 
}
.activity-data1 .data1 .data-list1{
 
  font-size: 14px;
  font-weight: 400;
  margin-top: 14px;
  white-space: nowrap;
 

}


.my{

background-color: #f2f2fa; 

border:1px solid #c7d4ed;
border-radius: 2px; /* round the button corners */
color:  #f2f2fa;
}

.my:hover{


color:#b1c4eb;
}
 

.d{
color:white;
}



.modal-overlay1 {
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

.modal1 {
  
     
  width: 100%;
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

.btns{
  display:flex;
margin-left:420px;
margin-bottom:70px;
 }
 form .button{
   height: 35px;
 

  
 }
 .button {
margin-top:30px;
   height: 100%;
   width: 100px;
   border-radius: 5px;
   border: none;
   color:white;
   font-size: 14px;
   font-weight: 500;
   letter-spacing: 1px;
   cursor: pointer;
   transition: all 0.3s ease;
   background:#3B5D8F;
 }
      `;
    
  
      const [showPopupP,setShowPopupP]=useState('');

      const handleShowPopupP = () => {
        setShowPopupP(true);
      }
    
    
    
      const handleClosePopupP = () => {
        setShowPopupP(false);
      }
    
       
    
    
    
    
    
    
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

      
  const [date, setDate] = useState('');
  const [heure, setheure] = useState('');
  const [name, setName] = useState('');
  const [genre, setgenre] = useState('');
  const insertPatient = async () => {
    try {
      // Insert patient data into Express server
      const response = await fetch('/api/insertrdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, genre,heure , Medecin: selectedDoctor.value ,Service: selectedService.value  })
      });

      const data = await response.json();
      console.log('data inserted');

     
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }
  };


  const handleSubmit = event => {
    event.preventDefault();
    if (name  && date  && genre) {
      insertPatient();
      setName('');
      setDate('');
      setgenre('');
    }
  };


  //service 


  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // RÃƒÂ©cupÃƒÂ©rer les services de Supabase
    const fetchServices = async () => {
      const { data: servicesData } = await supabase.from('service').select('*');
      setServices(servicesData);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    // RÃƒÂ©cupÃƒÂ©rer les mÃƒÂ©decins pour le service sÃƒÂ©lectionnÃƒÂ© de Supabase
    const fetchDoctorsForService = async () => {
      if (selectedService) {
        const { data: doctorsData } = await supabase
          .from('medecin')
          .select('*')
          .eq('Service', selectedService.value);
        setDoctors(doctorsData);
      } else {
        setDoctors([]);
      }
    };
    fetchDoctorsForService();
  }, [selectedService]);

 

  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
  };
  const handleServiceChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };
  function handleConfirm() {
    const selectedDoctorValue = selectedDoctor.value;
    const selectedserviceValue = selectedService.value;
    localStorage.setItem("selectedDoctor", selectedDoctorValue);
    localStorage.setItem("selectedservice", selectedserviceValue);
   
    setShowC(true);
  }
  
  
  
  
  

    return(
   
        <MyStyle> 
             
       <body>
        <div className="container">
        <div className="title">Ajouter un Rdv : </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
             
  
              
            <div className="input-box ">
                <span className="details">Patient</span>
                <input type="text" onClick={handleShowPopupP} required
          placeholder="Choisir un patient"   value={idp + ' ' + prenom + ' '+ id }
          onChange={(e) => setName(e.target.value)}/>
              </div>
              {showPopupP ? (

<div onClick={handleClosePopupP} className="popup1">
<div  onClick={(e) => e.stopPropagation()} className="popup-modal-content1">
<section >
       

       <div class="dash-content1">
        

           <div class="activity1">
        
                   <div class="activity-data1">


                 


                 


                   <div class="data1 id">
             
             <span class="d">c</span>
            
             {patients.map((patient) => (
                 
         
            <button class="bx bx-check icon data-list1 my" onClick={() => handleEdit(patient)} ></button>
            ))}
         </div>

                   <div class="data1 id">
              
              <span class="data-title1">Id</span>
             
              {patients.map((patient) => (
                  
          
             <span class="data-list1">{patient.id}</span>
             ))}
          </div>
          
                   <div class="data1 names">
              
                       <span class="data-title1">Nom</span>
                      
                       {patients.map((patient) => (
                           
                   
                      <span class="data-list1">{patient.Name}</span>
                      ))}
                   </div>
                   <div class="data1 names">
              
              <span class="data-title1">Prenom </span>
             
              {patients.map((patient) => (
                  
          
             <span class="data-list1">{patient.prenom}</span>
             ))}
          </div>

                 
                   
                  
                  
                  </div>
               </div> 
               </div>  
               </section>
           
</div>
</div>


) : null}
          
              <div class="input-box">
           
          
           
             <label >Veuillez choisir un Service :</label>
           
             <Select
             menuPortalTarget={document.body}
           class="service"
               id="service-select"
               value={selectedService}
               onChange={handleServiceChange}
               options={services.map((service) => ({ value: service.nom, label: service.nom }))}
             />
         
           {selectedService && (
             <div>
               <label htmlFor="doctor-select">Veuillez choisir un Médecin:</label>
               <Select
                 id="doctor-select"
                 value={selectedDoctor}
                 onChange={handleDoctorChange} 
                 options={doctors.map((doctor) => ({
                   value: doctor.id,
                   label: `${doctor.name} `,
                 }))}
               />
             </div>
           )}
            <button class="button" onClick={handleConfirm}>Suivant</button>
            {showC ? (
        <div className="modal-overlay" onClick={handleCloseC}>
          <div className="modal1" onClick={(e) => e.stopPropagation()}> 
            <Calendar></Calendar>
          </div>
        </div>
      ) : null}
                   </div>
             
                 
             


             
</div>


         
          </form>
        </div>
      </div>
      </body>
      </MyStyle>

     
     
    )
}