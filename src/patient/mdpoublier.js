import styled from 'styled-components';
import { useState} from 'react';
export default function Mdpoublie(){


    const [username, setUsername] = useState('');
    const [newpassword, setnewpassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [ok, setok] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/mdp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      // Identification réussie, réinitialisez l'erreur
      setError(null);
      setok('Identification correcte');
    } else {
      // Identification incorrecte, définissez l'erreur
      setError('Identification incorrecte');
    }
  };
  
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const response = await fetch('/patient/newmdp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newpassword , username})
    });
    const data = await response.json();
    if (response.ok) {
      alert('mot de passe modifier !');
      window.location.href = '/patient/login';
    } else {
      alert('rechanger votre mot de passe  !');
    }
  };
    return(
        <LoginLoginP>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
<body>
        <section class="container forms"/>
            <div class="form login">
                <div class="form-content">
                    <header>Recupérer votre mot de passe </header>
                    <form onSubmit={handleSubmit2}>
                        <div class="field input-field">
                            <input type="text" placeholder="username"    value={username}
          onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div onSubmit={handleSubmit}>
                      
                        </div>
                        <div class="field input-field">
                            <input type="email" placeholder="Email"   value={password}
          onChange={(e) => setPassword(e.target.value)}/>
                            <i class='bx bx-hide eye-icon'></i>
                        </div>
                        {error && <p className="error-message">Nom d'utilisateur ou Email incorrect</p>}
                      
                        {ok && (
  <div class="field input-field">
    <input type="text" placeholder="saisir votre nouveau mot de passe "
    value={newpassword}
    onChange={(e) => setnewpassword(e.target.value)} />
  </div>

)} {ok &&(

    <div class="field button-field">
    <button onClick={handleSubmit2}>Valider le mot de passe </button>
</div>
    )


}

                        <div class="field button-field">
                            <button onClick={handleSubmit}>Saisir le nouveau mot de passe </button>
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

                <div class="line"></div>

               


            </div>
</body>
</LoginLoginP>
    );
}


const LoginLoginP = styled.div`
  

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
    margin-top:100px;
    background: #FFF;
}
.error-message {
    color: red;
    font-size: 12px;
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