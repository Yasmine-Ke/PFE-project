import styled from 'styled-components';
import { useState} from 'react';

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

const Loginme = styled.div`


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.form{
    position: absolute;
    max-width: 430px;
    width: 100%;
    padding: 30px;
    border-radius: 6px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    margin-left:500px;
    margin-top:200px;
    background: #FFF;
}
header{
    font-size: 28px;
    font-weight: 600;
    color: #232836;
    text-align: center;
}
form{
    margin-top: 30px;
}
.form .field{
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: 6px;
}
.field input,
.field button{
    height: 100%;
    width: 100%;
    border: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 6px;
}
.field input{
    outline: none;
    padding: 0 15px;
    border: 1px solid#CACACA;
}
.field input:focus{
    border-bottom-width: 2px;
}
.eye-icon{
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #8b8b8b;
    cursor: pointer;
    padding: 5px;
}
.field button{
    color: #fff;
    background-color:#3B5D8F;
    transition: all 0.3s ease;
    cursor: pointer;
}
.field button:hover{
    background-color: #016dcb;
}
.form-link{
    text-align: center;
    margin-top: 10px;
}
.form-link span,
.form-link a{
    font-size: 14px;
    font-weight: 400;
    color: #232836;
}
.form a{
    color: #6688CC;
    text-decoration: none;
}
.form-content a:hover{
    text-decoration: underline;
}
.line{
    position: relative;
    height: 1px;
    width: 100%;
    margin: 36px 0;
    background-color: #d4d4d4;
}
.line::before{
    content: 'OU';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    color: #8b8b8b;
    padding: 0 15px;
}
.media-options a{
    display: flex;
    align-items: center;
    justify-content: center;
}
a.facebook{
    color: #fff;
    background-color: #4267b2;
}
img.google-img{
    height: 20px;
    width: 20px;
    object-fit: cover;
}
a.google{
    border: 1px solid #CACACA;
}
a.google span{
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
}

@media screen and (max-width: 1000px) {
   .form{
    margin-left:300px;
    margin-top:100px;
   }
}

@media screen and (max-width: 768px) {
    .form{
     margin-left:70px;
     margin-top:100px;
    }

 }
 
  
`;
export default function User(){


    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
  
    if (data.error) {
        alert(data.error);
      } else if (!data.iduser) { 
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
       // localStorage.setItem('userprofil', data.iduser);
       // localStorage.setItem('name', data.Name);
      
    
       if (data.Role === 'Biologiste') {
        window.location.href = '/biologiste';
      } else if (data.Role === 'Medecin') {
        localStorage.setItem('idusermedecin', JSON.stringify(data.iduser));
        try {
          const { data: patientsData, error: patientsError } = await supabase
            .from('medecin')
            .select('*')
            .eq('iduser', data.iduser);
            
          if (patientsError) {
            alert('Error fetching patients:', patientsError);
            return;
          }
          if (patientsData[0].Service === 'biologiste') {
            localStorage.setItem('idmedecin', JSON.stringify(patientsData[0].id));
            localStorage.setItem('name', JSON.stringify(patientsData[0].name));
            // Wait for the data to be stored in localStorage before redirecting
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            window.location.href = '/biologiste';
          } else  {
          localStorage.setItem('idmedecin', JSON.stringify(patientsData[0].id));
          localStorage.setItem('name', JSON.stringify(patientsData[0].name));
          // Wait for the data to be stored in localStorage before redirecting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          window.location.href = '/medecin/rdv';}
        } catch (error) {
          alert('Error fetching medecin data:', error);
          return;
        }
      } else if (data.Role === 'Directeur') {
        window.location.href = '/directeur/acceuil';
      } else if (data.Role === 'Assistant') {

        try {
          const { data: patientsDataA, error: patientsError } = await supabase
            .from('Assistant')
            .select('*')
            .eq('iduser', data.iduser);
            
          if (patientsError) {
            alert('Error fetching patients:', patientsError);
            return;
          }
          
          localStorage.setItem('userId', JSON.stringify(patientsDataA[0].idA));
          localStorage.setItem('usernameA', JSON.stringify(patientsDataA[0].nom));
          
          // Wait for the data to be stored in localStorage before redirecting
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          window.location.href = '/patient';
        } catch (error) {
          alert('Error fetching medecin data:', error);
          return;
        }
      }
      
      } 
      
  };
  
  
   
    return(
        <Loginme>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
<body>
        <section class="container forms"/>
            <div class="form login">
                <div class="form-content">
                    <header>Se Connecter</header>
                    <form onSubmit={handleSubmit}>
                        <div class="field input-field">
                            <input type="text" placeholder="nom d'utilisateur"    value={username}
          onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        

                        <div class="field input-field">
                            <input type="password" placeholder="Mot de passe"   value={password}
          onChange={(e) => setPassword(e.target.value)}/>
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                       

                        <div class="field button-field">
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>

                  {/*  <div class="form-link">
                        <span>pas de compte ? <a href="#" class="link signup-link">S'inscrire</a></span>
    </div>
    
    
    
    <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    */}
                </div>

              

               


            </div>
</body>
</Loginme>
    );
}

