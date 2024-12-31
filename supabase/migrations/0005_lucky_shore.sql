/*
  # Fix admin users table and policies

  1. Changes
    - Drop duplicate columns from admin_users
    - Recreate admin policies with proper checks
    - Ensure proper security defaults
*/

-- Fix admin_users table
ALTER TABLE admin_users 
DROP COLUMN IF EXISTS username,
DROP COLUMN IF EXISTS email;

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can manage all users" ON admin_users;

-- Create new admin policies
CREATE POLICY "Admins can view own data"
ON admin_users
FOR SELECT
USING (id = auth.uid());

-- Ensure RLS is enabled
ALTER TABLE admin_users FORCE ROW LEVEL SECURITY;