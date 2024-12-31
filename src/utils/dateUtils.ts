import { format, isValid } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return 'Invalid Date';
  }
  return format(date, 'MMM d, yyyy');
}