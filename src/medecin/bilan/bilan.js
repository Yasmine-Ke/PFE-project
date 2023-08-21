import { useState , useEffect } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';






const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
 export default function Bilan(){
    const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
    const [fileData, setFileData] = useState(null);
    
    const [rdvs, setRdvs] = useState([]);
   
        
    useEffect(() => {
      //const idMedecin = localStorage.getItem('userprofil')
      const idMedecin = localStorage.getItem('idmedecin')
      async function fetchRdvs() {
        
         const { data: ordonnances, error: ordonnancesError } = await supabase
         .from('bilanM').select('* , Lettre(dateAjr) ')
        



        
        ;
  
       
        if (ordonnancesError) {
          console.error('Error fetching ordonnances:', ordonnancesError);
          return;
        }
        const patientid = JSON.parse(localStorage.getItem('patientid'));
      
        const ids = ordonnances.map((ordonnance) => ordonnance.idR);
        const { data: patientsData, error: patientsError } = await supabase
        .from('Rdv')
        .select('idP , idM , idR ,date , time ,type , Patient(Name , prenom)')
        .in('idR', ids)
      .eq('idM', idMedecin)
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
        const idM = patientsData.map((ordonnance) => ordonnance.idM);
        const { data: medecinD, error: medecinError } = await supabase
       
        .from('medecin')
        .select('id , name')
        .in('id', idM)


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
   
    
    const Navbar = styled.div`

    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    
    }
    
    
    
    .mynav{
        position: fixed;
        top: 0;
        left: 50px;
        height: 100%;
        width: 350px;
        padding: 15px 14px;
        background-color :  rgb(248, 248, 252);
        overflow : auto;
       
       
    }
    .historique{
        display: flex;
       margin-top:40px;
       margin-left:100px;
       font-size: 20px;
       color:#3B5D8F;
       
    
    }
 .items{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
    
       
    }
    .items li{
        list-style: none;
        margin-bottom:12px;
       
       
    }

.items {
  margin-top: 30px;
  overflow-y: auto; 
  max-height: calc(100vh - 60px); 
}
    
    .items .box{
        border-top: 1px solid #e6e5e5;
        padding-top:20px;
        padding-bottom:20px;
       
       
       
       
    }

    .color{
        color: #707070;
    }
    
    
    
    



.color1{
    color:black;
}



        `;
return(
    <Navbar>

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <div class="mynav">
        <div class="historique">
     
           
            <span>Mes bilans</span>
           </div>
          
       
        
        <div class="items">
            <ul >
           
            {rdvs.map((medecin) => (
    <li key={medecin.id}>
  
      <ul>
        {medecin.rdvs.map((rdv) => (
            <>
          {rdv.rdvs.map((ordonnance) => (
                <li class="box">
                
                    <span class=" color">Date: {ordonnance.date}</span>
                   
                    <div>
                    <a href={ordonnance.file} target="_blank">
                    Voir le Bilan PDF
                  </a>
                  Du patient :{rdv.Patient.Name}  {rdv.Patient.prenom}  
                  <br></br>
                
                <div>
                Référence lettre : {ordonnance.idL}   
               
                </div>
                <div>
              Date de la lettre: {ordonnance.Lettre.dateAjr}
              <br></br>
                </div>
                </div>
                </li>
               
          
               ))}

               </>
           ))}
            
             </ul>
           </li>
         ))}
          
               
            </ul>
            <div className="button">
             
            </div>
        </div>
    </div>
  
   
   
    </Navbar>
);
}