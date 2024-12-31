export function validateAssignment(values: any) {
  const errors: Record<string, string> = {};

  if (!values.assignment_id) {
    errors.assignment_id = 'Assignment ID is required';
  }

  if (!values.name) {
    errors.name = 'Assignment name is required';
  }

  if (!values.points) {
    errors.points = 'Points are required';
  } else if (values.points < 0 || values.points > 100) {
    errors.points = 'Points must be between 0 and 100';
  }

  if (!values.deadline) {
    errors.deadline = 'Deadline is required';
  } else {
    const deadlineDate = new Date(values.deadline);
    if (deadlineDate < new Date()) {
      errors.deadline = 'Deadline must be in the future';
    }
  }

  if (!values.duration_hours) {
    errors.duration_hours = 'Duration is required';
  } else if (values.duration_hours < 1) {
    errors.duration_hours = 'Duration must be at least 1 hour';
  }

  return errors;
}