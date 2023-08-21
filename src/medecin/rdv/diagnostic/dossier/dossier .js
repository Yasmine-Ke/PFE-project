import { useState ,useEffect} from 'react';
import styled from 'styled-components';
import FormA from '../formA';
import FormM from '../formM';
import AddD from './addD';

const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);









export default function Dossier(){
 
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
 
  
 
       
    

        const patient = JSON.parse(localStorage.getItem('patientD'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
        const name = patient.id;
        const genre = patient.genre;
        const date= patient.date;
        const Name=patient.Name;
        const prenom=patient.prenom;
        const num=patient.tel;
        const mail=patient.email;
const adresse=patient.adresse;
       // const idM = localStorage.getItem('userprofil');
        const idM = localStorage.getItem('idmedecin'); // name du medecin 
        const nameM = localStorage.getItem('name');
        const [rdvs, setRdvs] = useState([]);
  
        useEffect(() => {
          async function fetchRdvs() {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: ordonnances, error: ordonnancesError } = await supabase.from('DossierM').select('*');
            if (ordonnancesError) {
              console.error('Error fetching ordonnances:', ordonnancesError);
              return;
            }
      
            const ids = ordonnances.map((ordonnance) => ordonnance.idR);
            const { data: patientsData, error: patientsError } = await supabase.from('Rdv').select('*').in('idR', ids)
            .eq('idM', idM)
            .eq('idP', name);
            if (patientsError) {
              console.error('Error fetching Rdvs:', patientsError);
              return;
            }
      
            const patientsWithRdvs = patientsData.map((patient) => {
              const patientRdvs = ordonnances.filter((ordonnance) => ordonnance.idR === patient.idR);
              return {
                ...patient,
                rdvs: patientRdvs,
              };
            });
      
            setRdvs(patientsWithRdvs);
          }
      
          fetchRdvs();
        }, []);
    

  
  const handleShowPopup = () => {
    
    setShowPopup(true);
 
  };


  const handleClosePopup = () => {
    setShowPopup(false);
  }



  function handleShowAdd(event) {
    event.preventDefault();
    setShowAdd(true);
  }
  

  const handleCloseAdd = () => {
    setShowAdd(false);
  }



   

  
   
    
  
 
   return(

      

       <StyledDivdossier>    

<link
     href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
     rel="stylesheet"
   />
           
           <section class="dashboard">
             
       <div class="top">
      
       <div class="title">
      
                             
                     
                             <span class="text">{Name} {prenom} </span>
                        
            
                    
                  </div>
         
         
       </div>
     
       <div class="dash-info1">
        
     

                   <div class="activity-data3">

                   <div class="data id">
                  
              
              
                      <section class="data-title">ID</section>
             
           
                    
                    
            
                     
  
  <span class="data-list">{name}</span>

                  
          </div>
                   <div class="data names">
              
                       <span class="data-title">Nom du Patient </span>
                       <span class="data-list">{Name}</span>
                      
  
 
  
                      
                   </div>
                   <div class="data names">
              
                       <span class="data-title">Prénom</span>
                       <span class="data-list">{prenom}</span>
                      
  
 
  
                      
                   </div>
                   <div class="data type">
                     
                   <span class="data-title">Genre</span>
                   <span class="data-list">{genre}</span>
                
                    
            
                     
  
 
                  
                   </div>
                   <div class="data status">
                       <span class="data-title">Date de naissance</span>
                       
             
                    
            
                     
  
  <span class="data-list">{date}</span>

                  
                   </div>
                   <div class="data status">
                       <span class="data-title">Adresse</span>
                      
               
                    
                      
  
  <span class="data-list">{adresse}</span>
 
                  
                   </div>
             
                   <i class="bx bx-phone" onClick={handleShowPopup}>  <i class="bx bx-envelope"></i></i>
                    {showPopup ? (
                  
                   <div className="popup" onClick={handleClosePopup}>
             <div className="popup-modal-content" >
       
             <div class="contact">
                        <i class="bx bx-phone"></i>
                        <span >Numero telephone : </span>
                      
  
  <span class="data-list">{num}</span>
  
                       
                       
                    </div>
                    <div>
                    <i class="bx bx-envelope"></i>
                        <span>Adresse E-mail : </span>
                      
  
  <span class="data-list">{mail}</span>
  
                    </div>
                    
             </div>
           </div>
                  ) : null}
               </div> 
               <div class="dash-info2">
               <div class="activity-data">

<div class="data type">
<span class="data-title">Mode de vie </span>
   <span class="data-list"> Non mariée </span>
           
</div>

<div class="data type">
<span class="data-title">Antecedant medicals  </span>
   <span class="data-list"> Allérgie </span>
           
</div>
   </div>
     </div>

               </div> 
              
       <div class="links">
           
          
       {rdvs.map((rdv) => (
    <>
     
    </>
  ))}





  
     </div> 

     {showAdd ? (
      <>
             <button href="#" class="bx bx-x x" onClick={handleCloseAdd}></button>
           <AddD></AddD>
           </>
            ) : 
           

            <button class="bx bx-plus add" onClick={handleShowAdd}></button>

           
            }
     
                </section>
            
                </StyledDivdossier  > 
         
           

    );
}
const StyledDivdossier = styled.div`

   

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
       
    }
    
    
    .dashboard{
      background-color :  rgb(248, 248, 252);
        position: relative;
        top:13px;
        left: 250px;
        width: calc(100% - 630px);
        height: calc(100vh - 13px);
        padding: 10px 0px;
        border-right:5px solid  rgb(248, 248, 252);
    border-left:5px solid  rgb(248, 248, 252);
    }
    .dashboard .top{
        position: fixed;
        top:0;
        height:50px;
        left: 255px;
        display:flexbox;
        width: calc(100% - 250px);
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background-color:white;
       
    
       
    }
    
    .dashboard .dash-info1{
        margin-top:40px;
        background-color:white;
       
      
    }
    
    
    
     .title .text{
        font-size: 17px;
        font-weight: 500;
        color: #3B5D8F;
        
    
        
    }
    
    
    
     .activity-data{
      
      background-color:white;
       
    display: grid;
    grid-template-columns: repeat(3, 1fr);
   
    padding:10px;
    
    }
    
    
    .activity-data .data
    ,.activity-data3 .data{
        display: flex;
        flex-direction: column;
        white-space: nowrap;
       
       
       
    }
    .activity-data2{
       
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        background-color:white;
       
       
       
    
    }
    
    .activity-data3{
       padding:10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .data-title{
        font-size: 14px;
        color:black;
        font-weight: 500;
        width: calc(100% - 630px);
        margin-top:10px;
       
       
    }
     .data .data-list{
       
        font-size: 12px;
        margin-bottom:10px;
      
       
      
    }
     
       .links{
       
        letter-spacing:1px;
       
        cursor:pointer;
    
        color:#3B5D8F;
         
        padding:10px;
        background-color :  rgb(248, 248, 252);
       }
       .link{
        margin-left:30px;
       }
    .icon{
    margin-left:650px;
    }
    
    .bx{
     
    padding: 0px 20px 0px 0px ;
    font-size:23px;
    cursor:pointer;
    color:gray;
    
    }
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color:  rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      
    }
    
    .popup-modal-content {
       animation: popup 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      background-color:  rgb(248, 248, 252);
      padding: 50px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      text-align: center;
     
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
     
    .contact{
    margin-right:120px;
    
    }
    
    
    
    .add{
      margin-top:30px;
      margin-bottom:20px;
      margin-left:380px;
      border-radius:50%;
      padding:10px;
      background-color :  rgb(248, 248, 252);
    color:  rgb(181, 181, 203);
    border:1px solid   rgb(181, 181, 203);
    }
    .x{
      position:absolute;
      margin-top:15px;
      margin-left:720px;
      background-color :  rgb(248, 248, 252);
      border:none;
    }

   `;