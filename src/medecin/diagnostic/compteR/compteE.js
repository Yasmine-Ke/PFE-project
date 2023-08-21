import styled from "styled-components";
import QRCodeComponent from "../../qr";
import { useState ,useEffect} from 'react';
import updateC from "./updateC";
import UpdateC from "./updateC";
const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function LettreE(){






   
const [showupdateC,setShowupdateC]=useState('');
const handleShowupdateC = (compterupdate ,  dateupdate,  idRupdate ,updateidLC  , updatenamedC , idDCupdate) => {
  localStorage.setItem('updateC', JSON.stringify(compterupdate));
  localStorage.setItem('updateidLC', JSON.stringify(updateidLC));
  localStorage.setItem('updateidRC', JSON.stringify(idRupdate));
  localStorage.setItem('updatedateC', JSON.stringify(dateupdate));
  localStorage.setItem('updatenamedC', JSON.stringify(updatenamedC));
  localStorage.setItem('idDCupdate', JSON.stringify(idDCupdate));
  setShowupdateC(true);

};




  const handlePrint = () => {
    window.print();

  };
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
   
   
    
   
    const patient = JSON.parse(localStorage.getItem('patientD'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
    //info patient 
    const name = patient.id;
     const namee = patient.Name;
     const prenom = patient.prenom;
     const date=patient.date;
const genre=patient.genre;

     // name du medecin 
   //  const idM = localStorage.getItem('userprofil');
     
     const idmedecin= localStorage.getItem('idmedecin');// name du medecin 
     const nameM = localStorage.getItem('name');
     const [rdvs, setRdvs] = useState([]);
   
        
    useEffect(() => {
      async function fetchRdvs() {
       
         const { data: ordonnances, error: ordonnancesError } = await supabase

         .from('medecin')
         .select('id , name')
        
        ;
  
       
        if (ordonnancesError) {
          console.error('Error fetching ordonnances:', ordonnancesError);
          return;
        }
        const patientid = JSON.parse(localStorage.getItem('patientid'));
      
        const ids = ordonnances.map((ordonnance) => ordonnance.id);
        const { data: patientsData, error: patientsError } = await supabase
        .from('compteR').select('*')
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
        .select('idP , idM , idR ,date , time ,type , medecin(id , name).name as medecin_name')
        .in('idR', idR)
        .eq('idP', name)
        .eq('idM', idmedecin)
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
   
  
   
        function Dashboard({ ordonnance, rdv  , medecin}) {
         
          return (

           
            <div>
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

            <div class="date">
               
               <span class="data-title">Date du compteR : </span>
               <span class="data-list">{rdv.dateAjr} </span>
              
           </div>

           <div class="data1 id">
                
                <span class="data-title">Date N : </span>
                <span class="data-list">{date} </span>
               
            </div>
            <div class="data1 id">
                
                <span class="data-title">genre : </span>
                <span class="data-list">{genre} </span>
               
            </div>
            <div class="data id">
                
                <span class="data-title">Nom du Patient : </span>
                <span class="data-list">{namee} </span>
               
            </div>

            <div class="data id">
                
                <span class="data-title">Prenom : </span>
                <span class="data-list">{prenom} </span>
               
            </div>
            <div class="data">
                
                <span class="data-title">Contenu  : </span>
                <span class="data-list">{rdv.contenu} {rdv.idL}</span>
               
            </div>
            <div class="data">
                
                <span class="data-title">Reference de la lettre  : </span>
                <span class="data-list">{rdv.idL}</span>
               
            </div>
            
            <div class="data">
                
                <span class="data-title">nom du medecin  : </span>


<span class="data-list">{nameM}</span>
            
               
            </div>
            <div class="data">
                
                <span class="data-title">nom du medecin destinataire : </span>


<span class="data-list">{ordonnance.name}</span>
            
               
            </div>
                  
         
            
               </div>
              
               <button o class="mybutton"    onClick={() => handleShowupdateC(rdv.contenu , medecin.date , medecin.idR , rdv.idL , ordonnance.name , medecin.idM)} >modifier </button>
 
              
               </div>
                   
                   
                   ); }
    return(
        

<>
               {showupdateC ? (
              <UpdateC></UpdateC>
               ):(
               <>
            <StyledDivLettreE>
    {rdvs.map((medecin) => (
    <li key={medecin.id}>
  
      <ul>
        {medecin.rdvs.map((rdv) => (
            <>
          {rdv.rdvs.map((ordonnance) => (
    <Dashboard ordonnance={ordonnance} rdv={rdv} medecin={medecin} />

    ))}

        </>
    ))}
     
      </ul>
    </li>
  ))}
  </StyledDivLettreE>
  </>
     )}





</>

  
    );
}

const StyledDivLettreE = styled.div`

.print{
  margin-left:250px;
}
.mybutton{
  margin-top:11px;
    height: 30px;
    width: 100px;
    border-radius: 5px;
    border: none;
    color:white;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background:#3B5D8F;
  }
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