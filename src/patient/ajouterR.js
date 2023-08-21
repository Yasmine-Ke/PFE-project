import styled from 'styled-components';
import { useState } from 'react';
import SpecM from './specM';

export default function AjouterR(){
    const [showSm, setShowSm] = useState(false);

  
    const handleShowSm= () => {
      setShowSm(true);
   
    };
  
  
    const handleCloseSm = () => {
      setShowSm(false);
    }
   
    
    return(

       

    <>

      
               
          {showSm ? (
            <>
          
            <SpecM>
            </SpecM>
        
            </>
          ) : (
            <StyledDivAjouterR>
              <section class="dashboard">
                <i class="bx bx-calendar-plus"></i>
                <p class="p" onClick={handleShowSm}>rendez-vous</p>
                <p onClick={handleShowSm}>prenez un rdv ou une téléconsultation </p>
                <p class="p2" onClick={handleShowSm}>enligne</p>
              </section>
            </StyledDivAjouterR>
          )}
          
                  
            </>         
         
           

    );
}

const StyledDivAjouterR = styled.div`

  

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    overflow-y: auto;
   
} 


.dashboard{
    position: fixed;
   top:55px;
    left: calc(250px + calc(100% - 645px));
    width: calc(100% - (250px + calc(100% - 645px)) - 10px);
    height: 100%;
    padding: 10px 14px;
   
   
    
}

.bx{
    color:#3B5D8F;
    font-size:80px;
    margin-top:200px;
    margin-left:130px;

}
.p{
    margin-left:120px;
    
    color:#3B5D8F;
    font-size:18px;
    cursor:pointer;
}

p{
    margin-left:20px;
    cursor:pointer;

}

.p:hover{
    
    opacity:0.7;
}
.p2{
    margin-left:140px;
    cursor:pointer;
}

@media (max-width: 1150px) {
 
  .dashboard{
   
   display:hidden;
  }
  }


  @media (max-width: 1150px) {
 

   
   .dashboard{
      position: relative;
      top:-200px;
      left: 200px;
    }
    }
  
    `;