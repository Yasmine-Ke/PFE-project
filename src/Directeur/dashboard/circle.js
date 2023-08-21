import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import styled from 'styled-components';

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function Circle() {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const StyledDiv = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
.wrapper {
  margin-top: 30px;
  height:320px;
  background-color:white;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.labelBox {
  display: flex;
  align-items: center;
  margin-top:-50px;
  margin-bottom: 50px;
  margin-left:20px;

}

.miniBox {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;

}

span {
  font-size: 14px;
  font-weight: 500;
}



`;


  const formattedData = [
    {
      x: "Femmes",
      y: 0,
      color: "#C4D0E9", 
    },
    {
      x: "Hommes",
      y: 0,
      color: "#87A0D2", 
    },
  ];
  

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: patientData, error } = await supabase
          .from('Patient')
          .select('genre');
  
        if (error) {
          throw new Error(error.message);
        }
  
        const stats = {
          femmes: 0,
          hommes: 0,
        };
  
        patientData.forEach((patient) => {
          if (patient.genre === "Femme") {
            stats.femmes++;
          } else if (patient.genre === "Homme") {
            stats.hommes++;
          }
        });
  
        formattedData[0].y = stats.femmes;
        formattedData[1].y = stats.hommes;
  
        const totalPatients = formattedData.reduce((total, data) => total + data.y, 0);
  
        formattedData.forEach((data) => {
          data.label = `${((data.y / totalPatients) * 100).toFixed(2)}%`;
        });
  
        setPatientData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  
  return (
    <StyledDiv>
      
      <div className="wrapper">
   
    <VictoryPie
      data={patientData}
      colorScale={patientData.map((data) => data.color)}
      labelRadius={50}
      style={{ labels: { fontSize: 17, fontWeight: "bold", color: "white" } }}
    />
     <div className="labelBox">
      <div className="miniBox" style={{ backgroundColor: "#ACBFE6" }}></div>
      <span>Femme</span>
    </div>
    <div className="labelBox">
      <div className="miniBox" style={{ backgroundColor: "#87A0D2" }}></div>
      <span>Homme</span>
    </div>
  </div>
  

    </StyledDiv>
  
  
);
}

