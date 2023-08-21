import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import Telecon from './telecon';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function UpdateRdv() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const months = [
    new Date(currentYear, currentMonth, 1),
  
  ];

  const Nav = styled.div`
 
  .calendar {
  
    margin-top: 20px;

    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width:100%;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    background-color:#E7EBF3;
    margin-top:60px;
  }
  
  .calendar-header button {
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-weight: 600;
    color:#6688CC;
    cursor: pointer;
  }
  
  .calendar-header .month {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
  
    height: 50px;
    font-size: 16px;
    color: #3B5D8F;
    background-color: #fff;
    border-bottom: 1px solid #E2E8F3;
    cursor: pointer;
  }
  
  
  .calendar-day:hover {
    background-color: #f5f5f5;
  }
  
  .calendar-day.selected {
    background-color: #6688CC;
    color: #fff;
  }
  
  .work-hours {
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    width:430px;
   background-color:#E7EBF3;

  }

  .work-hours-header {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }
  
  .work-hour.disabled {
    color: #ddd;
    cursor: default;
   
  }

  .hours{
    margin-top:20px;
    background-color:#E7EBF3;
    padding:23px;
    height:80px;
    border:2px solid white;
    color:#3B5D8F;
    border-radius:8px;
  }
  .hours.selected{
    background-color: #3B5D8F;
    color:white;
  }

  .hours:hover {
   opacity:0.7;
  }
  .bx{
    display:flex;
    font-size:18px;
    margin-left:4px;
  }

  h3{
    margin-top:20px;
  }



  .btn{
    height: 45px;
    margin: 40px 0;
   margin-left:520px;
  }
  .btn{
   
    width: 150px;
    border-radius: 5px;
    border: none;
    color:white;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background:#3B5D8F;
  }  


  .checkbox-label {
    display: inline-flex;
    align-items: center;
    margin-top:40px;
  }
  
.checkbox-input {
  position: absolute;
  opacity: 0;
}

.checkbox-input + .checkbox-text:before {
  content: "";
  display: inline-block;
  width: 12px; /* adjust as needed */
  height: 12px; /* adjust as needed */
  margin-right: 5px; /* adjust as needed */
  border: 1px solid #333; /* adjust as needed */
  border-radius: 3px; /* adjust as needed */
  vertical-align: middle; /* center the checkmark vertically */
}

.checkbox-input:checked + .checkbox-text:before {
  content: "âœ”";
  margin-right: 5px; /* adjust as needed */
  font-size: 10px; /* adjust as needed */

  color: #333; /* adjust as needed */
  vertical-align: middle; /* center the checkmark vertically */
}
  
  
  `;


  return (
    <Nav>
      <div>
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Prec</button>
          <div className="month">
            {months[0].toLocaleString('default', { month: 'long' })}{' '}
            {currentYear}
            {months.length > 1 && ' - '}
            {months.length > 1 &&
              months[1].toLocaleString('default', { month: 'long' })}{' '}
            {months.length > 1 && currentYear + 1}
          </div>
          <button onClick={handleNextMonth}>Suiv</button>
        </div>
        {/* Calendar grid */}
        {months.map((month) => (
          <Month
            key={month}
            month={month}
            selectedDay={selectedDay}
            handleDayClick={handleDayClick}
          />
        ))}
        {selectedDay && (
          <WorkHours selectedDay={selectedDay} />
        )}
      </div>
    </Nav>
  );
}

function Month({ month, selectedDay, handleDayClick }) {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const monthName = month.toLocaleString('default', { month: 'long' });
  const year = month.getFullYear();
  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const Nav = styled.div`
    // styling code...
  `;

  return (
    <Nav>
    <div className="calendar">
      {days.map((day) => (
        <div
          key={`${year}-${month.getMonth()}-${day}`}
          className={`calendar-day ${
            selectedDay &&
            selectedDay.getFullYear() === year &&
            selectedDay.getMonth() === month.getMonth() &&
            selectedDay.getDate() === day
              ? 'selected'
              : ''
          }`}
          onClick={() =>
            handleDayClick(new Date(year, month.getMonth(), day))
          }
        >
          {day}
        </div>
      ))}
    </div>
    </Nav>
  );
}





