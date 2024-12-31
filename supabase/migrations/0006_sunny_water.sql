/*
  # Add new fields to assignments table

  1. Changes
    - Add points field (integer)
    - Add deadline field (timestamptz)
    - Add duration_hours field (integer)
    - Add name field (text)

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE assignments
ADD COLUMN name text NOT NULL,
ADD COLUMN points integer NOT NULL DEFAULT 100,
ADD COLUMN deadline timestamptz NOT NULL,
ADD COLUMN duration_hours integer NOT NULL DEFAULT 24;