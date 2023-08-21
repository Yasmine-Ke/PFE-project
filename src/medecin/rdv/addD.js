import styled from 'styled-components';
import { useState  } from 'react';

export default function AddD (){
  const rdv = JSON.parse(localStorage.getItem('rdv'));


  
  const patient = JSON.parse(localStorage.getItem('patientD'));
  const nameM = localStorage.getItem('name'); 
  const [nameP, setName] = useState(patient.Name);
  const [idC, setidc] = useState('');
  const [Medecin, setmedecin] = useState(nameM);

  const [adresse, setAdresse] = useState(patient.adresse);
  const [fonction, setfonction] = useState('');
  const [DateN, setdateN] = useState(patient.date);
  const [tel, settel] = useState(patient.tel);
  const [observation, setobservation] = useState('');
  const [genre, setgenre] = useState(patient.genre);
  const [motif, setmotif] = useState('');
  const [traitementA, settraitementA] = useState('');

  const [modevie, setmodevie] = useState('');
  const [dateC, setdateC] = useState(rdv.date);
  const [conclusion, setconc] = useState('');
  const [Autre, setAutre] = useState('');
  const [antecedentM, setAntecedentM] = useState('');
  const [email, setEmail] = useState('');
  const [id, setid] = useState(patient.id);

 
const idR=rdv.idR;

const insertPatient1 = async () => {
  try {
    // Insert patient data into Express server
    const response = await fetch('/api/insertdossierM', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idR  , fonction  ,observation  , motif , traitementA , modevie , dateC , conclusion , Autre , antecedentM })
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
  
};/*
  const handleidcChange = event => {
    setidc(event.target.value);
  };
  const handlenameChange = event => {
    setName(event.target.value);
  };
  const handleadresseChange = event => {
    setAdresse(event.target.value);
  };
   const handlegenreChange = event => {
    setgenre(event.target.value);
  };
 
const handleidChange = event => {
    setid(event.target.value);
  };
const handledateNChange = event => {
    setdateN(event.target.value);
  };
  const handletelChange = event => {
    settel(event.target.value);
  };
  const handleemailChange = event => {
    setEmail(event.target.value);
  };*/
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
    setidc(event.target.value);
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
      
   setidc ('');
   setmedecin (nameM);

 
  
   setdateN('');
 
  setobservation ('');
  
  setmotif('');
 

 
  setdateC ('');
 setconc('');
  setAutre('');
   setAntecedentM ('');
 setEmail('');
  setid('');
    
  };
    const StyledDiv = styled.div`
   
  .dash{
    
      background-color:white;
     
     
  }
  
   .activity{
    
     
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top:5px solid  rgb(248, 248, 252);
  border-bottom:5px solid  rgb(248, 248, 252);
  padding:10px;
  
  }
  
  
  .activity .dataa{
      display: flex;
      flex-direction: column;
      white-space: nowrap;
     
     
  }
  .activity2{
      border-top:5px solid  rgb(248, 248, 252);
      border-bottom:5px solid  rgb(248, 248, 252);
      display: flex;
      justify-content: space-between;
      align-items: center;
     
     
     
     
  
  }
  .dataa-title{
      font-size: 14px;
      color:black;
      font-weight: 500;
      width: calc(100% - 630px);
     
     
     
  }
   .dataa .dataa-list{
     
      font-size: 12px;
      margin-bottom:10px;
    
     
    
  }
   
     .links{
     
      letter-spacing:1px;
     
      cursor:pointer;
  
      color:#3B5D8F;
       
    padding:10px;
    margin-bottom:20px;
      background-color : white;
     }
     .link{
      margin-left:30px;
     }
  .icon{
  margin-left:650px;
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
    margin-left:10px;
    border: none;
    border-bottom: 1px solid gray;
    width: 870px;
  }


input:focus{
outline: none;
  
 }
.bt{


width: 900px;
height:40px;
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

    `;

    const [showPopupP,setShowPopupP]=useState('');

  const handleShowPopupP = () => {
    setShowPopupP(true);
  }



  const handleClosePopupP = () => {
    setShowPopupP(false);
  }

    return(
        <StyledDiv>
             <div class="links">
            
            <span>Ajouter Diagnostic</span>
</div>
<div class="dash">
  <div class="activity">
  <div class="dataa id">
      <label class="dataa-title">seance</label>
      <input onClick={handleShowPopupP} type="text" class="input-small" value={idR} onChange={handleidcChange} required />
    </div>
   
    <div class="dataa id">
      <label class="dataa-title">nom du medecin</label>
      <input type="text" class="input-small" value={Medecin} onChange={handledmedecinChange} />
    </div>
    
    <div class="dataa type">
      <label class="dataa-title">Date</label>
      <input  type="date" class="input-small" value={dateC} onChange={handledatecChange} required  />
    </div>
    <div class="dataa status">
      <label class="dataa-title">Fonction </label>
      <input type="text" class="input-small" value={fonction} onChange={handlfonctionChange} />
    </div>
    <div class="dataa type">
      <label class="dataa-title">mode de vie </label>
      <input type="text" class="input-small"value={modevie} onChange={handlemodeChange} />
    </div>
    <div class="dataa status">
      <label class="dataa-title">Observation </label>
      <input type="text" class="input-medium"  value={observation} onChange={handleobservationChange}/>
    </div>
    <div class="dataa status">
      <label class="dataa-title">Antecedents medicaux </label>
      <input type="text" class="input-medium" value={antecedentM} onChange={handleantChange}/>
    </div>
    <div class="dataa status">
      <label class="dataa-title">Traitement habituel</label>
      <input type="text" class="input-medium"  value={traitementA} onChange={handletraitChange}/>
    </div>
  </div>

  <div class="activity2">
    <div class="dataa id">
      <label class="dataa-title">motif de consultation </label>
      <input type="text" class="input-large"  value={motif} onChange={handlemotifChange} />
    </div>
  </div>

  <div class="activity2">
    <div class="dataa id">
      <label class="dataa-title">Conclusion </label>
      <input type="text" class="input-large"  value={conclusion} onChange={handleconctChange}/>
    </div>
  </div>

  <div class="activity2">
    <div class="dataa id">
      <label class="dataa-title">Autres </label>
      <input type="text" class="input-large"    value={Autre} onChange={handleautreChange}/>
     
    </div>
   
  </div>
  <button class="bt"  onClick={handleSubmit}>enregister</button> 
</div>
</StyledDiv>
    );
}