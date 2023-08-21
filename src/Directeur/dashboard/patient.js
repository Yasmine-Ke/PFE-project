import React, { useState, useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Patient() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxY, setMaxY] = useState(0);
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const { data: appointments, error } = await supabase
          .from("Patient")
          .select("date");
          console.log(appointments);

        if (error) {
          throw new Error(error.message);
        }

        // Count the number of appointments for each month of this year
        const monthCounts = Array(12).fill(0);
        appointments.forEach((appointment) => {
          const date = new Date(appointment.date);
          if (date.getFullYear() === new Date().getFullYear()) {
            monthCounts[date.getMonth()]++;
          }
        });

           // Convert the month counts into an array of data points
           const appointmentData = monthCounts.map((count, index) => ({
            x: index + 1,
            y: count,
            label: count.toString(),
          }));

       
// Filter out the data points with y value of 0
const filteredData = appointmentData.filter((datum) => datum.y !== 0);

setAppointmentData(filteredData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointment data...</p>;
  }

  if (error) {
    return <p>Error loading appointment data: {error}</p>;
  }

  return (
    <VictoryChart
      domainPadding={{ x:10 }}
     
    >
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        tickFormat={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
      />
    
 

  
      <VictoryBar
        data={appointmentData}
        x="x"
        y="y"
        style={{ data: { fill: "#87A0D2" } }}
        labels={({ datum }) => datum.label}
         barWidth={20}
      />
    </VictoryChart>
  );
}
