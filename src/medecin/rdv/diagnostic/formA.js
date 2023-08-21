import { useState } from 'react';
import styled from 'styled-components';

 export default function FormA(){
   
return(
    <Navbar>

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <nav>
       <div className="container">
        <div className="title">ajouter une nouvelle consultation </div>
        <div className="content">
          <form  >
            <div className="user-details">
              <div className="input-box">
                <span className="details">nom du medecin</span>
               
                <input type="text" />
              </div>
              <div className="input-box">
                <span className="details">service </span>
                <input  type="text"/>
              </div>
              <div className="input-box">
                <span className="details">date</span>
                <input type="text"  />
              </div>
              <div className="input-box">
                <span className="details">antesedent medicales</span>
                <input type="text"  />
              </div>
              <div className="input-box">
                <span className="details">traitement abituelle</span>
                <input type="text"  />
              </div>
              <div className="input-box">
                <span className="details">motif de consultation</span>
                <input type="text"  />
              </div>
              <div className="input-box">
                <span className="details">Conclusion</span>
                <input type="text"  />
              </div>

  



</div>


            <div className="button">
              <input type="submit" value="enregistrer" />
            </div>
           
          </form>
        </div>
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
    color:black;

}




.container .title{
  font-size: 25px;
  font-weight: 500;
  position: relative;
}
}
form .input-box span.details{
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
 
}




form .button{
height: 45px;
margin-left:0px;
margin-top:30px;
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
    `;