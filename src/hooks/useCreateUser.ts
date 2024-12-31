import { supabase } from '../lib/supabase';
import { User } from '../types/user';

export async function createUser(userData: Partial<User> & { password: string }) {
  try {
    // First check if we're authenticated as admin
    const { data: { user: adminUser } } = await supabase.auth.getUser();
    if (!adminUser) {
      throw new Error('Not authenticated as admin');
    }

    // Check if admin exists in admin_users table
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', adminUser.id)
      .single();

    if (!adminData) {
      throw new Error('Not authorized to create users');
    }

    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email!,
      password: userData.password,
      email_confirm: true,
      user_metadata: {
        username: userData.username,
        name: userData.name,
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    // Create regular user record
    const { error: userError } = await supabase
      .from('regular_users')
      .insert({
        id: authData.user.id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        date_of_birth: userData.date_of_birth,
        password_hash: 'DEPRECATED' // Required by schema but not used
      });

    if (userError) {
      // Cleanup auth user if regular user creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error('Failed to create user account');
    }

    return authData.user;
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error;
  }
}