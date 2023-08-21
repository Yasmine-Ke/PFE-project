import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

 export default function FormI(){
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
 
  const [name, setName] = useState('');
  const [prenom, setprenom] = useState('');
  const [idP, setidp] = useState('');
  const [date, setDate] = useState('');




  const iddrdv = JSON.parse(localStorage.getItem('idrdv'));
  
  const idlettre = JSON.parse(localStorage.getItem('idlettre'));
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
      .from('bilanM')
      .insert({
        file: fileUrl,
        date: new Date(),
        idR: iddrdv,
      idL:idlettre
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
    setprenom(patient.prenom);
    setidp(patient.id);
    //rederiger vers la page update :)
   
  };
  



return(
    <Navbar>
    

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />



      
          <form onSubmit={handleSubmit}>
            <div className="user-details">
             
            <span className="details">Fichier </span>
     
              
              <div className="input-box">

  <input 
    type="file" 
    onChange={(e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);

  
    }} 
  />


  
</div>

<div className="button">
              <input type="submit" value="Enregistrer" />
            </div>
           



</div>

{file && (
    <p>Fichier sélectionné: {fileName}</p>
  )} 


          </form >
          
          {pdfUrl && (
        <div>
          <p>PDF uploaded successfully:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
        </div>
      )}
       
   
  

   
    </Navbar>
);
}


const Navbar = styled.div`
form .user-details {
  display: flex; 
  justify-content: space-around; 
  align-items: center; 
  margin-top:40px;
}

form .user-details .input-box input {
  height: 45px;
  width:100%;
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1.2px solid #3B5D8F;
  transition: all 0.3s ease;
  color: #3B5D8F;
}

form .button input {
  height: 35px;
  width: 100px;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 10px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #3B5D8F;
}

    `;