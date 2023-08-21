import styled from 'styled-components';
import { useState , useEffect } from 'react';
import AjouterO from './ajouterO';
import Ordonnance from './ordonnance'
import FichierL from '../lettre/fichierL';
import FichierC from '../compteR/fichierC';

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function FichierO(){

  const [rdvs, setRdvs] = useState([]);
  
  useEffect(() => {
    async function fetchRdvs() {
      const names = JSON.parse(localStorage.getItem('patientNames'));//list patient 
      const id=names.id;
      const userprofil = localStorage.getItem('userprofil'); // list mededin id
      const { data: ordonnances, error: ordonnancesError } = await supabase.from('ordonnance').select('*');
      if (ordonnancesError) {
        console.error('Error fetching ordonnances:', ordonnancesError);
        return;
      }

      const ids = ordonnances.map((ordonnance) => ordonnance.idR);
      const { data: patientsData, error: patientsError } = await supabase.from('Rdv').select('*').in('idR', ids)
      .eq('idM', userprofil)
      .eq('idP', id);
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

  







  // show Ordonnance details 
    const [showOrd, setShowOrd] = useState(false);

  
    const handleShowOrd = () => {
      setShowOrd(true);
   
    };
  
  
    const handleCloseOrd = () => {
      setShowOrd(false);
    }

  // show Ordonnance 
  const [showO, setShowO] = useState(false);

  
  const handleShowO = () => {
    setShowO(true);
 
  };


  const handleCloseO = () => {
    setShowO(false);
  }

  // show lettre 

  const [showL, setShowL] = useState(false);


  const handleShowL = () => {
    setShowL(true);
 
  };


  const handleCloseL = () => {
    setShowL(false);
  }


  // show compte 

  const [showC, setShowC] = useState(false);


  const handleShowC = () => {
    setShowC(true);
 
  };


  const handleCloseC = () => {
    setShowC(false);
  }

  
    return(

       

      <StyledDivFichierO>    

      <link
            href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
            rel="stylesheet"
          />
                  
                  <section class="dashboard">
                 
         
              <div class="links">
              <span class=" hover color ">Ordonnance</span>
              <span class="link hover " onClick={ handleShowL }>Lettre</span>
        
        {showL ? (
        
        <FichierL></FichierL>
        ) :
        null
        
        }     
                   
      <span class="link hover " onClick={ handleShowC }>Compte rendue</span>
        
        {showC ? (
        
        <FichierC></FichierC>
        ) :
        null
        
        }     
      <div class="dash-info">
      <i class="bx bxs-message-square-detail icon"> </i>
      <span class="content" onClick={ handleCloseOrd }> Mes Ordonnances</span>
      <i class="bx bx-plus icon2" onClick={ handleShowOrd }> </i>
      
      {showOrd ? (
      
      <AjouterO></AjouterO>
      ) :
      
      <Ordonnance></Ordonnance>
      }
          
        
      </div>
          
                
      
     
      
      
      </div>
           
                      </section>
                  
                      </StyledDivFichierO > 
         
           

    );
}

const StyledDivFichierO = styled.div`

    


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    overflow-y: auto;
   
} 


.dashboard{
    position: fixed;
    top:50px;
    left: calc(250px + calc(100% - 645px));
    width: calc(100% - (250px + calc(100% - 645px)) - 10px);
    height: calc(100vh - 50px);
    padding: 10px 14px;
    background-color :  rgb(248, 248, 252);
    overflow-y: auto;
    
}

.dashboard .dash-info{
    background-color:white;
   margin-top:10px;
   padding:10px;
  

   
}

   .links{
   
    cursor:pointer;
 margin-top:3px;

    background-color:white;
    
    color:black;
     
    padding:10px;
   }
   .link{
    margin-left:30px;
   }


   .hover:hover{
    color:#3B5D8F;
   }

  .icon2{
    margin-left:120px;
    color:#3B5D8F;
    font-size:20px;
    cursor:pointer;
  }


  .icon{
   
    color:#3B5D8F;

    
  }

  .content{
    color:#3B5D8F;
    cursor:pointer
    

  }

.color{
    color:#3B5D8F;
}
    `;