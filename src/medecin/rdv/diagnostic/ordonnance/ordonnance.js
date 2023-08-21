import styled from "styled-components";
import { useState ,useEffect} from 'react';
import QRCodeComponent from "../../../qr";

const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function Ordonnance(){

   
  const [patients, setPatients] = useState([]);
  
  const [loading, setLoading] = useState(true);
 
  const patient = JSON.parse(localStorage.getItem('patientD'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
       //info patient 
       const name = patient.id;
        const namee = patient.Name;
        const date=patient.date;


        // name du medecin 
        //const idM = localStorage.getItem('userprofil');
        const idM = localStorage.getItem('idmedecin'); // name du medecin 
        const nameM = localStorage.getItem('name');
        const [rdvs, setRdvs] = useState([]);
  
        useEffect(() => {
          async function fetchRdvs() {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: ordonnances, error: ordonnancesError } = await supabase.from('ordonnance').select('*');
            if (ordonnancesError) {
              console.error('Error fetching ordonnances:', ordonnancesError);
              return;
            }
      
            const ids = ordonnances.map((ordonnance) => ordonnance.idR);
            const { data: patientsData, error: patientsError } = await supabase.from('Rdv').select('*').in('idR', ids)
            .eq('idM', idM)
            .eq('idP', name)
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
      
            setRdvs(patientsWithRdvs);
          }
      
          fetchRdvs();
        }, []);
    
  
  
  

    
   

  
      
     
  
     
   
        function Dashboard({ ordonnance, rdv }) {
          return (
            
            
              <div class="dash-info2">
              <div class="activity-data">
            <div class="qr">
            <QRCodeComponent></QRCodeComponent>
            </div>
            <div class="date">
     
     <span class="data-title">idR : </span>
     <span class="data-list">{rdv.idR} </span>
    
  </div>
              <div class="date">
     
     <span class="data-title">Date : </span>
     <span class="data-list">{ordonnance.dateAjr} </span>
    
  </div>
  <div class="data1 id">
     
     <span class="data-title">Date  naissance  : </span>
     <span class="data-list">{date} </span>
    
  </div>
  <div class="data id">
     
     <span class="data-title">Nom et prenom : </span>
     <span class="data-list">{namee}</span>
    
  </div>
  <div class="data id">
     
     <span class="data-title">L'identifiant du Patient: </span>
     <span class="data-list">{rdv.idP}</span>
    
  </div>
  <div class="data">
     
     <span class="data-title">Contenu  : </span>
     <span class="data-list">{ordonnance.contenu}    </span>
    
  </div>
  
  <div class="data">
     
     <span class="data-title">Le medecin  : </span>
     <span class="data-list">{nameM} </span>
  
    
  </div>
  
        
                   </div> 
                   </div> 
                   
                   
                   ); }
              
    return(
        

<StyledDivOrdonnance>
{rdvs.map((rdv) => (
    <>
      {rdv.rdvs.map((ordonnance) => (
        <Dashboard ordonnance={ordonnance} rdv={rdv} />
      ))}
    </>
  ))}

   </StyledDivOrdonnance>
    );
}


const StyledDivOrdonnance= styled.div`

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
     margin-top:40px;
   }
    `;