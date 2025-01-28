import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const [comments, setComments] = useState<any[]>([]);

  // Fetch initial comments
  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('pdf_comments')
        .select('*')
        .eq('pdf_url', fileUrl);
      setComments(data || []);
    };

    fetchComments();
  }, [fileUrl]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('pdf-comments')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'pdf_comments'
      }, (payload) => {
        if (payload.new.pdf_url === fileUrl) {
          setComments(prev => [...prev, payload.new]);
        }
      })
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [fileUrl]);

  const handleAddComment = async (position: { x: number; y: number }, text: string) => {
    const { data } = await supabase
      .from('pdf_comments')
      .insert({
        pdf_url: fileUrl,
        x_position: position.x,
        y_position: position.y,
        content: text,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });
    
    if (data) setComments(prev => [...prev, data[0]]);
  };

  return (
    <div className="pdf-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} />
      </Worker>
      
      {comments.map(comment => (
        <div 
          key={comment.id}
          className="comment-marker"
          style={{ left: comment.x_position, top: comment.y_position }}
        >
          {comment.content}
        </div>
      ))}
    </div>
  );
}