import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useUserStats() {
  const [averageScore, setAverageScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('user_assignments')
          .select('score, assignment:assignments(points)')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .not('score', 'is', null);

        if (error) throw error;

        if (data && data.length > 0) {
          const scorePercentages = data.map(assignment => 
            (assignment.score! / assignment.assignment.points) * 100
          );
          const average = scorePercentages.reduce((a, b) => a + b, 0) / scorePercentages.length;
          setAverageScore(Math.round(average));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { averageScore, loading, error };
}