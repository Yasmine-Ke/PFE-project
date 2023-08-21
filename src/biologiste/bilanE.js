import NavbarB from './navbarB';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BilanI from './bilanI';
import Form from './form';
import { useState , useEffect } from 'react';
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function BilanE(){
    const [patients, setPatients] = useState([]);
    const navigate=useNavigate();
 

    const [rdvs, setRdvs] = useState([]);
    useEffect(() => {
      async function fetchRdvs() {
       
         const { data , error } = await supabase

         .from('bilanP')
         .select('date ,file ,type ,  Patient(Name , prenom) ')
        
        ;
  
       
       
        setRdvs(data);
      }
  
      fetchRdvs();
    }, []);
    
    const [showFormA, setShowFormA] = useState(false);

    const handleAjouterClick = () => {
      setShowFormA(true);
    };
  
    const handleCloseAjouter = () => {
      setShowFormA(false);
    };



    const [showAdd, setShowAdd] = useState(false);

    const handleAdd = () => {
      setShowAdd(true);
    };
  
    const handleCloseAdd= () => {
      setShowAdd(false);
    };




   




  const [showE, setShowE] = useState(false);

  const handleE = () => {
    setShowE(true);
  };

  

    const StyledDiv = styled.div`

    



*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
 
}


.dashboard{
  position: relative;
  left: 250px;
  min-height: 100vh;
  width: calc(100% - 250px);
  padding: 10px 14px;
  background-color :  rgb(248, 248, 252);
  
}.dashboard .top {
  position: absolute;
  top: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background-color: white;
  left: 0;
  width: 100%;
}

.dashboard .top .search-box {
  position: relative;
  height: 45px;
  max-width: 600px;
  width: 100%;
  margin: 0 30px;
  margin-left: 85px;
  cursor:pointer;
}

.dashboard .top .search-box input {
  border: 0.8px solid  #f2f2fa;
  background-color: #f2f2fa;
  padding: 0 25px 0 60px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  color: #6688CC;
  font-size: 15px;
  font-weight: 400;
  outline: none;
}

.dashboard .top .search-box i {
  display: block;
  position: absolute;
  left: 20px;

  font-size: 28px;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
}





.dashboard .dash-content{
  padding-top: 10px;
  margin-top:70px;
  
}
.title{
  display: flex;
  align-items: center;

 
  
}
.title .text{
  font-size: 20px;
 
  color: #3B5D8F;
  margin-left: 12px;
 
  
}




.activity .activity-data{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
 
 
 
}

.activity-data .data{
  display: flex;
  flex-direction: column;
  margin-left:30px;
  white-space: nowrap;
  
}
.activity-data .data-title{
  font-size: 16px;
  margin-right:50px;
  cursor:pointer;
margin-bottom:10px;
 font-weight:500;
 
}
.this{
  color: #3B5D8F;
  border-bottom:1px solid  #3B5D8F;
}
.activity-data .data .data-list{
 
  font-size: 14px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  white-space: nowrap;
  cursor:pointer;

 

}
 

  





  

  .modal-overlay2 {
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
    width: 36%;
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
  

.check{

  background-color: #f2f2fa; /* blue background */

  padding: 2px 1px; /* add some padding for spacing */
  border:1px solid #6688CC;
  border-radius: 50%; /* round the button corners */
 color: #6688CC;
}

.check:hover{

  background-color: #6688CC; /* blue background */
 color:white
}
  

.m{
  color:  #3B5D8F;
  font-size:25px;

  margin-top:17px;
  margin-bottom:5px;

  cursor:pointer;
  background-color :  rgb(248, 248, 252);
  margin-left:10px;
  border:none;
}

.m:hover{
  color:#788FB0;
}

.b{
  color :  rgb(248, 248, 252);
}

.list{
  border-bottom:1px solid#DFDFDF;
 

}

.list:hover{
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.border{
  border:1px solid #3B5D8F;
  padding :5px 30px 5px 30px;
  border-radius:30px;
  color:#3B5D8F;

 
}
.add{
  margin-left:-30px;
margin-top:-10px;
  font-size:30px;
  cursor:pointer;
color:#3B5D8F;
}
.first{
  margin-left:100px;
}
.date{
  position:absolute;
  color:gray;
right:30px;}
    `;
    return(
<>
     

        <StyledDiv>    

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
           { showE ?(
           <BilanI></BilanI>
           ):(
       
           
            <section class="dashboard">
              
            <div class="top">
        
            <div class="title">
                   
                 
                   <span class="text"> Centre médical de la mémoire</span>
                  
                 
                  
                   </div>
            <div class="search-box">
                <i class="bx bx-search icon"></i>
                <input type="text" placeholder="Rechercher..."/>
            </div>
          
          
        </div>
       
        <div class="dash-content">
         

            <div class="activity ">
         
             
                    <div class="activity-data">



                 
                    <div class="data names">
               
                       
                    
                       <span class="data-title this ">Bilans </span>
                      
                    </div>
                
                  
                    <i class="bx bx-list-plus add" onClick={handleAdd}></i>

                              {showAdd ? (
           <div className="modal-overlay" onClick={handleCloseAdd}>
             <div className="modal" onClick={(e) => e.stopPropagation()}> 
                 <Form></Form>
             </div>
           </div>
         ) : null}
                </div> 
                </div> 
                </div>  




               
         

     
                {rdvs.map((bilan) => (


  <div class="activity list ">
      
          
      <div class="activity-data">



      <div class="data id">
 
   

<span class="data-list">{bilan.Patient.Name}{bilan.Patient.prenom} </span>

</div>
      <div class="data names">
 
         
      
         <span class="data-list">{bilan.type}</span>
       
      </div>
     
      <div class="data names">
 
         
     
 <span class="data-list border first ">
 <a href={bilan.file} download> Bilan.pdf</a>
 </span>

</div>

     
<div class="data date">
 
         
      
 <span class="data-list ">{bilan.date}</span>

</div>



   
 
  </div> 
  </div>  


))}

  



                </section>
             )
           
          }
                </StyledDiv  > 
                <NavbarB></NavbarB>

                </>  

    );
}