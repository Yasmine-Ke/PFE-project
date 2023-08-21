import styled from 'styled-components';


export default function ModifierR() {
 
 
   
    return(
      <StyledModifierR>
      <div className="container">
      
        <div className="content">
          <form >
            <div className="user-details">
              <div className="input-box">
                <label htmlFor="date">Date du rendez-vous</label>
                <input
                 
                />
                
              </div>
              <div className="input-box">
                <label htmlFor="date">Heure du rendez-vous</label>
                <input
                 
                />
                
              </div>
              <div className="input-box">
                <label htmlFor="service">Sérvice</label>
                <input
                 
                />
              </div>

              <div className="input-box">
                <label htmlFor="medecin">Médecin</label>
                <input
                 
                />
              </div>

            
            </div>

            <div className="button">
              <input type="submit" value="modifier" />
            </div>
          </form>
        </div>
      </div>
    </StyledModifierR>
  );
    


}

const StyledModifierR = styled.div`
.container{
    max-width: 500px;
   
    height:430px;
  }
  .content form .user-details{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
   
    
  }
  form .user-details .input-box{
    margin-bottom: 30px;
    width: calc(100%);
    
  
  }
  form .input-box span.details{
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
   
  }
  .user-details .input-box input{
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1.2px solid #3B5D8F ;
    transition: all 0.3s ease;
    color:#3B5D8F ;
    
  }
  .user-details .input-box input:focus,
  .user-details .input-box input:valid{
    border-color: #3B5D8F ;
   
  }
   form .button{
     height: 45px;
    
    
    
   }
   form .button input{
  
     height: 100%;
     width: 150px;
     border-radius: 5px;
     border: none;
     color:white;
     font-size: 18px;
     font-weight: 500;
     letter-spacing: 1px;
     cursor: pointer;
     transition: all 0.3s ease;
     background:#3B5D8F;
   }
   @media(max-width: 584px){
   .container{
    max-width: 100%;
    
  }
  form .user-details .input-box{
      margin-bottom: 15px;
      width: 100%;
    }
    .content form .user-details{
      max-height: 400px;
      overflow-y: scroll;
    }
    .user-details::-webkit-scrollbar{
      width: 5px;
    }
    
   form .button{
    margin-top:30px;
   
   
  }
   
  }
  `;
