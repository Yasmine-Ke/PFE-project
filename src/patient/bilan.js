import { useState , useEffect } from 'react';
import styled from 'styled-components';


const { createClient } = require('@supabase/supabase-js');




const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
 export default function Bilan(){
    const [fileData, setFileData] = useState(null);
    const patientid = JSON.parse(localStorage.getItem('patientid'));
    useEffect(() => {
      const fetchFile = async () => {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: file, error } = await supabase
          .from('bilanP')
          .select('file ,date, idP')
       .eq('idP' ,patientid )
          
        if (error) throw error;
        setFileData(file);
      };
      fetchFile();
    }, []);
   
return(
    <NavbarBilan>

<link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />


    <nav>
        <div class="historique">
     
           
            <span>Mes bilan  </span>
           </div>
          
       
        
        <div class="items">
            <ul >
            {fileData && fileData.map((file) => (
           
                <li class="box">
                
                    <span class=" bx bx-history icon color">Date:  {file.date} </span>
                   
                    <div>
                    <a href={file.file} target="_blank">
                    Voir le Bilan PDF
                  </a>
              
                </div>
                
                </li>
               
          
       
        

               ))}
            </ul>
           
        </div>
    </nav>
  
   
   
    </NavbarBilan>
);
}

const NavbarBilan = styled.div`

 
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

}



nav{
    position: fixed;
    top: 0;
    left: 40px;
    height: 100%;
    width: 350px;
    padding: 15px 14px;
    background-color:white;
    overflow: auto; 
   
   
}
nav .historique{
    display: flex;
   margin-top:40px;
   margin-left:60px;
   font-size: 20px;
   color:#3B5D8F;
   

}
nav .items{
    margin-top: 40px;
    display: flex;
    flex-direction: column;

   
}
.items li{
    list-style: none;
    margin-bottom:12px;
   
   
}

.items .box{
    border-top: 1px solid #e6e5e5;
    padding-top:20px;
    padding-bottom:20px;
   
   
   
   
}

.color{
    color: #707070;
}





.button{
    height: 45px;
   margin-left:70px;
   margin-top:100px;
  }
.button input{
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


.color1{
color:black;
}



    `;