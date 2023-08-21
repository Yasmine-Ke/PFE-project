import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import LettreR from '../lettre/lettreR';
const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function AjouterC(){
  const patient = JSON.parse(localStorage.getItem('patientinfo'));//le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
      const namee = patient.Name;
      const prenomp = patient.prenom;
      const id=patient.id;
      
      const date=patient.date;



      const rdvinfo = JSON.parse(localStorage.getItem('rdv'));//les infos du rdv qui sont recuperer apartir de la liste 
      const daterdv=rdvinfo.date;
      const idrdv=rdvinfo.idR;



      const idlettre = JSON.parse(localStorage.getItem('idlettre'));//idletrre
  const nameM = localStorage.getItem('name'); 
  const [name, setName] = useState(namee);

  const [idL, setidlettre] = useState(idlettre);
  const [prenom, setprenom] = useState(prenomp);
  const [idC, setidc] = useState(idlettre);
  const [idR, setidR] = useState(idrdv);
  const [medecinD, setmedecin] = useState(nameM);
  const [dateAjr, setDate] = useState(daterdv);
  const [dateN, setdateN] = useState(date);
  const [idP, setidP] = useState(id);
  const [contenu, setcontenu] = useState('');
  const insertPatient1 = async () => {
    try {
      const idM = localStorage.getItem('idmedecin');
      // Insert patient data into Express server
      const response = await fetch('/api/insertcompte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medecinD , dateAjr,  contenu ,idR , idC})
      });
      const { data, error } = await response.json();
      if (!error) { // vérifier si l'insertion a réussi
        console.log('fichier inserted successfully');
        alert('Data inserted successfully');
        window.location.reload();
      } else {
        console.log('Insertion failed:', error);
        alert('Insertion failed: ' + error.message); // afficher une alerte en cas d'échec
      }
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }
  };

  const handlemedecinDChange = event => {
    setmedecin(event.target.value);
  };
 
  const handledateNChange = event => {
    setdateN(event.target.value);
  };
  const handleidlettreChange = event => {
    setidlettre(event.target.value);
  };
  const handledateAChange = event => {
    setDate(event.target.value);
  };
 
  const handlenameAChange = event => {
    setName(event.target.value);
  };

  
  const handlecontenuChange = event => {
    setcontenu(event.target.value);
  };
  const handlelettreChange = event => {
    setidc(event.target.value);
  };
 

  const handleSubmit = event => {
    event.preventDefault();
    
      insertPatient1();
      setName(namee);
      setdateN(date);
      setDate('');
      setmedecin(nameM);
      setcontenu('');
      setidc(idlettre);
      setidP(id);
    
  };

  const [medecinliste, setmedecinliste] = useState([]);



  useEffect(() => {
      // Fetch user data from Express server
      const fetchUsers = async () => {
        const response = await fetch('/api/listemedecin');
        const data = await response.json();
        
        setmedecinliste(data);
      };
  
      fetchUsers();
    }, []);




  const [patients, setPatients] = useState([]);
  const [medecin, setmed] = useState([]);
  const userprofil = localStorage.getItem('idmedecin');
  useEffect(() => {
    async function fetchPatients() {
     
      const { data: rdvs, error: rdvsError } = await supabase.from('Rdv').select('*')
      . eq('idM',userprofil);
      
      if (rdvsError) {
        console.error('Error fetching Rdvs:', rdvsError);
        return;
      }
  
      const ids = rdvs.map((rdv) => rdv.idP);
      const { data: patientsData, error: patientsError } = await supabase.from('Patient').select('*').in('id', ids)
      .eq('id', id);

      const names = patientsData.map(patient => patient.Name);
      localStorage.setItem('patientNames', JSON.stringify(names));
      if (patientsError) {
        console.error('Error fetching Patients:', patientsError);
        return;
        
      }
  
      const idM = rdvs.map((rdv) => rdv.idM);
      const { data: medData, error: medError } = await supabase.from('medecin').select('*').in('id', idM);
      if (medError) {
        console.error('Error fetching Medecins:', medError);
        return;
      }
  
  
      const medecinWithRdvs = medData.map((medecin) => {
        const medecinRdvs = rdvs.filter((rdv) => rdv.idM === medecin.id);
        return {
          ...medecin,
          rdvs: medecinRdvs,
        };
       });
  
      const patientsWithRdvs = patientsData.map((patient) => {
        const patientRdvs = rdvs.filter((rdv) => rdv.idP === patient.id);
        return {
          ...patient,
          rdvs: patientRdvs,
        };
      });
  
      setPatients(patientsWithRdvs);
      setmed(medecinWithRdvs);
    }
  
    fetchPatients();
  }, []);


  //rdv color 


 
  

  //button clor date 
  function getColor(date, time, text) {
    const today = new Date();
    const [year, month, day] = date.split('-');
    const appointmentDate = new Date(year, month - 1, day);
    appointmentDate.setHours(time);
  
    if (appointmentDate < today) {
      return { color: '#ebebf4', text: 'Rdv passé' };
    } else if (appointmentDate.getDate() === today.getDate()) {
      const currentHour = today.getHours();
      if (time < currentHour) {
        return { color: '#ebebf4', text: 'Rdv passé' };
      } else if (time === currentHour) {
        return { color: '#ebebf4', text: 'Rdv en cours' };
      } else {
        return { color: '#ebebf4', text: 'Aujourdhui' };
      }
    } else {
      return { color: '#CAD3E5', text: 'Rdv à venir' };
    }
  }
  









