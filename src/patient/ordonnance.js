import styled from "styled-components";
import QRCodeComponent from "../medecin/qr";
import { useState , useEffect } from 'react';
import Medecin from "../Directeur/Medecin/Medecin";
import Medicament from "./medicament";
const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function OrdonnanceP(){
  
  
  

  
    
 
    const [rdvs, setRdvs] = useState([]);
   
        
    useEffect(() => {
      async function fetchRdvs() {
       
         const { data: ordonnances, error: ordonnancesError } = await supabase.from('ordonnance').select('*');
        if (ordonnancesError) {
          console.error('Error fetching ordonnances:', ordonnancesError);
          return;
        }
        const patientid = JSON.parse(localStorage.getItem('patientid'));
       
        const ids = ordonnances.map((ordonnance) => ordonnance.idR);
        const { data: patientsData, error: patientsError } = await supabase
        .from('Rdv')
        .select('idP , idM , idR ,date , time ,type , medecin(id , name).name as medecin_name')
        .in('idR', ids)
        .eq('idP', patientid)
        ;
 
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
       const idy = patientsWithRdvs.map((ordonnance) => ordonnance.idM);
        const { data: medecinD, error: medecinError } = await supabase
        .from('medecin')
        .select('id , name')
        .in('id', idy)
       ;
 
       const medecinWithRdvs = medecinD.map((patient) => {
        const patientRdvs = patientsWithRdvs.filter((ordonnance) => ordonnance.idM === patient.id);
        return {
          ...patient,
          rdvs: patientRdvs,
        };
      });
        setRdvs(medecinWithRdvs);
      }
  
      fetchRdvs();
    }, []);
    const handlePrint = () => {
        const contentToPrint = document.getElementById("content-to-print");
        const contentToHide = document.getElementById("content-to-hide");
    
        // Set display property to none for all elements except the content to print
        contentToHide.style.display = "none";
        window.print();
    
        // Set display property back to default for all elements
        contentToHide.style.display = "block";
      };
    
   

        const [patients, setPatients] = useState([]);
        useEffect(() => {
          // Retrieve the user ID from local storage
          const patientid = localStorage.getItem('patientid');
          if (!patientid) {
            // If the user ID is not found in local storage, redirect to the login page
            window.location.href = '/patient/loginP';
            return;
          }
      
          // Send a GET request to your server to retrieve the user's information
          fetch(`/patientprofil/${patientid}`)
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error(error));
        }, []);
      
      
        
       
   
        const [showMP, setShowMP] = useState(false);
        const handleShowMP = (idCr , rdv) => {
          localStorage.setItem('rdvmed', JSON.stringify(idCr.idC));
          localStorage.setItem('rdvmedidR', JSON.stringify(rdv.idR));
          localStorage.setItem('rdvmedcontenu', JSON.stringify(idCr.contenu));
          localStorage.setItem('rdvmeddate', JSON.stringify(rdv.date));
          localStorage.setItem('rdvmedidP', JSON.stringify(rdv.idP));

          setShowMP(true);
        };
        

        function Dashboard({ ordonnance, rdv  , medecin}) {
         
          return (

           
            <div>
            <div id="content-to-print" class="activity-data ">
           
            <div class="qr">
            <QRCodeComponent></QRCodeComponent>
            </div>
            
                     <div class="date">
               
                <span class="data-title">Date du rdv : </span>
                <span class="data-list">{rdv.date} </span>
               
            </div>

            <div class="date">
               
               <span class="data-title">Date du compteR : </span>
               <span class="data-list">{ordonnance.dateAjr} </span>
              
           </div>

           <div class="data1 id">
                
                <span class="data-title">Date N : </span>
                <span class="data-list">{patients.date} </span>
               
            </div>
            <div class="data1 id">
                
                <span class="data-title">genre : </span>
                <span class="data-list">{patients.genre} </span>
               
            </div>
            <div class="data id">
                
                <span class="data-title">Nom et prenom : </span>
                <span class="data-list">{patients.Name}</span>
               
            </div>
            <div class="data">
     
     <span class="data-title">Contenu  : </span>
   
    
     { showMP ?(
    
    <Medicament>

  </Medicament>
    ):
    (
    <span class="data-list" style={{color:'blue'}}  onClick={() => handleShowMP(ordonnance , rdv )}>voir les prescription   </span>)
   }
  </div>

            
            <div class="data">
                
                <span class="data-title">nom du medecin : </span>


<span class="data-list">{medecin.name}</span>
            
               
            </div>
                  
 
                    
               </div>
              
               <button class='bx bxs-printer' onClick={handlePrint}></button>
 
 
               </div>
                   
                   
                   ); }
    return(
        

<StyledDivOrdonnanceP>
    <h3 id="content-to-hide">Mes Ordonnances </h3>
    {rdvs.map((medecin) => (
    <li key={medecin.id}>
  
      <ul>
        {medecin.rdvs.map((rdv) => (
          <>
    
          { showMP ?(
           
           <Medicament>
       
         </Medicament>
           ):
           (
             <>
          {rdv.rdvs.map((ordonnance) => (
    <Dashboard ordonnance={ordonnance} rdv={rdv} medecin={medecin} />

    ))}
    </>
  )}
  </>
))}
      </ul>
    </li>
  ))}
   





      

   </StyledDivOrdonnanceP>
    );
}


const StyledDivOrdonnanceP = styled.div`
.data1{
    margin-top:30px;
   }
   .data{
     margin-top:20px;
    
    }
    
   .date {
     margin-top:20px;
     margin-left: 133px;
   }
   .activity-data{
     border:1px solid rgb(159, 159, 159);
     padding:20px;
     margin-top:20px;
    
 
   }
   h3{
    margin-left:140px;
    margin-top:20px;
   }
    `;