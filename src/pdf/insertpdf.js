/*


import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

const InsertPDF = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileData, setFileData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: pdf, error: uploadError } = await supabase.storage
      .from('photo')
      .upload(`pdf/${fileName}`, file);
  
    if (uploadError) {
      console.log(uploadError);
      return;
    }

    const fileUrl = `https://fmwjoeisxodqrjyrlwsx.supabase.co/storage/v1/object/public/photo/pdf/${fileName}`;
  
    setPdfUrl(fileUrl);
  
    const { data: insertedPdf, error: insertError } = await supabase
      .from('bilanM')
      .insert({
        file: fileUrl
      })
      .single();
  
    if (insertError) {
      console.log(insertError);
      return;
    }
  
    console.log('PDF inserted successfully:', insertedPdf);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
        />
      
        <button type="submit">Upload</button>

      </form>
      {pdfUrl && (
        <div>
          <p>PDF uploaded successfully:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default InsertPDF;*/
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

const InsertPDF = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileData, setFileData] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: pdf, error: uploadError } = await supabase.storage
      .from('photo')
      .upload(`pdf/${fileName}`, file);
  
    if (uploadError) {
      console.log(uploadError);
      return;
    }

    const fileUrl = `https://fmwjoeisxodqrjyrlwsx.supabase.co/storage/v1/object/public/photo/pdf/${fileName}`;
  
    setPdfUrl(fileUrl);
  
    const { data: insertedPdf, error: insertError } = await supabase
      .from('bilanM')
      .insert({
        file: fileUrl,
        name: name,
        date: date
      })
      .single();
  
    if (insertError) {
      console.log(insertError);
      return;
    }
  
    console.log('PDF inserted successfully:', insertedPdf);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter date"
        />
        <button type="submit">Upload</button>

      </form>
      {pdfUrl && (
        <div>
          <p>PDF uploaded successfully:</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default InsertPDF;
