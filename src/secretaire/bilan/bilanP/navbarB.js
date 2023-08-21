import { useState } from 'react';
import styled from 'styled-components';
import Profil from '../../profil/profil';


 export default function Navbar(){

    const [showProfil, setShowProfil] = useState(false);
    const Name=localStorage.getItem('usernameA');
    const handleProfilClick = () => {
      setShowProfil(true);
    };
  
    const handleCloseProfil = () => {
      setShowProfil(false);
    };
    const Navbar = styled.div`

    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    
    }
    
    
    
    nav{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 250px;
        padding: 15px 14px;
        background-color:white;
        border-right: 1px solid #e6e5e5;
      
       
       
    }
    nav .logo-name{
        display: flex;
        align-items: center;
       margin-top:40px;
       font-size: 20px;
       
    
    }
    
    nav .logo-image{
        display: flex;
        justify-content: center;
        min-width: 45px;
    }
    nav .logo-image img{
        width: 70px;
        height:50px;
        object-fit: cover;
        border-radius: 50%;
    }
    
    nav .menu-items{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
    
       
    }
    .menu-items li{
        list-style: none;
        margin-bottom:12px;
       
       
    }
    
    .menu-items .mini{
        border-top: 1px solid #e6e5e5;
        border-bottom: 1px solid #e6e5e5;
        padding-top:20px;
        padding-bottom:20px;
        color: #707070;
       
       
       
    }
    .menu-items li a{
        display: flex;
        align-items: center;
        height: 50px;
        text-decoration: none;
        position: relative;
    }
    .menu-items li a i{
        font-size: 30px;
        min-width: 45px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black
       
    }
    .menu-items li a .link-name{
        font-size: 18px;
        font-weight: 400;
        color: black;   
      
        
    }
    
    
    .nav-links  li a:hover i,.nav-links  li a:hover .link-name{
    
       color: #3B5D8F;
       
    }
    .nav-links div  {
        background-color:#ebebf4;
       border-left:5px solid#ACBFE6
    
    
    }
    
    .nav-links div li a i{
    
      color:#6688CC;
       
    }
    
    .nav-links div li a .link-name{
        color:#6688CC;
    }
    
    
    
    
    @media (max-width: 1150px) {
    
        nav{
            width: 73px;
        }
        nav .logoname{
            opacity: 0;
            pointer-events: none;
        }
        nav li a .link-name{
            
            opacity: 0;
            pointer-events: none;
        }
    
    .menu-items .mini span{
       opacity:0;
    }
    
    
    .nav-links div  {
        background-color:white;
       border-left:5px solid white;
    
    }
    
    }
    
    
    








  

  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
   

  }
  
  .modal {
    position: absolute;
    top: 0;
    right:0;
    left: auto;
    width: <40%;
    height: 100%;
    background-color: rgb(248, 248, 252);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    animation: slide-in 0.4s ease-in-out forwards;
   
  }


  @keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
  
    
    
        `;
return(
    <Navbar>

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <nav>
        <div class="logo-name">
     
        <div class="logo-image">
               <img/>
             
            </div>
            <div class="logoname">
            <span>{Name}</span>
           </div>
          
        </div>
        
        <div class="menu-items">
            <ul class="nav-links">
           
                <li><a href="#">
                    <i class="bx bx-home-alt icon"></i>
                    <span class="link-name">Acceuil</span>
                </a></li>
                <li class="mini">
              
                    <span >gestion clinique</span>
                </li>
               
                <li><a href="/patient">
                
                    <i class="bx bx-user icon"></i>
                    <span class="link-name ">Patients</span>
                </a></li>
                <li><a href="/rdv">
                    <i class="bx bxs-calendar-event icon"></i>
                    <span class="link-name">Rdvs</span>
                </a></li>
                <li><a href="/ListeInc">
                    <i class="bx bxs-message-square-detail icon"></i>
                    <span class="link-name">ListeInsertionC</span>
                </a></li>
               <div><li><a href="/bilan">
                    <i class="bx bxs-message-square-detail icon"></i>
                    <span class="link-name">Bilan</span>
                </a></li></div> 
              
              
            </ul>
            
            <ul class="logout-mode">
            <li class="mini">
                   
                   <span >mon compte</span>
               </li>
                <li><a href="/loginuser">
                    <i class="bx bx-log-out icon"></i>
                    <span class="link-name">Deconnecter</span>
                </a></li>

                <li class="mode">
                    <a href="#">
                        <i class="bx bx-user-circle icon" onClick={handleProfilClick} ></i>
                    <span class="link-name" onClick={handleProfilClick}>Profil</span>
                    {showProfil ? (
        <div className="modal-overlay" onClick={handleCloseProfil}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
               <Profil></Profil>
              
          </div>
        </div>
      ) : null}
                </a>

                
            </li>
            </ul>
        </div>
    </nav>

   
   
    </Navbar>
);
}