const handleEdit = (rdv) => {
  setShowPopupP(false);
  // Sauvgarder le patient in localstorage 
  localStorage.setItem('patientpopup', JSON.stringify(rdv));
 setDate(rdv.date);
  setidR(rdv.idR);
  //rederiger vers la page update :)
 

};

   

    const [showPopupP,setShowPopupP]=useState('');

  const handleShowPopupP = () => {
    setShowPopupP(true);
  }



  const handleClosePopupP = () => {
    setShowPopupP(false);
  }




  const [showButton,setShowButtton]=useState('');
  const [isDisabled,setIsDisabled]=useState('');
  const handleShowButton = () => {
    setShowButtton(true);
    setIsDisabled(true);
  }
  const handlemodifier = () => {
    setShowButtton(false);

    setIsDisabled(false);
  }
  const handleClosePopup = () => {
    setcontenu("");
  };
  

  const [showLL,setShowLL]=useState('');

  const handleShowLL = () => {
    setShowLL(true);
  }
 const handleCloseLL = () => {
    setShowLL(false);
  };
 


    return(  
     
        <StyledDivajoutc>    

{showLL ? (
  <>
 <i onClick={handleCloseLL}>x</i>
<LettreR></LettreR>
 </>
):(
<div class="dash-info2">       
         <div class="activity-data">
          <div>
         <span class="data-title">Lettre :  </span>
         <input class="datee"  onClick={handleShowLL} 
        
         onChange={(e) => setidR(e.target.value)}
         value={idC}
         
         ></input>
        
         </div>
    <div>
  
        <span class="data-title">Seance :  </span>
       <input class="datee" onClick={handleShowPopupP} 
       value={idR}
       onChange={(e) => setidR(e.target.value)}
       
       ></input>

    {showPopupP ? (

<div onClick={handleClosePopupP} className="popup1">
<div  onClick={(e) => e.stopPropagation()} className="popup-modal-content1">
<section>
            
            
<div class="activity-data3">

<div class="data3 id">

<span class="d">c</span>

{patients.map((patient) => (
             <>

             {patient.rdvs.map((rdv) => (

<span class="bx bx-check  data-list3 my" onClick={() => handleEdit(rdv)} ></span>   
        ))}
         </>

        ))}
     </div>
<div class="data3 names">

         <span class="data-title3">id </span>
        
         {patients.map((patient) => (
             <>

             {patient.rdvs.map((rdv) => (

        <span class="data-list3">{rdv.idR}</span>
        ))}
         </>

        ))}
     </div>
              

     <div class="data3 names">
         
         <span class="data-title3">Date</span>
        
         {patients.map((patient) => (
          <>

          {patient.rdvs.map((rdv) => (

     <span class="data-list3">{rdv.date}</span>
     ))}
      </>
        ))}
     </div>
     <div class="data3 names">
         
         <span class="data-title3">Heur</span>
        
         {patients.map((patient) => (
             
             <>

             {patient.rdvs.map((rdv) => (

        <span class="data-list3">{rdv.time}</span>
        ))}
         </>
        ))}
     </div>

     <div class="data3 names">
         
         <span class="data-title3">Nom patient </span>
        
         {patients.map((patient) => (
             
             <>

             {patient.rdvs.map((rdv) => (

        <span class="data-list3">{namee}</span>
        ))}
         </>
        ))}
     </div>
             











</div>  
        </section>
 
</div>
</div>


) : null}
       <span class="data-title">Date :  </span>
   <input class="datee" type="date" value={dateAjr} onChange={handledateAChange}
    disabled={isDisabled}
   
   
   ></input>
   
       
    </div>
 
<div class="data id">
    
    <span class="data-title">Date  naissance  : </span>
   <input class="info"  type="date" value={dateN} onChange={handledateNChange}
   
   disabled={isDisabled}></input>
   
</div>
  
<div class="data id">
    
    <span class="data-title">Nom du Patient : </span>
   <input class="info2" value={name}  disabled={isDisabled}></input>
   
</div>
<div class="data id">
    
    <span class="data-title">Prenom : </span>
   <input class="info2" value={prenom}  disabled={isDisabled}></input>
   
</div>
<div class="">
    
    <span class="data-title">Contenu  : </span>
   <input class="contenu" value={contenu} onChange={handlecontenuChange}
    disabled={isDisabled}></input>
   
</div>

<div className="">
<span class="data-title">Envoyer à Dr : </span>
    
    <select className="info" value={medecinD} onChange={handlemedecinDChange}>
    {medecinliste.map((patient) => (
       
        <option value={patient.id}>{patient.name} :  {patient.id} </option>
      ))}
    
  </select>
</div>
      
         
{showButton ? (





       
<div class="btns">
<div className="button1">
              <input type="submit" value="modifier" onClick={handlemodifier}/>
            </div>
            <div className="button2">
              <input type="submit" value="valider" onClick={handleSubmit}/>
            </div>
           
            </div> 






) : 
          
<div class="btns">
<div className="button1">
              <input type="submit" value="annuler"onClick={handleClosePopup} />
            </div>
            <div className="button">
              <input type="submit" value="ajouter" onClick={handleShowButton} />
            </div>
            
            </div> 
}  
        
   </div>
   </div>
)}
                </StyledDivajoutc  > 
        
           

    );

} 

