
import styled from 'styled-components';
import Meet from './meet';
import MesRdv from './mesRdv';
import { useState ,useEffect} from 'react';
import secretary from '../patient/secretary.png';


export default function Profil(){
 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Adresse, setAdresse] = useState('');
  const [Username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [showC,setShowC]=useState('');
  const [p1,setp1]=useState('');
  const [p2,setp2]=useState('');
  const [nump1,setnump1]=useState('');
  const [nump2,setnump2]=useState('');
  const [email1,setemail1]=useState('');
  const [user, setUser] = useState(null);
    const [showMP, setShowMP] = useState(false);


    useEffect(() => {
      // Retrieve the user ID from local storage
      const patientid = localStorage.getItem('patientid');
    
      // Send a GET request to your server to retrieve the user's information
      fetch(`/patientprofil/${patientid}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setAdresse(data.adresse || Adresse);
        setEmail(data.email || email);
        setPhone(data.tel || phone);
        setpassword(data.password || password);
        setusername(data.user || Username);


        setnump1(data.Numpartenaire || nump1);
        setnump2(data.Numpartenaire2 || nump2);
        setp1(data.Nompartenaire || p1);
        setp2(data.nompartenaire2 ||p2);
        setemail1(data.EmailPartenaire ||email1);

      })
      .catch(error => console.error(error));
  }, []);
  
    if (!user) {
      return <div>Loading...</div>;
    }
   
  

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
    };
    const handleuserChange = (event) => {
      setusername(event.target.value);
    };
    const handlp1Change = (event) => {
      setp1(event.target.value);
    };
    const handlp2Change = (event) => {
      setp2(event.target.value);
    };
    const handlnump1Change = (event) => {
      setnump1(event.target.value);
    };
    const handlnump2Change = (event) => {
      setnump2(event.target.value);
    };
    const handlemail1Change = (event) => {
      setemail1(event.target.value);
    };
    const handlpassChange = (event) => {
      setpassword(event.target.value);
    };
    const handleAdresseChange = (event) => {
      setAdresse(event.target.value);
    };
  

    const handleSaveChanges = async () => {
   
      const profil = user.id;
    const response = await fetch(`/api/updateprofilpatient/${profil}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Username ,password, email, phone , Adresse ,nump1 ,nump2 ,p1 , p2 ,email1 })
    });

    const { data, error } = await response.json();
    if (!error) {
     
      alert('Modification par succès');
      window.location.reload();
      setShowMP(true);
  
    } else {
      console.error(error);
      window.location.reload();
      alert('Modification échoué: ' + error.message);
    }
  }







   

    const handleShowMP = () => {
      setShowMP(true);
    };
   
  
    const handleCloseMP = () => {
      setShowMP(false);
    };


    const handleShowC = () => {
      setShowC(true);
    };
   
  
    const handleCloseC = () => {
      setShowC(false);
    };



   
   
    return(

       

        <StyledDivProfil>    

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
            
            <section class="dashboard">
              
       

            <div class="links">
            
            <span>Mon profil </span>

</div>

<div class="dash-info2">
<div class="container">
  <div class="left-side">
 
  <div class="top-section">
    
  <div class="profile-header">
    <div class="profile-icon">
      <img src={secretary} alt="Profile Icon"/>
    </div>
    <div class="profile-name">
      <p class="name">{user.Name}{user.prenom} </p>
      <p class="email"> {user.email}</p>
    </div>

    {
    showMP ?(
        <button onClick={handleSaveChanges}>Enregister mes modifications </button>
    ):
    <button onClick={handleShowMP}  >Modifier mon profil  </button>
   }





    </div>
  </div>
  </div>
  <div class="right-side">

   {showMP ?(
        <span class="bx bx-x x"onClick={handleCloseMP}> </span>
    ):
   null
}
  <div class="activity-data">
         
         <div class="data id">
       
        
    <span class="data-title">Nom et prénom </span>
   
    <span class="data-list">{user.Name} {user.prenom}  </span>
  
  
</div>
         <div class="data names">
    
             <span class="data-title">genre</span>
             <span class="data-list">{user.genre}</span>
            
         </div>
        
         <div class="data type">
             <span class="data-title">Date de naissance</span>
             <span class="data-list">{user.date}</span>
         </div>
   
<div class="data status">
<span class="data-title">adresse</span>
{
    showMP ?(
<input value={Adresse} onChange={handleAdresseChange}></input>
    ):
    <span class="data-list">{user.adresse}</span>
   }

</div>
  
<div class="data type">
<span class="data-title">numéro téléphone </span>
{
    showMP ?(
<input value={phone} onChange={handlePhoneChange}></input>
    ):
    <span class="data-list">{user.tel}</span>
   }



</div>
   
     
<div class="data status">
<span class="data-title">Email </span>
{
    showMP ?(
<input value={email} onChange={ handleEmailChange}></input>
    ):
    <span class="data-list">{user.email} </span>
   }

</div>
  
<div class="data status">
<span class="data-title">user</span>
{
    showMP ?(
<input value={Username} onChange={handleuserChange}></input>
    ):
<input value={user.user} ></input>
   }

</div>


<div class="data status">
<span class="data-title">password</span>
{
    showMP ?(
<input  type="text" value={password} onChange={handlpassChange}></input>
    ):
    <input  type="text" value={user.password} ></input>
   }

</div>
<div class="data status">
<span class="data-title">Nom partenaire1</span>
{
    showMP ?(
<input  type="text" value={p1} onChange={handlp1Change}></input>
    ):
    <input  type="text" value={user.Nompartenaire} ></input>
   }

</div>
<div class="data status">
<span class="data-title">Nom partenaire2</span>
{
    showMP ?(
<input  type="text" value={p2} onChange={handlp2Change}></input>
    ):
    <input  type="text" value={user.nompartenaire2} ></input>
   }

</div>
<div class="data status">
<span class="data-title">Email partenaire1</span>
{
    showMP ?(
<input  type="text" value={email1} onChange={handlemail1Change}></input>
    ):
    <input  type="text" value={user.EmailPartenaire} ></input>
   }

</div>
<div class="data status">
<span class="data-title">Tel partenaire1</span>
{
    showMP ?(
<input  type="text" value={nump1} onChange={handlnump1Change}></input>
    ):
    <input  type="text" value={user.Numpartenaire} ></input>
   }

</div>

<div class="data status">
<span class="data-title">Tel partenaire2</span>
{
    showMP ?(
<input  type="text" value={nump2} onChange={handlnump2Change}></input>
    ):
    <input  type="text" value={user.Numpartenaire2} ></input>
   }

</div>
     </div> 
   
  </div>
  
</div>
<div class="links">
<i class="bx bx-calendar i"></i>
            <span onClick={handleCloseC}>Mes rendez-vous  </span>
           {/*}    <i class="bx bx-link-alt left i"></i>
          <span onClick={handleShowC}>mes liens du teleconsultation </span>   {*/}
</div>
{showC ? (

<Meet></Meet>
):

<div class="dash-info2">

<MesRdv></MesRdv>
</div>


}
    
     </div> 

     
                </section>

              
             
                </StyledDivProfil > 
         
              

    );
}


