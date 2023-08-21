import styled from 'styled-components';
import React from 'react';
import { useState , useEffect } from 'react';
export default function  ModifierPatient(){
  const [name, setName] = useState('');
  const [namep1, setNamep1] = useState('');
  const [namep2, setNamep2] = useState('');
  const [namenump1, setNamenump1] = useState('');
  const [namenump2, setNamenump2] = useState('');
  const [prenom, setprenom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [genre, setgenre] = useState('');
  const [Adresse, setAdresse] = useState('');
  const [id, setid] = useState('');

  // récupération des données stockées dans localStorage
  const patientData = JSON.parse(localStorage.getItem('patientData'));

  // mise à jour des états
  useEffect(() => {
    setName(patientData.Name);
    setNamep1(namep1||patientData.Nompartenaire);
    setNamep2(namep2||patientData.nompartenaire2);
    setNamenump1(namenump1||patientData.Numpartenaire);
    setNamenump2(namenump2  || patientData.Numpartenaire2);
    setprenom(patientData.prenom);
    setid(patientData.id);
    setEmail("" ||email||patientData.email );
    setPhone(tel|| patientData.tel );
    setgenre(patientData.genre);
    setDate(patientData.date);
    setAdresse(Adresse||patientData.adresse);
  }, [patientData]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handleidChange = event => {
    setid(event.target.value);
  };
  const handlePhoneChange = event => {
    setPhone(event.target.value);
  }; 
  const handleadresseChange = event => {
    setAdresse(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };

  const handlenp1Change = event => {
    setNamep1(event.target.value);
  };
  const handlenp2Change = event => {
    setNamep2(event.target.value);
  };

  const handlenump1Change = event => {
    setNamenump1(event.target.value);
  };
  const handlenum2Change = event => {
    setNamenump2(event.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = { id , Adresse , name, email, tel, date, genre , namep1 , namep2 , namenump1 , namenump2}; // Créer un objet JSON avec les données
      const response = await fetch('/api/update1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoyer l'objet JSON comme le corps de la requête POST
      });
      const { data, error } = await response.json();
      if (!error) { // vérifier si l'insertion a réussi
        console.log('modification reussie');
        alert('Modification réussie');
        window.location.reload();
      } else {
        console.log('Modification échouée:', error);
        alert('Modification échouée: ' + error.message); // afficher une alerte en cas d'échec
      }
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }
  };



  const handleClosePopup = () => {
    window.location.reload();
  };
  

   
    return(
        <StyledDivModifierPatient >
       <div className="container">
        <div class="title1">Modifier les informations du patient </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
          <div class="title">Les information du patient </div>
            <div className="user-details">
             
          
              
              <div className="input-box">
                <span className="details">Nom </span>
               
                <input type="text"   value={name} onChange={handleNameChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Prenom </span>
               
                <input type="text"   value={prenom} onChange={handleNameChange}  required/>
              </div>
              <div className="input-box">
                <span className="details">Date de naissance</span>
                <input type="date" value={date} onChange={handleDateChange}required/>
              </div>
              <div className="input-box">
                <span className="details">Adresse</span>
                <input type="text"
                
                 value={Adresse} onChange={handleadresseChange}
                required/>
              </div>

              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={email} onChange={handleEmailChange}required/>
              </div>
              <div className="input-box">
                <span className="details">Numéro télephone</span>
                <input type="text" value={tel} onChange={handlePhoneChange}required/>
              </div>
         
                </div>
                <div class="title">Partenaires du patient </div>
                <div className="user-details">
              <div className="input-box">
                <span className="details">Nom Partenaire 1</span>
                <input type="text" value={namep1} onChange={handlenp1Change}required/>
              </div>
              <div className="input-box">
                <span className="details" placeholder="nom ">Nom Partenaire 2</span>
                <input type="text" value={namep2} onChange={handlenp2Change}required/>
              </div> <div className="input-box">
                <span className="details">Num Partenaire 1</span>
                <input type="text" value={namenump1} onChange={handlenump1Change}required/>
              </div> <div className="input-box">
                <span className="details">Num Partenaire 2</span>
                <input type="text" value={namenump2} onChange={handlenum2Change}required/>
              </div> 
           
           
            </div>
           
<div class="btns">
<div className="button1">
              <input type="submit" value="annuler"  onClick={handleClosePopup}/>
            </div>
            <div className="button">
              <input type="submit" value="enregistrer"  onChange={handleSubmit}/>
            </div>

            </div>
          </form>
        </div>
      </div>
      </StyledDivModifierPatient>
    )
}

const StyledDivModifierPatient = styled.div`

.container .title{
  font-size: 15px;
  font-weight: 600;
  position: relative;
  margin-left:9px;
  
  
}

.container .title1{
  font-size: 17px;
margin-top:100px;
  position: relative;
  margin-left:9px;
  padding-bottom:20px;
  border-bottom:1.2px solid #BBBBBB;
  
  
}

.content form .user-details{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0 12px 0;

  border-bottom:1.2px solid #BBBBBB;
  padding:10px;
}
form .user-details .input-box{
  margin-bottom: 20px;
  width: calc(100% / 2 - 20px);


}
form .input-box span.details{
  display: block;

 
}
.user-details .input-box input{
  height: 27px;
  width: 100%;
  outline: none;
  font-size: 13px;
  border-radius: 3px;
  border: 0.5px solid #3B5D8F ;
  transition: all 0.3s ease;
  color:#3B5D8F ;
  padding-left: 7px;
}
.user-details .input-box input:focus,
.user-details .input-box input:valid{
  border-color: #3B5D8F ;

}
.details {
  font-size: 13px;
 

 }
 form .category{
   display: flex;
   width: 80%;
  margin-top:10px;
 

 }
 form .category label{
  font-size: 13px;
   display: flex;
   align-items: center;
   cursor: pointer;
 }
 form .category label .dot{
  height: 17px;
  width: 17px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #6688CC;
  transition: all 0.3s ease;
}
 #dot-1:checked ~ .category label .one,
 #dot-2:checked ~ .category label .two{
   background: #3B5D8F;
 
 }
 form input[type="radio"]{
   display: none;
 }
 .btns{
  display:flex;
margin-left:420px;
margin-bottom:70px;
 }
 form .button{
   height: 35px;
 

  
 }
 form .button1{
  height: 35px;


 
}
 form .button input{
margin-left:30px;
   height: 100%;
   width: 100px;
   border-radius: 5px;
   border: none;
   color:white;
   font-size: 14px;
   font-weight: 500;
   letter-spacing: 1px;
   cursor: pointer;
   transition: all 0.3s ease;
   background:#3B5D8F;
 }
 form .button1 input{

  height: 100%;
  width: 100px;
  border-radius: 5px;
  border: none;
  color:gray;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background:#CFCFCF;
}
 @media(max-width: 584px){
 .container{
  max-width: 100%;
}
form .user-details .input-box{
    margin-bottom: 15px;
    width: 100%;
  }
  form .category{
    width: 100%;
  }
  .content form .user-details{
    max-height: 300px;
    overflow-y: scroll;
  }
  .user-details::-webkit-scrollbar{
    width: 5px;
  }
  }
  @media(max-width: 459px){
  .container .content .category{
    flex-direction: column;
  }
}




  `;