function WorkHours({ selectedDay  }) {
 
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(0);

 


 
  const selectedService=localStorage.getItem("selectedservice");
 
  
    const [date, setDate] = useState(selectedDay);
    const [heure, setheure] = useState(parseInt(selectedHour));

    
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    
    const [Service, setservice] = useState(selectedService);
    const [Medecin, setmedecin] = useState(selectedDoctor);
  useEffect(() => {
   
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    async function fetchAvailableHours(day) {
    
      const dayInUTC = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
    
      const { data, error } = await supabase
        .from('Rdv')
        .select('time')
        .eq('date', dayInUTC.toISOString())
        .eq('idM', selectedDoctor)
        .order('time', { ascending: true });
        
      if (error) {
        console.error(error);
        return [];
      }
      console.log( dayInUTC);
      const availableTimes = data.map((r) => r.time);
      const availableHours = availableTimes.map((time) => time.toString() + ':00');
    
      return availableHours.length > 0 ? availableHours : ["Aucune heure disponible pour ce jour"];
    }
    fetchAvailableHours(selectedDay).then(setAvailableHours);
  }, [selectedDay ] );

  const Nav = styled.div`
    // styling code...
  `;

  const startHour = 8;
  const endHour = 16;
  const workHours = [];

  for (let i = startHour; i <= endHour; i++) {
    workHours.push(`${i}:00`);
  }

  const availableHoursToShow = workHours.filter((hour) =>
    !availableHours.includes(hour)
    
  );

  console.log('availableHoursToShow', availableHoursToShow);
  const patientid = localStorage.getItem("patientid");
  const patientgenre = localStorage.getItem("patientgenre");
  const patientname = localStorage.getItem("patientname");
  const [name, setName] = useState(patientname);
  const [genre, setgenre] = useState(patientgenre);
  const [type, settype] = useState('');
 
  const [id, setid] = useState(patientid);

  const idrdv = localStorage.getItem("idrendezvsupdate");
  const insertPatient1 = async (selectedHour) => {
   
    try {
      if (!selectedHour) {
        throw new Error('Selected hour is empty');
      }

      const dayInUTC = new Date(Date.UTC(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate()));
      // Insert patient data into Express server
      const response = await fetch('/api/updaterdvsecretaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({ type ,  date: dayInUTC.toISOString() ,selectedHour: parseInt(selectedHour) ,idrdv , selectedDoctor })
      });

      const { data, error } = await response.json();
      if (!error) { // vérifier si l'insertion a réussi
        console.log('fichier inserted successfully');
        alert('Rendez-vous modifier par succès');
        window.location.reload();
      } else {
        console.log('Insertion failed:', error);
        alert('Modification échoué: ' + error.message); // afficher une alerte en cas d'échec
      }
    } catch (error) {
      console.log('Error inserting patient data:', error.message);
    }




    
  };



 
  const handleSubmit = event => {
    event.preventDefault();
  
      insertPatient1(selectedHour);
      setName(patientname);
      settype('');
      setmedecin(selectedDoctor);
      setservice(selectedService);
      setDate(selectedDay);
      setheure(parseInt(heure));

      setgenre(patientgenre);
    setid(patientid);
  };


  





  const [showT, setShowT] = useState(false);

  const handleShowT = () => {
    setShowT(true);
  };
  
  
  return (
    <Nav>
   
     
  
        <h3>Heures disponibles le : {selectedDay.toLocaleDateString()}</h3>
     
      <div>
        {availableHoursToShow.length > 0 ? (
          availableHoursToShow.map((hour) => (
          <>
            <button className={`hours ${selectedHour === hour ? 'selected' : ''}`}
            key={hour}
            onClick={() => setSelectedHour(hour)}>
              <i class="bx bx-sun"></i>
              {hour}
            </button>
           
  
</>  
          ))
        ) : (
         
          <p>Aucune heure disponible pour ce jour</p>
          
        )}
      </div>
            

         
     {
      selectedHour ?(


        <>
        <br/>
        <div className="form-group">
          <label htmlFor="Method" className="form-label">veuillez choisir </label>
          <select className="form-select"
          
          value={type}
          onChange={(e) => settype(e.target.value)}
          
          >
             <option value="">veuillez choisir </option>
            <option value="rdv">RDV</option>
            <option value="domicile">Domicile</option>
          </select>
        </div>
        
                  <button class="btn"onClick={handleSubmit} >Modifier le rdv</button>
                  </>
       
      ):(
        null
      )
     }
 
      
    </Nav>
  );
        }  