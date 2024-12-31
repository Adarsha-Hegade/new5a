import React from 'react';
import { useAssignments } from '../../../hooks/useAssignments';
import AssignmentGrid from './AssignmentGrid';

export default function AssignmentList() {
  const { assignments, loading, error } = useAssignments();

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Error loading assignments: {error}
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No assignments found. Create one to get started.</p>
      </div>
    );
  }

  return <AssignmentGrid assignments={assignments} />;
}