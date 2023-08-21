import styled from 'styled-components';
import { useState } from 'react';
import AjouterL from './ajouterL';
import LettreE from './lettreE';
import LettreR from './lettreR';
import FichierC from '../compteR/fichierC';
import FichierO from '../ordonnance/fichierO';

export default function FichierL(){
 
   

  // show Ordonnance 
  const [showO, setShowO] = useState(false);

  
  const handleShowO = () => {
    setShowO(true);
 
  };


  const handleCloseO = () => {
    setShowO(false);
  }

  // show lettre 

  const [showL, setShowL] = useState(false);


  const handleShowL = () => {
    setShowL(true);
 
  };


  const handleCloseL = () => {
    setShowL(false);
  }


  // show compte 

  const [showC, setShowC] = useState(false);


  const handleShowC = () => {
    setShowC(true);
 
  };


  const handleCloseC = () => {
    setShowC(false);
  }




  const [activeButton, setActiveButton] = useState("emis");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

   
    return(

       

      <StyledDivFichierL>    

      <link
            href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
            rel="stylesheet"
          />
                  
                  <section class="dashboard">
                    
              <div class="links">
              <span class=" hover " onClick={ handleShowO }>Ordonnance</span>
              {showO ? (
        
        <FichierO></FichierO>
        ) :
        null
        
        }     

        <span class="link hover color ">Lettre</span> 
     
      <span class="link hover " onClick={ handleShowC }>Compte rendue</span>
        
        {showC ? (
        
        <FichierC></FichierC>
        ) :
        null
        
        }    
                
      
                <div class="dash-info">
                <span onClick={() => handleButtonClick("emis")} className='content'>emis</span>
      <span onClick={() => handleButtonClick("reçus")} className='content c2'>reçus</span>
      <span onClick={() => handleButtonClick("ajouter")} className="bx bx-plus icon2"> </span>

      {/* Render content based on active button */}
      {activeButton === "emis" && <LettreE />}
      {activeButton === "reçus" && <LettreR />}
      {activeButton === "ajouter" && <AjouterL />}
      
      </div>
      
      
      </div>
           
                      </section>
                  
                      </StyledDivFichierL  > 
         
           

    );
}

const StyledDivFichierL = styled.div`

    


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    overflow-y: auto;
   
} 


.dashboard{
    position: fixed;
    top:50px;
    left: calc(250px + calc(100% - 645px));
    width: calc(100% - (250px + calc(100% - 645px)) - 10px);
    height: calc(100vh - 50px);
    padding: 10px 14px;
    background-color :  rgb(248, 248, 252);
    overflow-y: auto;
    
}

.dashboard .dash-info{
    background-color:white;
   margin-top:10px;
   padding:10px;
  

   
}

   .links{
   
    cursor:pointer;
 margin-top:3px;

    background-color:white;
    
    color:black;
     
    padding:10px;
   }
   .link{
    margin-left:30px;
   }


   .hover:hover{
    color:#3B5D8F;
   }

  .icon2{
    margin-left:100px;
    color:#3B5D8F;
    font-size:20px;
    cursor:pointer;
  }


  .icon{
   
    color:#3B5D8F;

    
  }


.color{
    color:#3B5D8F;
}

.c2{
  margin-left:80px;
}
    `;