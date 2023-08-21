import NavbarB from './navbarB';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState , useEffect } from 'react';
import BilanE from './bilanE';
import FormI from './shiwlettre';

import { Link } from 'react-router-dom';
import LettreB from './lettre';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function BilanI(){
    const [patients, setPatients] = useState([]);
    const navigate=useNavigate();
    const [fileData, setFileData] = useState(null);

   
  
    const [rdvs, setRdvs] = useState([]);
        
    useEffect(() => {
      async function fetchRdvs() {
       
         const { data: ordonnances, error: ordonnancesError } = await supabase

         .from('medecin')
         .select('id ,name')
        
        ;
  
       
        if (ordonnancesError) {
          console.error('Error fetching ordonnances:', ordonnancesError);
          return;
        }
        const patientid = JSON.parse(localStorage.getItem('patientid'));
      
        const ids = ordonnances.map((ordonnance) => ordonnance.id);
        const { data: patientsData, error: patientsError } = await supabase
        .from('Rdv').select('* , Patient(Name , prenom) ')
        .in('idM', ids);

 
        if (patientsError) {
          console.error('Error fetching Rdvs:', patientsError);
          return;
        }
       
        
        const patientsWithRdvs = patientsData.map((patient) => {
          const patientRdvs = ordonnances.filter((ordonnance) => ordonnance.id === patient.idM);
          return {
            ...patient,
            rdvs: patientRdvs,
          };
        });
        const idR = patientsData.map((ordonnance) => ordonnance.idR);
        const { data: medecinD, error: medecinError } = await supabase
        .from('bilanM')
        .select(' * ')
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
   
    
    const [showE, setShowE] = useState(false);
    const [lettre, setlettre] = useState(null);
    const handleE = () => {
      setShowE(true);

     
        // Use Supabase to query all patient data
       
    };
  
  



   
   




   



    const [showLt, setShowLt] = useState(false);
    const history = useNavigate();
    const handleLt = async(idL) => {
      setShowLt(true);
      console.log(idL);
      localStorage.setItem('lettre', JSON.stringify(idL));
 

//partie ou on veut ajouter cette page:
 history('/showlettre');


    };
  
    

    function Dashboard({ ordonnance, rdv  , medecin}) {
         
      return (
<>
<div>
        














          
          






  <div class="activity list ">
           <div class="activity-data">



<div class="data id">

<span class="data-list"> {ordonnance.name}</span>

<span class="data-list"> </span>

</div>
<div class="data names">

   

   <span class="data-list"> {rdv.Patient.Name}{rdv.Patient.prenom}</span>
   <span class="data-list"> </span>
</div>

<div class="data names">

   

<span class="data-list border first ">
<a href={medecin.file} download> Bilan </a>
</span>

</div>
<div class="data names">

   

<span class="data-list border"  onClick={() => handleLt(medecin.idL)}>
Lettre</span>

</div>

<div class="data date">

   

<span class="data-list  "> {medecin.date}</span>

</div>





</div> 
 </div>
          
          


        
             
               
              
                </div>
                
                </>  
               
    );
  
         
               
               
                }
    return(
<>
     

        <StyledDivBilanI>    

        <link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
           
             <BilanE></BilanE>
          
          
         
                </StyledDivBilanI  > 
                <NavbarB></NavbarB>
                </>  

    );
}

const StyledDivBilanI = styled.div`

    



*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
 
}


.dashboard{
  position: relative;
  left: 250px;
  min-height: 100vh;
  width: calc(100% - 250px);
  padding: 10px 14px;
  background-color :  rgb(248, 248, 252);
  
}.dashboard .top {
  position: absolute;
  top: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background-color: white;
  left: 0;
  width: 100%;
}

.dashboard .top .search-box {
  position: relative;
  height: 45px;
  max-width: 600px;
  width: 100%;
  margin: 0 30px;
  margin-left: 85px;
  cursor:pointer;
}

.dashboard .top .search-box input {
  border: 0.8px solid  #f2f2fa;
  background-color: #f2f2fa;
  padding: 0 25px 0 60px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  color: #6688CC;
  font-size: 15px;
  font-weight: 400;
  outline: none;
}

.dashboard .top .search-box i {
  display: block;
  position: absolute;
  left: 20px;

  font-size: 28px;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
}





.dashboard .dash-content{
  padding-top: 10px;
  margin-top:70px;
  


}
.title{
  display: flex;
  align-items: center;

 
  
}
.title .text{
  font-size: 20px;
 
  color: #3B5D8F;
  margin-left: 12px;
 
  
}




.activity .activity-data{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
 
 
  list-style: none;
}

.activity-data .data{
  display: flex;
  flex-direction: column;
  margin-left:30px;
  list-style: none;
  white-space: nowrap;
  
}
.activity-data .data-title{
  font-size: 16px;
  margin-right:50px;
  cursor:pointer;
margin-bottom:10px;
 font-weight:500;
 list-style: none;
}
.this{
  color: #3B5D8F;
  border-bottom:1px solid  #3B5D8F;
}
.activity-data .data .data-list{
  list-style: none;
  font-size: 14px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  white-space: nowrap;
  cursor:pointer;

  list-style: none;

}
 

  




  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-end;
   

  }

  .modal-overlay2 {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.09);
    display: flex;
    justify-content: flex-end;
   

  }
  
  .modal {
    position: absolute;
    top: 0;
    right:0;
    left: auto;
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: slide-in 0.4s ease-in-out forwards;
   
  }


  @keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
  

.check{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid #6688CC;
  border-radius: 50%; /* round the button corners */
 color: #6688CC;
}

.check:hover{

  background-color: #6688CC; /* blue background */
 color:white
}
  

.m{
  color:  #3B5D8F;
  font-size:25px;

  margin-top:17px;
  margin-bottom:5px;

  cursor:pointer;
  background-color :  rgb(248, 248, 252);
  margin-left:10px;
  border:none;
}

.m:hover{
  color:#788FB0;
}

.b{
  color :  rgb(248, 248, 252);
}

.list{
  border-bottom:1px solid#DFDFDF;
 

}

.list:hover{
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  
}
.border{
  border:1px solid #3B5D8F;
  padding :5px 30px 5px 30px;
  border-radius:30px;
  color:#3B5D8F;

 
}
.add{
  margin-left:-30px;
margin-top:-10px;
  font-size:30px;
  cursor:pointer;
  color:black;

}

.popup-modal-content {
 
 background-color:  rgb(248, 248, 252);
 padding: 50px;
 border-radius: 5px;
 box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
 text-align: center;
 overflow-y: auto;
 max-height:600px;
 width:600px;
 margin-top:320px;
 margin-left:700px;

}

.first{
  margin-left:100px;
}
.date{
  position:absolute;
  color:gray;
right:30px;}


  
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:  rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
}
    `;
