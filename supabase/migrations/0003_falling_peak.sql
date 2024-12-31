/*
  # Fix RLS policies for user management

  1. Changes
    - Update RLS policies to properly handle user creation by admins
    - Add policies for admin authentication checks
    - Fix policy for regular users table

  2. Security
    - Maintain strict access control
    - Ensure admins can manage users
    - Protect user data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can manage all users" ON regular_users;

-- Create new policies for regular_users table
CREATE POLICY "Admins can manage users"
ON regular_users
TO authenticated
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

-- Enable security by default
ALTER TABLE regular_users FORCE ROW LEVEL SECURITY;