import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data, error } = await supabase
          .from('user_assignments')
          .select(`
            *,
            user:regular_users(name, email),
            assignment:assignments(name, assignment_id, pdf_path)
          `)
          .eq('status', 'completed')
          .order('submitted_at', { ascending: false });

        if (error) throw error;
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  return { submissions, loading, error };
}