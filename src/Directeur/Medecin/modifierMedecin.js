import styled from 'styled-components';
import React from 'react';
import { useState , useEffect } from 'react';
export default function  Modifiermedecin(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setPhone] = useState('');
  const [dateN, setDateN] = useState('');
  const [genre, setgenre] = useState('');
  const [dateA, setDateA] = useState('');
  const [service, setservice] = useState('');
  const [adresse, setadresse] = useState('');
  const [id, setid] = useState('');
  // récupération des données stockées dans localStorage
  const patientData = JSON.parse(localStorage.getItem('patientData'));

  // mise à jour des états
  useEffect(() => {
    setName(patientData.name);
    setEmail("" ||email|| patientData.email );
    setPhone("" || tel|| patientData.Num);
    setgenre(patientData.genre);
    setDateN(patientData.dateN);
    setDateA(patientData.dateA);
    setservice(patientData.service);
    setadresse( adresse|| patientData.adresse);
    setid(patientData.id);
  }, [patientData]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handledateAChange = event => {
    setDateA(event.target.value);
  };
  const handleserviceChange = event => {
    setservice(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };
  const handleadresseChange = event => {
    setadresse(event.target.value);
  };
  const handleDateNChange = event => {
    setDateN(event.target.value);
  };
  const handleidChange = event => {
    setid(event.target.value);
  };

  const handlegenreChange = event => {
    setgenre(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = { id, email, tel , adresse };
      const response = await fetch('/api/updatemedecin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result && result.error) {
        console.log('Insertion échoué:', result.error);
        alert(' Modification échoué: ' + result.error.message);
      } else {
        console.log('fichier inserted successfully');
        alert('Médecin modifié avec succès');
        window.location.reload();
      }
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }
  };
  
  const handleClosePopup = () => {
    window.location.reload();
  };
  
  
    

    return(
        <StyledDivupdatemedecin>
        <div className="container">
        <div className="title1">Modifier le Medecin : </div>
        <div className="content">
          <form onSubmit={handleSubmit} >
            <div className="user-details">
            <div className="input-box">
                <span className="details">id </span>
               
                <input type="text"  value={id }
        onChange={handleidChange} />
              </div>
              <div className="input-box">
                <span className="details">Nom et prenom </span>
               
                <input type="text"  value={name }
        onChange={handleNameChange} />
              </div>
              
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text"   value={email }
        onChange={handleEmailChange}/>
              </div>
              <div className="input-box">
                <span className="details">Numéro télephone</span>
                <input type="text"  value={tel }
        onChange={handlePhoneChange}/>
              </div>
              <div className="input-box">
                <span className="details">Adresse</span>
                <input type="text"  value={adresse}
        onChange={handleadresseChange}/>
              </div>
             
           

            </div>
          
           
         {/*  <div className="gender-details">
<input type="radio" name="gender" id="dot-1"  value={genre}
        onChange={handlegenreChange} />
<input type="radio" name="gender" id="dot-2" value={genre }
        onChange={handlegenreChange} />

<span className="gender-title">Genre</span>
<div className="category">
<label htmlFor="dot-1">
  <span className="dot one"></span>
  <span className="gender">Male</span>
</label>
<div class="spacer1"></div>
<label htmlFor="dot-2">
  <span className="dot two"></span>
  <span className="gender">Female</span>
</label>

</div>
    </div>*/}
   

                      
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
      </StyledDivupdatemedecin>
    )
}

const StyledDivupdatemedecin = styled.div`
.spacer{
  margin-left:-17px;
}
  .container .title1{
    font-size: 15px;
    font-weight: 600;
    position: relative;
    margin-left:9px;
    
    margin-top:50px;
  }

  .container .title1{
    font-size: 17px;
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
    margin-left:15px;
  
   }
   .gender-title{
    font-size: 13px;
    margin-left:15px;
   }
   form .category label{
    font-size: 13px;
     display: flex;
     align-items: center;
     cursor: pointer;
   }
   form .category label .dot{
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin-right: 5px;
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
    margin-top:40px;
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