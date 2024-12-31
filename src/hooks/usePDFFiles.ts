import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PDFFile {
  name: string;
  url: string;
}

export function usePDFFiles() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPDFFiles() {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .storage
          .from('assignments')
          .list();

        if (error) throw error;

        if (!isMounted) return;

        // Filter PDF files and create URLs
        const pdfFiles = (data || [])
          .filter(file => file.name.toLowerCase().endsWith('.pdf'))
          .map(file => {
            const { data: { publicUrl } } = supabase
              .storage
              .from('assignments')
              .getPublicUrl(file.name);

            return {
              name: file.name,
              url: publicUrl
            };
          });

        setFiles(pdfFiles);
      } catch (err: any) {
        if (isMounted) {
          console.error('Error fetching PDF files:', err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPDFFiles();

    return () => {
      isMounted = false;
    };
  }, []);

  return { files, loading, error };
}