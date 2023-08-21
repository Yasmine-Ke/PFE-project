import { useState } from 'react';
import styled from 'styled-components';
import HistoriqueM from './historiqueM';
import HistoriqueP from '../bilanP/historiqueP';
 export default function Nav(){
//patient
    const [showFormP, setShowFormP] = useState(false);

    const handleClickP = () => {
      setShowFormP(true);
    };
  
    const handleCloseP = () => {
      setShowFormP(false);
    };

    //medecin

    const [showFormM, setShowFormM] = useState(false);

    const handleClickM = () => {
      setShowFormM(true);
    };
  
    const handleCloseM = () => {
      setShowFormM(false);
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
        left: 250px;
        height: 100%;
        width: 440px;
        padding: 15px 14px;
        background-color :  rgb(248, 248, 252);
        border-radius:0 50px 50px 0;
  
       
       
    }
    nav .logo-name{
        display: flex;
        align-items: center;
       margin-top:40px;
       margin-left:60px;
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
        margin-left:15px;
        font-size: 18px;
        font-weight: 400;
        color: black;   
      
        
    }
    
    
    .nav-links  li a:hover i,.nav-links  li a:hover .link-name{
    
       color: #3B5D8F;
       
    }
    .nav-links .div  {
        background-color:#ebebf4;
      
    
    
    }
    
    
    .nav-links .div li a .link-name{
        color:#6688CC;
    }
    
    
 

    .modal-overlay {
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: flex-end;
       
    
      }
      
      .modal {
        position: absolute;
        top: 0;
        right:0;
        left: auto;
        width: 25%;
        height: 100%;
        background-color: #fff;
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
     
     
            <div class="logoname">
            <span>Gestion des bilans sanguin</span>
           </div>
          
        </div>
        
        <div class="menu-items">
            <ul class="nav-links">
           
               
                <li class="mini">
              
                    <span >GESTION BILANS</span>
                </li>
               
                <li><a href="/bilan">
                
                  
                    <span class="link-name ">Envoyer bilan a un patient </span>
                </a></li>
                <div class="div">
                <li><a href="/bilan/medecin">
               
                    <span class="link-name">Envoyer bilan a un medecin</span>
                </a></li></div>
               
              
              
            
            
          
            <li class="mini">
                   
                   <span >HISTORIQUE</span>
               </li>
                <li><a>
                   
                    <span class="link-name " onClick={handleClickP}>Hisrorique d'envoie aux patients </span>
                    {showFormP ? (
        <div className="modal-overlay" onClick={handleCloseP}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
               <HistoriqueP></HistoriqueP>
          </div>
        </div>
      ) : null}
                </a></li>



                <li>
                    <a href="#">
                    
                    <span class="link-name" onClick={handleClickM}>Hisrorique d'envoie aux medecins </span>
                    {showFormM ? (
        <div className="modal-overlay" onClick={ handleCloseM}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> 
            <HistoriqueM></HistoriqueM>
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