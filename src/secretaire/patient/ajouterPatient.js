import styled from 'styled-components';
import React from 'react';
import { useState} from 'react';
export default function  AjouterPatient(){
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [prenom, setprenom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [genre, setgenre] = useState('');
  const [adresse, setAdresse] = useState('');
  const [partenaire1, setpartenaire1] = useState('');
  const [partenaire2, setpartenaire2] = useState('');
  const [Numpartenaire1, setNumpartenaire1] = useState('');
  const [Numpartenaire2, setNumpartenaire2] = useState('');
  const insertPatient1 = async () => {
   
    const response = await fetch('/api/insertPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,prenom, email, phone, date, genre ,adresse ,user,password, Numpartenaire1 , Numpartenaire2 , partenaire2 , partenaire1})
    });
    const data = await response.json();
    if (data.message === 'Patient added successfully') {
      alert('Patient inserer avec success!');
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

  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleprenomChange = event => {
    setprenom(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handlep1Change = event => {
    setpartenaire1(event.target.value);
  };
  const handlep2Change = event => {
    setpartenaire2(event.target.value);
  };
  const handlenp1hange = event => {
    setNumpartenaire1(event.target.value);
  };
  const handlenp2Change = event => {
    setNumpartenaire2(event.target.value);
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
    if (name && email && phone && date  && genre  &&partenaire1&& partenaire2&&Numpartenaire1&&  Numpartenaire2  ) {
      insertPatient1();
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setgenre('');
      setAdresse('');
      setNumpartenaire1('');
      setNumpartenaire2('');
      setpartenaire2('');

      setpartenaire1('');
    }
  };




  const handleClosePopup = () => {
    window.location.reload();
  };
  

    return(
        <StyledDivAjouterPatient >
        <div className="container">
        <div class="title1">Ajouter un nouveau patient  </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
          <div class="title">Les information du patient </div>
            <div className="user-details">
             
            <div className="input-box">
              
                <span className="details">User</span>
               
                <input type="text"   value={user} onChange={handleuserChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Password</span>
               
                <input type="text"   value={password} onChange={handlepasswordChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Nom </span>
               
                <input type="text"   value={name} onChange={handleNameChange} required
                 pattern="[a-z]$"
                 
                
                
                />
              </div>
              <div className="input-box">
                <span className="details">Prenom </span>
               
                <input type="text"   value={prenom} onChange={handleprenomChange} required
                
                
                pattern="[a-z]$"/>
              </div>
              <div className="input-box">
                <span className="details">Date de naissance</span>
                <input type="date" value={date} onChange={handleDateChange}required/>
              </div>
              <div className="input-box">
                <span className="details">Adresse</span>
                <input type="text" value={adresse} onChange={handleAdresseChange}required/>
              </div>

              <div className="input-box">
  <span className="details">Email</span>
  <input
    type="text"
    value={email}
    onChange={handleEmailChange}
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    title="Veuillez entrer une adresse email valide."

    style={{ display: 'inline-block', cursor: 'help' }}
  />
</div>
<div className="input-box">
  <span className="details">Numéro de téléphone</span>
  <input
    type="text"
    value={phone}
    onChange={handlePhoneChange}
    required
    pattern="[0-9]{10}"
    title="Veuillez entrer un numéro de téléphone valide composé de 10 chiffres."

    style={{ display: 'inline-block', cursor: 'help' }}
  />
</div>

              <div className="gender-details">
<input type="radio" name="gender" id="dot-1" value="Homme" onChange={handlegenreChange} required/>
<input type="radio" name="gender" id="dot-2" value="Femme" onChange={handlegenreChange} required/>

<span className="gender-title">Genre</span>
<div className="category">
<label htmlFor="dot-1">
  <span className="dot one"></span>
  <span className="gender">Homme</span>
</label>
<div class="spacer"></div>
<label htmlFor="dot-2">
  <span className="dot two"></span>
  <span className="gender">Femme</span>
</label>

</div>
</div>
                </div>
                <div class="title">Partenaires du patient </div>
                <div className="user-details">
              <div className="input-box">
                <span className="details">Nom Partenaire 1</span>
                <input type="text"  value={partenaire1} onChange={handlep1Change}required/>
              </div>
              <div className="input-box">
                <span className="details" placeholder="nom ">Nom Partenaire 2</span>
                <input type="text" value={partenaire2} onChange={handlep2Change}required/>
              </div> <div className="input-box">
                <span className="details">Num Partenaire 1</span>
                <input type="text" value={Numpartenaire1} onChange={handlenp1hange} required
    pattern="[0-9]{10}"
    title="Veuillez entrer un numéro de téléphone valide composé de 10 chiffres."
    
    style={{ display: 'inline-block', cursor: 'help' }}/>
              </div> <div className="input-box">
                <span className="details">Num Partenaire 2</span>
                <input type="text" value={Numpartenaire2} onChange={handlenp2Change} required
    pattern="[0-9]{10}"
    title="Veuillez entrer un numéro de téléphone valide composé de 10 chiffres."
    
    style={{ display: 'inline-block', cursor: 'help' }}
    />
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
      </StyledDivAjouterPatient>
    )
}

const StyledDivAjouterPatient = styled.div`
.spacer{
  margin-left:20px;
}
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
 
 
  

  `;