import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

const StyledDivMeet = styled.div`
  .p {
    padding: 20px;
  }
  .dash-info2 {
    background-color: white;
  }
`;

function Meet() {
 

  const [patients, setPatients] = useState([]);
  
  const [rdvs, setRdvs] = useState([]);
   
        
  useEffect(() => {
    async function fetchRdvs() {
     
       const { data: ordonnances, error: ordonnancesError } = await supabase.from('Meet').select('*');
      if (ordonnancesError) {
        console.error('Error fetching ordonnances:', ordonnancesError);
        return;
      }
      const patientid = JSON.parse(localStorage.getItem('patientid'));
     
      const ids = ordonnances.map((ordonnance) => ordonnance.idR);
      const { data: patientsData, error: patientsError } = await supabase
      .from('Rdv')
      .select('idP , idM , idR ,date , time ,type , medecin(id , name).name as medecin_name')
      .in('idR', ids)
      .eq('idP', patientid)
      ;

      if (patientsError) {
        console.error('Error fetching Rdvs:', patientsError);
        return;
      }
     
      
      const patientsWithRdvs = patientsData.map((patient) => {
        const patientRdvs = ordonnances.filter((ordonnance) => ordonnance.idR === patient.idR);
        return {
          ...patient,
          rdvs: patientRdvs,
        };
      });
     const idy = patientsWithRdvs.map((ordonnance) => ordonnance.idM);
      const { data: medecinD, error: medecinError } = await supabase
      .from('medecin')
      .select('id , name')
      .in('id', idy)
     ;

     const medecinWithRdvs = medecinD.map((patient) => {
      const patientRdvs = patientsWithRdvs.filter((ordonnance) => ordonnance.idM === patient.id);
      return {
        ...patient,
        rdvs: patientRdvs,
      };
    });
      setRdvs(medecinWithRdvs);
    }

    fetchRdvs();
  }, []);
      
         
          
          return (
            <StyledDivMeet>
              <div className="dash-info2 p">
              {rdvs.map((medecin) => (
    <li key={medecin.id}>
  
      <ul>
        {medecin.rdvs.map((rdv) => (
            <>
          {rdv.rdvs.map((ordonnance) => (
                     <div>
                     <span>rendez-vous du :{rdv.date}</span> <span>A l'heure :{rdv.time}</span>
                     <br />
                     <span>Avec le Medecin :{medecin.name}</span>
                     <br />
                     lien : <a href={ordonnance.lien}> {ordonnance.lien}</a>
                   </div>
                  ))}

                  </>
              ))}
               
                </ul>
              </li>
            ))}
             
              </div>
            </StyledDivMeet>
          );
          
}

export default Meet;
