import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface CreateAssignmentData {
  assignment_id: string;
  name: string;
  points: number;
  deadline: string;
  duration_hours: number;
  pdf_path: string;
}

export function useAssignmentUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAssignment = async (data: CreateAssignmentData) => {
    setLoading(true);
    setError(null);

    try {
      // Create assignment record
      const { error: dbError } = await supabase
        .from('assignments')
        .insert({
          assignment_id: data.assignment_id,
          name: data.name,
          points: data.points,
          deadline: data.deadline,
          duration_hours: data.duration_hours,
          pdf_path: data.pdf_path,
        });

      if (dbError) throw dbError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAssignment, loading, error };
}