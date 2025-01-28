import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../lib/supabase';

export default function FileUpload({ userId }: { userId: string }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const { data, error } = await supabase.storage
      .from('assignments')
      .upload(`${userId}/${Date.now()}_${file.name}`, file);

    if (!error) {
      // Create submission record
      await supabase
        .from('submissions')
        .insert({ 
          user_id: userId, 
          file_path: data.path,
          status: 'submitted'
        });
    }
  }, [userId]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag & drop files here, or click to select</p>
    </div>
  );
}