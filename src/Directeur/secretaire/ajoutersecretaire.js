import styled from 'styled-components';
import React from 'react';
import { useState} from 'react';
export default function  Ajoutersecretaire(){
  const [user, setUsername] = useState('');
  const [Role, setRole] = useState('Assistant');
  const [Matricule, setmatricule] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [dateR, setDateR] = useState('');
  const [genre, setgenre] = useState('');
  const [adresse, setAdresse] = useState('');
  const insertPatient1 = async () => {
   
      // Insert patient data into Express server
      const response = await fetch('/api/insertAssisatnte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({Matricule , user ,Role ,dateR,password , name, email, phone, date, genre ,adresse })
      });
     
      const data = await response.json();
      if (data.message === 'Patient added successfully') {
        alert('Assisatnte inserer avec success!');
        window.location.reload();
      } else {
        alert('Le nom dutilisateur ou le mot de passe existe déjà, veuillez les modifier , Merci  !');
      }
  };

  const handleuserChange = event => {
    setUsername(event.target.value);
  };
  const handlepasswordChange = event => {
    setPassword(event.target.value);
  }; 
  
  const handledateR = event => {
    setDateR(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  }; 
  const handlematriculeChange = event => {
    setmatricule(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleDateChange = event => {
    setDate(event.target.value);
  };
  const handlegenreChange = event => {
    setgenre(event.target.value);
  };
  const handleAdresseChange = event => {
    setAdresse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name && email && phone   && genre && Matricule) {
      insertPatient1();
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setgenre('');
      setAdresse('');
      setmatricule('');
    }
  };
   


  const handleClosePopup = () => {
    window.location.reload();
  };
  

    return(
        <StyledDivse >
        <div className="container">
        <div className="title1">Ajouter un nouveau Assistant : </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">

            <div className="input-box">
                <span className="details">Matricule</span>
               
                <input type="text"   value={Matricule} onChange={handlematriculeChange}/>
              </div>
            <div className="input-box">
                <span className="details">User</span>
               
                <input type="text"   value={user} onChange={handleuserChange}/>
              </div>
              <div className="input-box">
                <span className="details">Password</span>
               
                <input type="password"   value={password} onChange={handlepasswordChange}/>
              </div>
              <div className="input-box">
                <span className="details">Nom et prenom </span>
               
                <input type="text"   value={name} onChange={handleNameChange}/>
              </div>
             
              <div className="input-box">
                <span className="details">Adresse</span>
                <input type="text" value={adresse} onChange={handleAdresseChange}/>
              </div>
              <div className="input-box">
                <span className="details">Numéro télephone</span>
                <input type="Number" value={phone} onChange={handlePhoneChange}required
                 pattern="[0-9]{10}"
                 title="Veuillez entrer un numéro de téléphone valide composé de 10 chiffres."
                 
                 style={{ display: 'inline-block', cursor: 'help' }}
                 
                 
                 />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text"  value={email} onChange={handleEmailChange}
                
                  
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Veuillez entrer une adresse email valide."
            
                style={{ display: 'inline-block', cursor: 'help' }}
                
                />
              </div>
              <div className="input-box">
                <span className="details">Date Recrutement</span>
                <input type="date"  value={dateR} onChange={handledateR}/>
              </div>
              
           
           
            </div>
            <div className="gender-details">
<input type="radio" name="gender" id="dot-1" value="Homme" onChange={handlegenreChange} />
<input type="radio" name="gender" id="dot-2" value="Femme" onChange={handlegenreChange} />

<span className="gender-title">Genre</span>
<div className="category">
<label htmlFor="dot-1">
  <span className="dot one"></span>
  <span className="gender">Male</span>
</label>
<div class="spacer"></div>
<label htmlFor="dot-2">
  <span className="dot two"></span>
  <span className="gender">Female</span>
</label>

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
      </StyledDivse>
    )
}


const StyledDivse = styled.div`
.spacer{
  margin-left:-17px;
}
  .container .title{
    font-size: 15px;
    font-weight: 600;
    position: relative;
    margin-left:9px;
    
    
  }

  .container .title1{
    font-size: 17px;
    position: relative;
    margin-left:9px;
    padding-bottom:20px;
    border-bottom:1.2px solid #BBBBBB;
    margin-top:50px;
    font-weight: 600;
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