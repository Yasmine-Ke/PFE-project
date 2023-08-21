import styled from 'styled-components';
import Calendar from './calender';
import DoctorDashboard from './circle';
export default function Right (){

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
        position: fixed;
        top:40px;
        left: calc(250px + calc(100% - 615px));
        width: calc(100% - (250px + calc(100% - 615px)) - 10px);
        height: 100%;
        padding: 10px 14px;
        overflow-y: auto;
        
       
    }


    @media (max-width: 1150px) {
 
        .dashboard{
         
         display:none;
         
        }
        }
      
   `;
 
    return(
<StyledDiv>

    <div class="dashboard">
      <Calendar></Calendar>
      <DoctorDashboard></DoctorDashboard>
        
    </div>
</StyledDiv>
    );
}