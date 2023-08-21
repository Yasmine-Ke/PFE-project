import styled from 'styled-components';
import React from 'react';
import { useState} from 'react';


 function  Ajoutermedecin(){
  
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateA, setDateA] = useState('');
  const [dateN, setDateN] = useState('');
  const [genre, setgenre] = useState('');
  const [adresse, setAdresse] = useState('');
  const [service, setservice] = useState('');

 
  const insertPatient1 = async () => {
 
      // Insert patient data into Express server
      const response = await fetch('/api/insertmedecin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, dateA, genre ,adresse ,user,password,dateN,service})
      });

      const data = await response.json();
      if (data.message === 'Patient added successfully') {
        alert('Médecin inserer avec success!');
        window.location.reload();
      } else {
        alert('Le nom dutilisateur ou le mot de passe existe déjà, veuillez les modifier , Merci  !');
      }
  };

  const handleuserChange = event => {
    setUsername(event.target.value);
  };

  const handledarteAChange = event => {
    setDateA(event.target.value);
  };
  const handleserviceChange = event => {
    setservice(event.target.value);
  };
  const handlepasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleDateChange = event => {
    setDateN(event.target.value);
  };
  const handlegenreChange = event => {
    setgenre(event.target.value);
  };
  const handleAdresseChange = event => {
    setAdresse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name && email && phone && dateA  && genre  && service && dateN) {
      insertPatient1();
      setName('');
      setEmail('');
      setPhone('');
      setDateA('');
      setgenre('');
      setAdresse('');
      setDateN('');
      setservice('');
    }
  };
 
    return(
        <StyledDivLA >
        <div className="container">
        <div className="title">Ajouter un nouveau Medecin : </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
            <div className="input-box">
                <span className="details">user</span>
               
                <input type="text"   value={user} onChange={handleuserChange}/>
              </div>
              <div className="input-box">
                <span className="details">password</span>
               
                <input type="text"   value={password} onChange={handlepasswordChange}/>
              </div>
              <div className="input-box">
                <span className="details">Nom et prenom </span>
               
                <input type="text"   value={name} onChange={handleNameChange}/>
              </div>
              <div className="input-box">
                <span className="details">Date de naissance</span>
                <input type="date" value={dateN} onChange={handleDateChange}/>
              </div>
              <div className="input-box">
                <span className="details">Adresse</span>
                <input type="text" value={adresse} onChange={handleAdresseChange}/>
              </div>
              <div className="input-box">
                <span className="details">Numéro télephone</span>
                <input type="text" value={phone} onChange={handlePhoneChange}/>
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text"  value={email} onChange={handleEmailChange}/>
              </div>
              <div className="input-box">
                <span className="details">Date de recrutement </span>
                <input type="date" value={dateA} onChange={handledarteAChange}/>
              </div>
              <div className="input-box">
                <span className="details">Service</span>
                <input type="text" value={service} onChange={handleserviceChange}/>
              </div>
           
           
            </div>
            <div className="gender-details">
<input type="radio" name="gender" id="dot-1" value="male" onChange={handlegenreChange} />
<input type="radio" name="gender" id="dot-2" value="female" onChange={handlegenreChange} />

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
</div>

            <div className="button">
              <input type="submit" value="enregistrer"  onChange={handleSubmit}/>
            </div>
           
          </form>
        </div>
      </div>
      </StyledDivLA>
    )

}
export default Ajoutermedecin;


const StyledDivLA = styled.div`
.container{
    max-width: 700px;
    width: 100%;

    padding: 25px 30px;
    
  }
  .container .title{
    font-size: 25px;
    font-weight: 500;
    position: relative;
    
    
  }
  .container .title::before{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 50px;
    border-radius: 5px;
    background: #3B5D8F;
 
  }
  .content form .user-details{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   
    
  }
  form .user-details .input-box{
    margin-bottom: 10px;
    width: calc(100% / 2 - 20px);
    
  
  }
  form .input-box span.details{
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
   
  }
  .user-details .input-box input{
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1.2px solid #3B5D8F ;
    transition: all 0.3s ease;
    color:#3B5D8F ;
    
  }
  .user-details .input-box input:focus,
  .user-details .input-box input:valid{
    border-color: #3B5D8F ;
   
  }
   form .gender-details .gender-title{
    font-size: 20px;
    font-weight: 500;

   }
   form .category{
     display: flex;
     width: 80%;
     margin: 14px 0 ;
     margin-right:10px;
   }
   form .category label{
     display: flex;
     align-items: center;
     cursor: pointer;
   }
   form .category label .dot{
    height: 18px;
    width: 18px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #6688CC;
    transition: all 0.3s ease;
  }
   #dot-1:checked ~ .category label .one,
   #dot-2:checked ~ .category label .two,
   #dot-3:checked ~ .category label .three{
     background: #3B5D8F;
   
   }
   form input[type="radio"]{
     display: none;
   }
   form .button{
     height: 45px;
     margin: 50px 0
   }
   form .button input{
     height: 100%;
     width: 150px;
     border-radius: 5px;
     border: none;
     color:white;
     font-size: 18px;
     font-weight: 500;
     letter-spacing: 1px;
     cursor: pointer;
     transition: all 0.3s ease;
     background:#3B5D8F;
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