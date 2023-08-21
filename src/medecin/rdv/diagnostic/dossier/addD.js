import styled from 'styled-components';
import { useState  } from 'react';
import { useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);



export default function AddD (){

  const patient = JSON.parse(localStorage.getItem('patientD'));
  const Rdv = JSON.parse(localStorage.getItem('rdv'));//les info du rendez vs apres la selection
const idRdv=Rdv.idR;
const daterdv=Rdv.date;

 //le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
  const namee = patient.Name;

  const nameM = localStorage.getItem('name'); 

  const [idR, setidR] = useState(idRdv);
  const [Medecin, setmedecin] = useState(nameM);

 
  const [fonction, setfonction] = useState('');
 

  const [observation, setobservation] = useState('');
  
  const [motif, setmotif] = useState('');
  const [traitementA, settraitementA] = useState('');

  const [modevie, setmodevie] = useState('');
  const [dateC, setdateC] = useState(daterdv);
  const [conclusion, setconc] = useState('');
  const [Autre, setAutre] = useState('');
  const [antecedentM, setAntecedentM] = useState('');
 
 

 
  const insertPatient1 = async () => {
    try {
      // Insert patient data into Express server
      const response = await fetch('/api/insertdossierM', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idR   , fonction  ,observation  , motif , traitementA , modevie , dateC , conclusion , Autre , antecedentM })
      });
      const { data, error } = await response.json();
      if (!error) { // vérifier si l'insertion a réussi
        console.log('Data inserted successfully');
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
  const handleantChange = event => {
    setAntecedentM(event.target.value);
  };
  
  
  


 const handledmedecinChange = event => {
  setmedecin(event.target.value);
};
const handledatecChange = event => {
  setdateC(event.target.value);
};
const handleconctChange = event => {
  setconc(event.target.value);
};


const handleautreChange = event => {
  setAutre(event.target.value);
};
  
  const handlemotifChange = event => {
    setmotif(event.target.value);
  };
  const handletraitChange = event => {
    settraitementA(event.target.value);
  };

  const handlemodeChange = event => {
    setmodevie(event.target.value);
  };
  const handleidcChange = event => {
    setidR(event.target.value);
  };
  
  const handleobservationChange = event => {
    setobservation(event.target.value);
  };

  
 
  const handlfonctionChange = event => {
    setfonction(event.target.value);
  };
 

  const handleSubmit = event => {
    event.preventDefault();

    insertPatient1();
  };
   

    const [showPopupP,setShowPopupP]=useState('');

  const handleShowPopupP = () => {
    setShowPopupP(true);
  }



  const handleClosePopupP = () => {
    setShowPopupP(false);
  }





  //le nom du patient quia ete recuperer a partir de liste quand il a clique sur fetch 
  const name = patient.id;
 // const userprofil = localStorage.getItem('userprofil');
  const idmedecin = localStorage.getItem('idmedecin');
  const [patients, setPatients] = useState([]);
  const [medecin, setmed] = useState([]);
  useEffect(() => {
    async function fetchPatients() {
      
      const { data: rdvs, error: rdvsError } = await supabase.from('Rdv').select('*')
      . eq('idM',idmedecin);
      
      if (rdvsError) {
        console.error('Error fetching Rdvs:', rdvsError);
        return;
      }
  
      const ids = rdvs.map((rdv) => rdv.idP);
      const { data: patientsData, error: patientsError } = await supabase.from('Patient').select('*').in('id', ids)
      .eq('id', name)
      ;

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
  
  const handleEdit = (patient) => {
    setShowPopupP(false);
    // Sauvgarder le patient in localstorage 
    localStorage.setItem('patient', JSON.stringify(patient));
   setdateC(patient.date);
    setidR(patient.idR);
    //rederiger vers la page update :)
   
  
  };
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
   /* setcontenu("");*/
  };
  

 




  

    return(
        <StyledDivaddD>
             <div class="links">
            
            <span>Ajouter Diagnostic</span>
</div>
<div class="dash-info2">
  <div class="activity-data">
  <div class="data id">
      <label class="data-title">seance</label>
      <input onClick={handleShowPopupP} type="text" class="input-small" value={idR} onChange={handleidcChange} required />
    </div>
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
 
    
    <div class="data type">
      <label class="data-title">Date</label>
      <input  type="date" class="input-small" value={dateC} onChange={handledatecChange} required  />
    </div>
    <div class="data id">
      <label class="data-title">Nom du medecin</label>
      <input type="text" class="input-small" value={Medecin} onChange={handledmedecinChange} />
    </div>
   </div>

  <div class="activity-data2">
    <div class="data id">
      <label class="data-title">Motif de consultation </label>
      <input type="text" class="input-large"  value={motif} onChange={handlemotifChange} />
    </div>
  </div>

  <div class="activity-data2">
    <div class="data id">
      <label class="data-title">Conclusion </label>
      <input type="text" class="input-large"  value={conclusion} onChange={handleconctChange}/>
    </div>
  </div>

  <div class="activity-data2">
    <div class="data id">
      <label class="data-title">Autres </label>
      <input type="text" class="input-large"    value={Autre} onChange={handleautreChange}/>


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

</div>
</StyledDivaddD>
    );
}


const StyledDivaddD = styled.div`
   

.btns{
  margin-top:20px;
  display:flex;
margin-left:10px;
margin-bottom:70px;
margin-left:450px;
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
  

   

.input-small {
  margin-top:5px;
  margin-bottom:20px;
  border: none;
  border-bottom: 1px solid gray;
  width: 150px;
}

.input-medium {
  margin-top:5px;
  margin-bottom:20px;
  border: none;
  border-bottom: 1px solid gray;
  width: 200px;
}

.input-large {
  margin-top:5px;
  margin-bottom:20px;
  border: none;
  border-bottom: 1px solid gray;
  width: 730px;
}


input:focus{
outline: none;

}
button{
margin-left:610px;

margin-bottom:20px;
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

.popup1 {
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
}




.popup-modal-content1 {
background-color: white;
position: scroll;
overflow-y: auto;
margin-top: -330px;
width: 420px;
margin-left: -390px;
border-radius: 5px;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
height: 260px; /* set the maximum height to 500px */
}





.activity-data3{
padding:20px;
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
font-size: 14px;
font-weight: 500;
color: black;


}
.activity-data3 .data3 .data-list3{

font-size: 13px;
font-weight: 400;
margin-top: 20px;
white-space: nowrap;


}


.my{

background-color: #f2f2fa; 
margin-bottom:4.7px;
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