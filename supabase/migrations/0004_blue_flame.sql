/*
  # Fix RLS policies for regular users table

  1. Changes
    - Drop existing RLS policies
    - Create new policies that allow:
      - Admins to manage all users
      - Users to view their own data
    - Ensure proper security defaults
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage users" ON regular_users;
DROP POLICY IF EXISTS "Users can view their own data" ON regular_users;

-- Create new policies
CREATE POLICY "Admins can manage users"
ON regular_users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

CREATE POLICY "Users can view their own data"
ON regular_users
FOR SELECT
USING (id = auth.uid());

-- Ensure RLS is enabled
ALTER TABLE regular_users FORCE ROW LEVEL SECURITY;