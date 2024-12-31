/*
  # Add Assignment Management Columns
  
  1. Changes
    - Add deadline column for assignment due dates
    - Add duration_hours column for time limits
    - Add name column for assignment titles
    - Add points column for maximum score
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to assignments table
ALTER TABLE assignments
ADD COLUMN IF NOT EXISTS deadline timestamptz,
ADD COLUMN IF NOT EXISTS duration_hours integer DEFAULT 24,
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS points integer DEFAULT 100;

-- Make columns NOT NULL after adding them to handle existing rows
DO $$ 
BEGIN
  -- Update any existing rows with default values
  UPDATE assignments 
  SET 
    deadline = COALESCE(deadline, now() + interval '7 days'),
    duration_hours = COALESCE(duration_hours, 24),
    name = COALESCE(name, assignment_id),
    points = COALESCE(points, 100);

  -- Now make the columns NOT NULL
  ALTER TABLE assignments 
    ALTER COLUMN deadline SET NOT NULL,
    ALTER COLUMN duration_hours SET NOT NULL,
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN points SET NOT NULL;
END $$;