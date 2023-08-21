import styled from 'styled-components';
import { useState} from 'react';
export default function LoginM(){


    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/loginMe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    // Store the user ID in local storage
    localStorage.setItem('userprofil', data.id);
  localStorage.setItem('name', data.name); 
    // Redirect to user information page
    window.location.href = `/medecin/rdv`;
  };

    const Login = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

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
    return(
        <Login>
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
                            <input type="text" placeholder="Mot de passe"   value={password}
          onChange={(e) => setPassword(e.target.value)}/>
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="form-link">
                            <a href="#" class="forgot-pass">Mot de passe oublier ?</a>
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
</Login>
    );
}