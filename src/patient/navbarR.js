import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';


import MesRdv from './mesRdv';

import Bilan from './bilan';
export default function NavbarR (){
    const [isActive, setIsActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  };


// show and close ord 
  const [showOrd, setShowOrd] = useState(false);

  const handleShowOrd = () => {
    setShowOrd(true);
  };

  const handleCloseOrd = () => {
    setShowOrd(false);
  };


// show and close lettre
const [showL, setShowL] = useState(false);

const handleShowL = () => {
  setShowL(true);
};

const handleCloseL = () => {
  setShowL(false);
};




// show and close Compte rendue
const [showC, setShowC] = useState(false);

const handleShowC = () => {
  setShowC(true);
};

const handleCloseC = () => {
  setShowC(false);
};



// show and close Compte rendue
const [showB, setShowB] = useState(false);

const handleShowB = () => {
  setShowB(true);
};

const handleCloseB = () => {
  setShowB(false);
};
   

    return(
        <NavNavbarR >
 <nav className="navbar">
    
      <div className="navbar__toggle" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={isActive ? "navbar__menu--active" : "navbar__menu"}>
      
        <li className="navbar__item">
          <a href="#" className="navbar__link my">Acceuil</a>
        </li>
       
        <li className="navbar__item">
          <a href="#" className="navbar__link" onClick={handleShowB}> Bilans</a>
          {showB ? (
        <div className="modal-overlay" onClick={handleCloseB}>
          <div className="modal2" onClick={(e) => e.stopPropagation()}> 
             <Bilan></Bilan>
          </div>
        </div>
      ) : null}
        </li>
       
       
       
        <li>
          <a href="/acceuil" className="navbar__link last">Déconnecter</a>
        </li>
      </ul>
    </nav>
   

 
 

</NavNavbarR >



    );
}


 
const NavNavbarR  = styled.div`

    
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}

  
  .navbar__toggle {
    display: none;
    cursor: pointer;
  }
  
  .navbar__toggle span {
    display: block;
    width: 30px;
    height: 3px;
    margin-bottom: 5px;
    background-color:black;
  }
  
 
  ul {
    list-style-type: none;
  }
  
  .navbar__menu--active {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
  }
  

  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:white;
    font-size: 16px;
    padding: 20px;  
   border-bottom:1px solid  rgb(235, 235, 235);
 
  }
  
  .navbar__menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
  
  }

  
  .navbar__link {
    color: rgb(55, 55, 55);
 
    text-decoration: none;
    margin: 50px 50px;
    transition: all 0.3s ease-in-out;
  }
  
  .navbar__link:hover {
    color:#3B5D8F;
  }
  .my{
    color:#3B5D8F;
    margin-left:120px;
  }
  .last {
    margin-left: 150px;
  }
  
  @media screen and (max-width: 1000px) {
    .navbar {
      padding: 10px;
    }
  
    .navbar__toggle {
      display: block;
    }
  
    .navbar__menu {
      display: none;
    }
  
    .navbar__link {
     
      margin: 0px 10px;
  
    }
    .navbar__menu--active {
      display: flex;
    }
  
    .navbar__item {
      margin: 10px 0;
    }
  }
  







.modal-overlay {
position: fixed;
z-index: 1;
top: 0;
right: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.3);
display: flex;
justify-content: flex-end;


}

.modal {

   
width: 40%;
height: 100%;
background-color: white;
justify-content: center;

padding: 20px;
animation: slide-in 0.4s ease-in-out forwards;
overflow-y: auto;
}

.modal2 {

   
width: 28%;
height: 100%;
background-color: white;
justify-content: center;

padding: 20px;
animation: slide-in 0.4s ease-in-out forwards;
overflow-y: auto;
}


@keyframes slide-in {
from {
transform: translateX(100%);
}
to {
transform: translateX(0);
}
}


@media (max-width: 1300px) {
 
  .modal{
   
    width: 90%;
   
  }.modal2{
   
    width: 90%;
   
  }
  }


    `;