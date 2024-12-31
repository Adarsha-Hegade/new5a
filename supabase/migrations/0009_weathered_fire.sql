/*
  # Fix admin policies to avoid recursion
  
  1. Changes
    - Remove recursive policy on admin_users table
    - Simplify admin access checks
    - Add basic self-access policy for admin_users
  
  2. Security
    - Admins can still access all tables
    - Removes infinite recursion issue
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins have full access to admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins have full access to assignments" ON assignments;
DROP POLICY IF EXISTS "Admins have full access to user_assignments" ON user_assignments;
DROP POLICY IF EXISTS "Admins have full access to regular_users" ON regular_users;

-- Create simplified admin_users policy
CREATE POLICY "Admin users can access their own data"
ON admin_users
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create policies for other tables using auth.uid() directly
CREATE POLICY "Admins have full access to assignments"
ON assignments
FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE id = auth.uid()
));

CREATE POLICY "Admins have full access to user_assignments"
ON user_assignments
FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE id = auth.uid()
));

CREATE POLICY "Admins have full access to regular_users"
ON regular_users
FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE id = auth.uid()));