const StyledDivajoutc = styled.div`

    
 

.btns{
  margin-top:80px;
  display:flex;
margin-left:10px;
margin-bottom:70px;
 }
 form .button{
   height: 35px;
 

  
 }
 .button1{
  height: 35px;


 
}

.button2 input{
  margin-left:100px;
     height: 100%;
     width: 100px;
     border-radius: 5px;
     border: none;
     color:white;
     font-size: 13px;
     font-weight: 500;
     letter-spacing: 1px;
     cursor: pointer;
     transition: all 0.3s ease;
     background:#7BC2A5;
   }
 .button input{
margin-left:100px;
   height: 100%;
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
.button1 input{

  height: 100%;
  width: 100px;
  border-radius: 5px;
  border: none;
  color:gray;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background:#CFCFCF;
}
  

   

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    overflow-y: auto;
   
} 




 .activity-data{
  
    display: flex;
    flex-direction:column;

}


.data-title{
    font-size: 14px;
    color:black;
    margin-top:10px;
    margin-left:7px;
   
   
}
.datee{
  
   margin-top:50px;
  height:25px;
  width: 90px;
  font-size: 12px;
  border:none;
  padding-left: 5px;
  border-bottom: 1.2px solid #3B5D8F ;
 
  color:#3B5D8F ;
  
}



.info{
    margin-top:50px;
    height: 25px;
    width: 185px;
    font-size: 12px;
    border-radius: 5px;
    padding-left: 5px;
    border: 1.2px solid #3B5D8F ;
   
    color:#3B5D8F ;
    

}

.info2{
    margin-top:20px;
    height: 25px;
    width: 185px;
    font-size: 12px;
    border-radius: 5px;
    padding-left: 5px;
    border: 1.2px solid #3B5D8F ;
   
    color:#3B5D8F ;
    

}

.contenu{
    margin-top:40px;
    height: 100px;
    width: 235px;
    font-size: 12px;
    border-radius: 5px;
    padding-left: 5px;
    border: 1.2px solid #3B5D8F ;
   
    color:#3B5D8F ;
    
}

input:focus{
    outline: none;
      
     }
  button{
    margin-left:180px;
    margin-top:50px;
    margin-bottom:40px;
    height:40px;
    width: 120px;
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


  .popup-modal-content1 {

    background-color: white;
   
   
    overflow-y: auto;
    margin-top:-10px;
    width:320px;
    margin-left:1050px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    height: 260px; /* set the maximum height to 500px */
    }
  
  
  .popup1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
  }
  






.activity-data3{
  padding:10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
 
}

.activity-data3{
  display: flex;

 
}
.activity-data3 .data3{
  display: flex;
  flex-direction: column;
 
 
 
}
.activity-data3 .data-title3{
  font-size: 13px;
  font-weight: 500;
  color: black;

 
}
.activity-data3 .data3 .data-list3{
 
  font-size: 12px;
  font-weight: 400;
  margin-top: 20px;
  white-space: nowrap;
 

}


.my{

background-color: #f2f2fa; 
margin-bottom:3px;

padding: 0.5px 0.5px; 
border:1px solid #c7d4ed;
border-radius: 2px; /* round the button corners */
color:  #f2f2fa;
}

.my:hover{


color:#b1c4eb;
}


.d{
color:white;
font-size:22px;
}




.rdv{

padding:4px 20px 5px 20px;
border:none;
border-radius:20px;

}
`;
