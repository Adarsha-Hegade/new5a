import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types/user';

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('regular_users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  return { userProfile, loading, error };
}