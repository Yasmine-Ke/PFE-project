/*import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Document, Page, pdfjs } from 'react-pdf';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function P() {
  const [fileData, setFileData] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: file, error } = await supabase
        .from('bilanM')
        .select('file ,name,date')
        .eq('id', 1)
        .single();
      if (error) throw error;
      setFileData(file);
      setFileUrl(file.file);
    };
    fetchFile();
  }, []);

  return (
    <div>
      {fileData && (
        <div>
          <h1>User Information</h1>
          <p>Name: {fileData.name}</p>
          <p>Email: {fileData.id}</p>
          <p>Phone: {fileData.date}</p>
        </div>
      )}
      {fileUrl && (
        <Document file={fileUrl}>
          <Page pageNumber={2} />
        </Document>
      )}
    </div>
  );
}*/

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

export default function P() {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: file, error } = await supabase
        .from('bilanM')
        .select('file ,name,date')
        .eq('id', 1)
        .single();
      if (error) throw error;
      setFileData(file);
    };
    fetchFile();
  }, []);

  return (
    <div>
      {fileData && (
        <div>
          <h1>User Information</h1>
          <p>Name: {fileData.name}</p>
          <p>Email: {fileData.id}</p>
          <p>Phone: {fileData.date}</p>
          <a href={fileData.file} target="_blank">Voir le fichier PDF</a>
        </div>
      )}
    </div>
  );
}
