import styled from 'styled-components';

import React from 'react';
import { useState} from 'react';

import Select from 'react-select';
import {  useEffect} from 'react';
import Calendar from './calender';




export default function  SpecM(){

  const [showC, setShowC] = useState(false);

  const handleShowC = () => {
    setShowC(true);
  };

  const handleCloseC = () => {
    setShowC(false);
  };



  
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



  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handletimeChange = event => {
    setheure(event.target.value);
  };
  const handlegenreChange = event => {
    setgenre(event.target.value);
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
   
   
    const fetchServices = async () => {
    // Send a GET request to your server to retrieve the user's information
    fetch('/service/SpecM')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error(error));
    };
      fetchServices();
  }, []); 




/*

  useEffect(() => {
    // RÃ©cupÃ©rer les services de Supabase
    const fetchServices = async () => {
      const { data: servicesData } = await supabase.from('service').select('*');
      setServices(servicesData);
    };
    fetchServices();
  }, []);*/


  useEffect(() => {
   
    const fetchDoctorsForService = async () => {
    // Send a GET request to your server to retrieve the user's information
    if (selectedService) {

      const selectedServiceA = encodeURIComponent(selectedService.value);
      fetch(`/medecin/SpecM/${selectedServiceA}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setDoctors(data);
        })
        .catch(error => console.error(error));
      
      }
      else {
        setDoctors([]);
      }
    };
      fetchDoctorsForService();
  }, [selectedService]); 

/*
  useEffect(() => {
    // RÃ©cupÃ©rer les mÃ©decins pour le service sÃ©lectionnÃ© de Supabase
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
*/
 

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
   
        <MyStyleSpecM> 
             
       <body>
        <div className="container">
        <div className="title">Prendre un Rdv : </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
             
  
              
           
          
              <div class="input-box">
           
          
           
             <label >Veuillez choisir un Service :</label>
           
             <Select
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
                   label: `${doctor.id} :${doctor.name} `,
                 }))}
               />
             </div>
           )}
            <button class="button" onClick={handleConfirm}>Suivant</button>
            {showC ? (
        <div className="modal-overlay" onClick={handleCloseC}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
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
      </MyStyleSpecM>

     
     
    )
}



const MyStyleSpecM = styled.div`
   
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;

}
   body{
      position: fixed;
      top:55px;
       left: calc(250px + calc(100% - 645px));
       width: calc(100% - (250px + calc(100% - 645px)) - 10px);
       height: 100%;
   }
      
    
     .container{
  margin-top:170px;
  margin-left:50px;
     }
      .container .title{
        font-size: 20px;
        font-weight: 500;
        position: relative;
       
        
        
      }
      .content form .user-details{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 0 12px 0;
       
        
      }
      form .user-details .input-box{
        margin-bottom: 30px;
        width:250px;
      
      
      }
   .button{
        height: 45px;
        margin: 30px 0;
       margin-left:150px;
      }
      .button{
       
        width: 100px;
        border-radius: 5px;
        border: none;
        color:white;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s ease;
        background:#3B5D8F;
      }  
      #service-select{
       margin-top:10px;
       margin-bottom:10px;
       border:1.2px solid #6688CC;
       border-radius:5.5px;
       background-color:#6688CC;
       outline: none;
      }
#doctor-select{
    margin-top:10px;
       margin-bottom:10px;
       border:1.2px solid #6688CC;
       border-radius:5.5px;
       background-color:#6688CC;
       outline: none;
}
     select{
       
        outline: none;
     
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
  


@media (max-width: 1150px) {
 

   
  body{
    position: relative;
    
    top:-100px;
    left: 200px;
  }
  }



      `;
    