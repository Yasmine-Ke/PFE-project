import { useState } from 'react';
import styled from 'styled-components';
import QRCodeComponent from "../medecin/qr";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Showlettre() {
  
    const idL= JSON.parse(localStorage.getItem('lettre'));
   
    const [patients, setPatients] = useState([]);
  
    useEffect(() => {
        // Fetch user data from Express server
        const fetchUsers = async () => {
  
      const { data, error: uploadError } = await supabase
        .from('Lettre').select('*')
        .eq('idC', idL);
  
      if (uploadError) {
        console.log(uploadError);
        return;
      }
  
     
      setPatients(data);
    };

    fetchUsers();
  }, []);
  
  
    return (
      <StyledDiv>

     
       
        <ul>
          {patients.map((patient) => (
            <li key={patient.idC}>
                
              
              
                <div class="style">
                <div  class="activity-data ">
                <div class="qr">
                <QRCodeComponent></QRCodeComponent>
                </div>
                <div class="data1">
                   
                   <span class="data-title">Date  : </span>
                   <span class="data-list">{patient.dateAjr} </span>
                  
               </div>
    
              
               
                <div class="data ">
                    
                    <span class="data-title">Contenu  : </span>
              <span class="data-list"> {patient.contenu} </span> 
             
                </div>
                <div class="data">
                    
                  
    
    <span class="data-list"></span>
                
                   
                </div>
                      </div>
                      </div>
                
</li>

            
          ))}
        </ul>
    
      </StyledDiv>
    );
  }
  






  
 

 
   
  
  


  const StyledDiv = styled.div`

  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
.style{

  font-family: 'Poppins', sans-serif;

  overflow-y: auto;
width:800px;
margin-left:250px;
  background-color : white;
 
}


  .data1{
      margin-top:30px;
      margin-left:240px;
      margin-bottom:40px;
     }
     
     .date {
     margin-top:-123px;
     margin-bottom:120px;
       margin-left: 240px;
     }
     .activity-data{
       border:1px solid rgb(159, 159, 159);
       padding:20px;
       margin-top:40px;
     }




button {
  height: 35px;
 margin-left:405px;
 margin-top:20px;
  width: 130px;
  border-radius: 5px;
  border: none;
  color:white;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  background:#3B5D8F;
  
}
      `;