const StyledDivProfil = styled.div`

  

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    
}


.dashboard{
   
    width: calc(100% - 400px);
    height: calc(100vh - 13px);
    padding: 10px 14px;
    background-color :  rgb(248, 248, 252);
    overflow-y: auto;
    
}
.dashboard .dash-info2{
 
    background-color:white;

}
.p{
  padding:20px;
}
 .title .text{
    font-size: 17px;
    font-weight: 500;
    color: #3B5D8F;
  

    
}

.activity-data {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top:20px;
   
  }
  

.activity-data .data
{
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    margin-left:50px;
  
   
   
}

.data-title{
    font-size: 14px;
    color:black;
    font-weight: 500;
    width: calc(100% - 630px);
    margin-top:10px;
   
   
}
 .data .data-list{
   
    font-size: 12px;
    margin-bottom:10px;
  
   
  
}
 
   .links{
   
    letter-spacing:1px;
   
    cursor:pointer;

    color:#3B5D8F;
     
    padding:10px;
    background-color:rgb(248, 248, 252);
    margin-top:50px;
   
   }







   .container {
    display: flex;
   
  }
  
  .left-side {
    

   width:300px;
  }
  







  

  .profile-header {
  
    display: flex;
    flex-direction:column;
    align-items: center;
    padding:20px;
  }
  
  .profile-icon {
    margin-top:10px;
    margin-bottom:5px;
    width: 80px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .profile-icon img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-name .name {
    font-size: 14px;
margin-left:30px;
    color:black;
    
  }
  .profile-name .email{
    color:grey;
    font-size: 13px;
  }

 button{
  margin-top:20px;
 border:none;
 border-radius:5px;
  color:black;
  background-color:white;
  border:1px solid gray;
  padding: 12px 16px; /* add some padding for spacing */
 letter-spacing:2px;
  font-size: 10px;
  cursor:pointer;



 }

 button:hover{
  opacity:0.6;


 }

 input{
width:150px;
    border:none;
    border-bottom: 1px solid black;
outline:none;
padding:4px;
    
   }
  
.left{
  margin-left:100px;
}
.i{
  font-size:18px;
padding:10px 10px 0px 0px;
}

.x{
  margin-top:11px;
 cursor:pointer;
  margin-left:650px;
}

@media (max-width: 1150px) {
 
  .dashboard{
   
   
    width: 150%;
   
  }
  }

  
    `;