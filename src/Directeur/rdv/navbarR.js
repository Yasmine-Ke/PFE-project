import { useState } from 'react';
import styled from 'styled-components';

 import secretary from '../navbar/secretary.png';
 export default function NavbarR(){


    const [showProfil, setShowProfil] = useState(false);

    const handleProfilClick = () => {
      setShowProfil(true);
    };
  
    const handleCloseProfil = () => {
      setShowProfil(false);
    };
   
return(
    <Navbar>

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <nav>
     
        
        <div class="menu-items">
            <ul class="nav-links">
           
                <li><a href="/directeur/dashboard">
                    <i class="bx bx-home-alt icon"></i>
                    <span class="link-name">Tableau de bord</span>
                </a></li>
                <li class="mini">
              
                    <span >Gestion clinique</span>
                </li>
               
                <li><a href="/directeur/secretaire">
                
                    <i class="bx bx-user icon"></i>
                    <span class="link-name ">Assistants</span>
                </a></li>
                <li><a href="/directeur/medecin">
                
                <i class='bx bx-plus-medical icon'></i>
                <span class="link-name ">Professionnels de santé</span>
            </a></li>
                <div class="div">  <li><a href="/directeur/Rdv">
                    <i class="bx bxs-calendar-event icon"></i>
                    <span class="link-name">Rendez-vous</span>
                </a></li></div>
                 <li><a href="/directeur/patient">
                 <i class='bx bx-body icon'></i>
                    <span class="link-name">Patient</span>
                </a></li>
               
              
              
            </ul>
            
            <ul class="logout-mode">
            <li class="mini">
                   
                   <span >Profil</span>
               </li>
                <li><a href="/signin">
                    <i class="bx bx-log-out icon"></i>
                    <span class="link-name">Deconnecter</span>
                </a></li>

                
            </ul>
        </div>
    </nav>
  
   
   
    </Navbar>
);
}

const Navbar = styled.div`


    
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
    height: 90%;
    width: 250px;
    padding: 10px 14px;
    background-color:white;
    border-right: 1px solid #e6e5e5;
   
   
}
nav .logo-name{
    display: flex;
    align-items: center;
   margin-top:40px;
   font-size: 18px;
   

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
    margin-top: 35px;
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
    padding-top:10px;
    padding-bottom:10px;
    color: #707070;
   
   
   
}
.menu-items li a{
    display: flex;
    align-items: center;
    height: 40px;
    text-decoration: none;
    position: relative;
}
.menu-items li a i{
    font-size: 25px;
    min-width: 45px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black
   
}
.menu-items li a .link-name{
    font-size: 16px;
    font-weight: 400;
    color: black;   
  
    
}

.fichier{
    border-top:1px solid  #e6e5e5;
 

}

.nav-links  li a:hover i,.nav-links  li a:hover .link-name{

   color: #3B5D8F;
   
}
.div  {
    background-color:#ebebf4;
   border-left:5px solid#ACBFE6


}

.div li a i{
   
  color:#6688CC;
   
}

.div li a .link-name{
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
width: 30%;
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