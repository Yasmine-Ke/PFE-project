import { useState ,useEffect} from 'react';
import styled from 'styled-components';
import AppointmentChart from './rdv';
import Patient from './patient';
export default function Left(){
 
   
    const [showS, setShowS] = useState(false);

    const handleS = () => {
      setShowS(true);
  };
  const handleCS = () => {
    setShowS(false);
};


const [showP, setShowP] = useState(false);

const handleP = () => {
  setShowP(true);
};
const handleCP = () => {
setShowP(false);
};
    const StyledDiv = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
       
    }
    
    
    .dashboard{
      background-color :  rgb(248, 248, 252);
        position: relative;
        left: 250px;
        width: calc(100% - 610px);
        height: calc(100vh - 13px);
        padding: 10px;
       
    }
    .dashboard .top{
        position: fixed;
        top:0;
        height:40px;
        left: 250px;
        display:flexbox;
        width: calc(100% - 250px);
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background-color:white;
       
    
       
    }
    
     .title .text{
        font-size: 17px;
        font-weight: 500;
        color: #3B5D8F;
        
    
        
    }
    
    
    
     .activity-data{
      margin-top:40px;
       background-color:#E7EBF3;
    display: grid;
    border-radius:10px;
    border-top:5px solid  rgb(248, 248, 252);
    border-bottom:5px solid  rgb(248, 248, 252);
    padding:30px;
    
    }
    
    .activity-data2{
       
       background-color:white;
       height:370px;
       margin-top:20px;
     cursor:pointer;
    }
   
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:  rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        
      }
      
      .popup-modal-content {
        height:500px;
        width:1000px;
        background-color:  white;
        padding: 50px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        text-align: center;
       
      }
      .patient{
margin-left:250px;
      }


    .activity-data3{
      padding:10px;
       display: flex;
       justify-content: space-around;
       align-items: center;
      
      
   
   }

   .pat{
   border-radius:10px;
   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    padding:20px 10px 20px 10px;
    display : flex;
   

   }

   .rdv{
    border-radius:10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
 background-color: #3B5D8F;
     padding:20px 10px 20px 10px;
     display : flex;
    
 
    }


 .icon{

  height: 30px;
  width: 30px;
  color: #3B5D8F;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
 
}
.icon2{

  height: 30px;
  width: 30px;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
 
}

.nbP{
color:#3B5D8F;
margin-left:5px;
margin-top:3px;
font-size:20px;
}

.nbR{
  color:white;
  margin-left:5px;
  margin-top:3px;
  font-size:20px;
  }

@media (max-width: 1150px) {
 
  .dashboard{
   
    left: 73px;
    width: calc(100% + 300px);
   
  }
  }

   `;
 
    return (
          
     <StyledDiv>
     
        <div class="dashboard">
                
       <div class="top">
       
       <div class="title">
      
                             
                     
                             <span class="text">tableau de bord  </span>
                        
            
                    
                  </div>
         
         
       </div>
<div class="dash-info2">

        <div class="activity-data">
<h2>Bonjour , MR Belbachir</h2>

<p>Explorez les statistiques de cette année! </p>


     </div> 
     <br/>
<div class="activity-data3">

  <div class="pat">
  <i class="bx bx-user icon"></i>
   <span class="nbP"> 15 Patients
   </span>
  
  </div>
 
  <div class="pat">
  <i class="bx bx-user icon"></i>
   <span class="nbP"> 1O medecins</span>
  
  </div>
  <div class="rdv">
  <i class="bx bx-user icon2"></i>
   <span class="nbR"> 67 Rdvs</span>
  
  </div>
</div>

<br/>
<h4 >Rendez-vous de l'année 
   
</h4>
<div class="activity-data2">
<span onClick={handleS}><AppointmentChart ></AppointmentChart></span>


</div> 

  


     </div> 
     </div>
     </StyledDiv>
     
     ); }

    
  
 