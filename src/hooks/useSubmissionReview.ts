import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useSubmissionReview(submissionId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitReview = async (score: number) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_assignments')
        .update({
          score,
          score_status: 'scored'
        })
        .eq('id', submissionId);

      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error };
}