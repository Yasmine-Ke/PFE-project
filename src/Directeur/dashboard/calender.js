import React, { useState , useEffect} from 'react';
import styled from 'styled-components';
export default function Calendar() {
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
  
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
  
  .calendar-header {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width:100%;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    padding:10px;
    background-color:#E7EBF3;

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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 7);
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



