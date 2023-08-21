import styled from "styled-components";
import QRCodeComponent from "../medecin/qr";
import { useState ,useEffect} from 'react';
import FormI from "./formI";
import NavbarB from "./navbarB";
const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function LettreB(){

   
   
   
    
   
   

     // name du medecin 
     const idM = localStorage.getItem('idbio'); // name du medecin  idbio
     const nameM = localStorage.getItem('name');
     const [rdvs, setRdvs] = useState([]);
   
        
    useEffect(() => {
      async function fetchRdvs() {
       
         const { data: ordonnances, error: ordonnancesError } = await supabase

         .from('medecin')
         .select('id , name')
     //  .eq('id ' , idM)
        
        ;
  
       
        if (ordonnancesError) {
          console.error('Error fetching ordonnances:', ordonnancesError);
          return;
        }
        const patientid = JSON.parse(localStorage.getItem('patientid'));
      
        const ids = ordonnances.map((ordonnance) => ordonnance.id);
        const { data: patientsData, error: patientsError } = await supabase
        .from('Lettre').select('*')
        .eq('idMD ' , idM)
        .in('idMD', ids);

 
        if (patientsError) {
          console.error('Error fetching Rdvs:', patientsError);
          return;
        }
       
        
        const patientsWithRdvs = patientsData.map((patient) => {
          const patientRdvs = ordonnances.filter((ordonnance) => ordonnance.id === patient.idMD);
          return {
            ...patient,
            rdvs: patientRdvs,
          };
        });
        const idR = patientsData.map((ordonnance) => ordonnance.idR);
        const { data: medecinD, error: medecinError } = await supabase
        .from('Rdv')
        .select('idP , idM , idR ,date , time ,type , Patient(Name , prenom , genre , date) , medecin(name)')
        .in('idR', idR)
        
        ;
       const medecinWithRdvs = medecinD.map((patient) => {
        const patientRdvs = patientsWithRdvs.filter((ordonnance) => ordonnance.idR === patient.idR);
        return {
          ...patient,
          rdvs: patientRdvs,
        };
      });
        setRdvs(medecinWithRdvs);
      }
  
      fetchRdvs();
    }, []);
   
  
    const[form,setForm]=useState('');
    
    const handleForm= (medecin  , rdv ) => {
      setForm(true);
      localStorage.setItem('idrdv', JSON.stringify(medecin.idR));
    localStorage.setItem('idlettre', JSON.stringify(rdv.idC));
       
      };
    
      const handleCloseForm = () => {
        setForm(false);
      };
    const StyledDiv = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
.style{

    font-family: 'Poppins', sans-serif;
    position:relative;
    overflow-y: auto;
    top: -40px;
  
   
   
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
        function Dashboard({ ordonnance, rdv  , medecin}) {
         
          return (
<>  
          
                            <div class="style">
                <div id="content-to-print" class="activity-data ">
              
                <div class="qr">
                <QRCodeComponent></QRCodeComponent>
                </div>
                <div class="date">
                   
                   <span class="data-title">ID rdv : </span>
                   <span class="data-list">{medecin.idR} </span>
                  
               </div>
                         <div class="date">
                   
                    <span class="data-title">Date du rdv : </span>
                    <span class="data-list">{medecin.date} </span>
                   
                </div>
    
                <div class="data1">
                   
                   <span class="data-title">Date  : </span>
                   <span class="data-list">{rdv.dateAjr} </span>
                  
               </div>
    
               <div class="data id">
                    
                    <span class="data-title">Date de naissance : </span>
                    <span class="data-list">{medecin.Patient.date}</span>
                   
                </div>
                <div class="data id">
                    
                    <span class="data-title">genre : </span>
                    <span class="data-list">{medecin.Patient.genre} </span>
                   
                </div>
                <div class="data id">
                    
                    <span class="data-title">Le nom du patient : </span>
                    <span class="data-list"> {medecin.Patient.Name}</span>
                   
                </div>
                <div class="data id">
                    
                    <span class="data-title">Prenom : </span>
                    <span class="data-list"> {medecin.Patient.prenom}</span>
                   
                </div>
                <div class="data ">
                    
                    <span class="data-title">Contenu  : </span>
              <span class="data-list">{rdv.contenu} </span> 
                   
                </div>
                
                <div class="data">
                    
                    <span class="data-title">Nom du medecin qui a envoyer la lettre : </span>
    
    
    <span class="data-list">{medecin.medecin.name}</span>
                
                   
                </div>
                <div class="data">
                    
                    <span class="data-title">Nom du medecin destinataire : </span>
    
    
    <span class="data-list">{ordonnance.name}</span>
                
                   
                </div>
                      
    
                        
                   </div>
                  
                   { form ? (
             <FormI></FormI>
                            ): 
    <button onClick={() => handleForm(medecin , rdv  )}>Ajouter bilan</button>

     
    }
                   </div>
                          
           
                   
           </>
                   ); }
    return(
        

<StyledDiv>

    {rdvs.map((medecin) => (
    <li key={medecin.id}>
  
      <ul>
        {medecin.rdvs.map((rdv) => (
            <div class="bilan">
          {rdv.rdvs.map((ordonnance) => (
            
    <Dashboard ordonnance={ordonnance} rdv={rdv} medecin={medecin} />

    ))}

        </div>
    ))}
     
      </ul>
    </li>
  ))}
   





        

   </StyledDiv>
   

    );
}

