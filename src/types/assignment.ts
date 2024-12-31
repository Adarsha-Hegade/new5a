export interface Assignment {
  id: string;
  assignment_id: string;
  name: string;
  pdf_path: string;
  points: number;
  deadline: string;
  duration_hours: number;
  created_at: string;
  created_by: string;
}

export interface UserAssignment {
  id: string;
  user_id: string;
  assignment_id: string;
  status: 'pending' | 'completed';
  score: number | null;
  score_status: 'pending' | 'scored';
  content: string | null;
  last_saved: string;
  submitted_at: string | null;
  created_at: string;
  assignment: {
    assignment_id: string;
    name: string;
    pdf_path: string;
    points: number;
    deadline: string;
    duration_hours: number;
  };
}