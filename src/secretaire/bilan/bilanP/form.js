import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarB from '../bilanM/navbarB';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

 export default function Form(){
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
 
  const [name, setName] = useState('');
  const [idP, setidp] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomString = uuidv4();

    const { data: pdf, error: uploadError } = await supabase.storage
      .from('photo')
      .upload(`pdf/${randomString}_${fileName}`, file);
  
    if (uploadError) {
      console.log(uploadError);
      return;
    }

    const fileUrl = `https://fmwjoeisxodqrjyrlwsx.supabase.co/storage/v1/object/public/photo/pdf/${randomString}_${fileName}`;
  
    setPdfUrl(fileUrl);
  
    const { data: insertedPdf, error: insertError } = await supabase
      .from('bilanP')
      .insert({
        file: fileUrl,
        Name: name,
        date: date,
        idP:idP
      })
      .single();
      alert(`bilan inséré par success`);
      window.location.reload();
    if (insertError) {
      console.log(insertError);
      alert(`erreur d'insertion du bilan`);
      return;
    }
  
    console.log('PDF inserted successfully:', insertedPdf);
  };


  const [showPopupP,setShowPopupP]=useState('');

  const handleShowPopupP = () => {
    setShowPopupP(true);
  }



  const handleClosePopupP = () => {
    setShowPopupP(false);
  }

   






  const [patients, setPatients] = useState([]);
  const navigate=useNavigate();


  useEffect(() => {
      // Fetch user data from Express server
      const fetchUsers = async () => {
        const response = await fetch('/api/listepatient');
        const data = await response.json();
        
        setPatients(data);
      };
  
      fetchUsers();
    }, []);
  
  const [showFormA, setShowFormA] = useState(false);

  const handleAjouterClick = () => {
    setShowFormA(true);
  };

  const handleCloseAjouter = () => {
    setShowFormA(false);
  };

  const [showFormM, setShowFormM] = useState(false);

 /* const handleModifierClick = () => {
    setShowFormM(true);
  };*/

  const handleEdit = (patient) => {
    setShowPopupP(false);
    // Sauvgarder le patient in localstorage 
    
    setName(patient.Name);
    setidp(patient.id);
    //rederiger vers la page update :)
   
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
        top: 90px;
        left: 750px;
        height: 100%;
        width: 880px;
        padding: 15px 14px;
        background-color : white;
  
  
       
       
    }


    .container .title{
      font-size: 25px;
      font-weight: 500;
      position: relative;
    }
    .container .title::before{
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 50px;
      border-radius: 5px;
      background: #3B5D8F;
   
    }
    .content form .user-details{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 40px 100px 12px 0;
      
    }
    form .user-details .input-box{
      margin-bottom: 30px;
      width: calc(100% / 1 - 1px);
     
      
    
    }
    form .input-box span.details{
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
     
    }
    .user-details .input-box input{
      height: 45px;
      width: 60%;
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
     
    }  form .gender-details .gender-title{
      font-size: 20px;
      font-weight: 500;
  
     }



   form .button{
    height: 45px;
   margin-left:0px;
   margin-top:20px;
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



  .popup-modal-content1 {
    
    background-color: white;
    margin-left:690px;
    overflow-y: auto;
    padding: 20px;
    margin-left:536px;
    margin-top:30px;
    width:451px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    height: 220px; /* set the maximum height to 500px */
    }


.popup1 {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;

}








.activity1 .activity-data1{
  display: flex;

 
}
.activity-data1 .data1{
  display: flex;
  flex-direction: column;
  margin-left:40px;
 
 
 
}
.activity-data1 .data-title1{
  font-size: 20px;
  font-weight: 500;
  color: black;

 
}
.activity-data1 .data1 .data-list1{
 
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  white-space: nowrap;
 

}


.my{

background-color: #f2f2fa; 
margin-bottom:6px;

padding: 0.5px 0.5px; 
border:1px solid #c7d4ed;
border-radius: 2px; /* round the button corners */
color:  #f2f2fa;
}

.my:hover{


color:#b1c4eb;
}
 

.d{
color:white;
font-size:24px;
}
        `;
return(
    <Navbar>
    

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <nav>
       <div className="container">
        <div className="title">Envoyer un bilan : </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
             
             
              <div className="input-box ">
                <span className="details">Patient</span>
                <input type="text" onClick={handleShowPopupP} required
          placeholder="Choisir un patient"   value={name}
          onChange={(e) => setName(e.target.value)}/>
              </div>
              {showPopupP ? (

<div onClick={handleClosePopupP} className="popup1">
<div  onClick={(e) => e.stopPropagation()} className="popup-modal-content1">
<section >
       

       <div class="dash-content1">
        

           <div class="activity1">
        
                   <div class="activity-data1">


                 


                 


                   <div class="data1 id">
             
             <span class="d">c</span>
            
             {patients.map((patient) => (
                 
         
            <button class="bx bx-check icon data-list1 my" onClick={() => handleEdit(patient)} ></button>
            ))}
         </div>

                   <div class="data1 id">
              
              <span class="data-title1">Id</span>
             
              {patients.map((patient) => (
                  
          
             <span class="data-list1">{patient.id}</span>
             ))}
          </div>
          
                   <div class="data1 names">
              
                       <span class="data-title1">Nom et prenom </span>
                      
                       {patients.map((patient) => (
                           
                   
                      <span class="data-list1">{patient.Name}</span>
                      ))}
                   </div>

                 
                   
                  
                  
                  </div>
               </div> 
               </div>  
               </section>
           
</div>
</div>


) : null}
              <div className="input-box">
                <span className="details">Date d'aujourd'hui </span>
                <input    type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} required
          placeholder="Enter date" />
              </div>
              <div className="input-box">
  <span className="details">Fichier </span>
  <input 
    type="file" 
    onChange={(e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }} 
  />
  {file && (
    <p>Fichier sélectionné: {fileName}</p>
  )} 
</div>

  



</div>


            <div className="button">
              <input type="submit" value="enregistrer" />
            </div>
           
          </form >
          {pdfUrl && (
        <div>
          <p>PDF uploaded successfully:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
        </div>
      )}
        </div>
      </div>
    </nav>
  

   
    </Navbar>
);
}