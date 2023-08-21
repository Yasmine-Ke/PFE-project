import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

export default function DocumentList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: files, error } = await supabase.storage.from('photo').list('');
      if (error) throw error;

      // Download each file as a Blob and set the resulting Blob as the file object
      const filesWithBlob = await Promise.all(
        files.map(async (file) => {
          const { data, error } = await supabase.storage
            .from('photo')
            .download(file.name);
          if (error) throw error;
          const blob = new Blob([data]);
          return {
            ...file,
            blob,
          };
        })
      );
      setFiles(filesWithBlob);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h3>Liste des documents :</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={URL.createObjectURL(file.blob)} download={file.name}>
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

    