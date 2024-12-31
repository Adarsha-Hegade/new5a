/*
  # Add comprehensive admin policies
  
  1. Changes
    - Add admin policies for all tables
    - Grant full CRUD access to admin users
  
  2. Security
    - Admins can perform all operations on all tables
    - Policies check admin status via admin_users table
*/

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin can manage all assignments" ON assignments;
DROP POLICY IF EXISTS "Admin can manage all user assignments" ON user_assignments;
DROP POLICY IF EXISTS "Admins can manage users" ON regular_users;
DROP POLICY IF EXISTS "Admins can view own data" ON admin_users;

-- Create comprehensive admin policies for all tables
CREATE POLICY "Admins have full access to assignments"
ON assignments
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

CREATE POLICY "Admins have full access to user_assignments"
ON user_assignments
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

CREATE POLICY "Admins have full access to regular_users"
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

CREATE POLICY "Admins have full access to admin_users"
ON admin_users
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