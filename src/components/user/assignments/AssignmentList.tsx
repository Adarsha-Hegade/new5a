import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAssignments } from '../../../hooks/useUserAssignments';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import StatsCard from './StatsCard';

type FilterType = 'all' | 'pending' | 'completed';

export default function AssignmentList() {
  const { assignments, loading, error } = useUserAssignments();
  const [filter, setFilter] = useState<FilterType>('all');
  const navigate = useNavigate();

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

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  const filteredAssignments = filter === 'all' 
    ? assignments 
    : filter === 'pending' 
      ? pendingAssignments 
      : completedAssignments;

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={FileText}
          title="Total Assignments"
          count={assignments.length}
          color="blue"
          onClick={() => setFilter('all')}
          active={filter === 'all'}
        />
        <StatsCard
          icon={Clock}
          title="Pending"
          count={pendingAssignments.length}
          color="yellow"
          onClick={() => setFilter('pending')}
          active={filter === 'pending'}
        />
        <StatsCard
          icon={CheckCircle}
          title="Completed"
          count={completedAssignments.length}
          color="green"
          onClick={() => setFilter('completed')}
          active={filter === 'completed'}
        />
      </div>

      {/* Assignments Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {filter === 'all' ? 'All Assignments' : 
           filter === 'pending' ? 'Pending Assignments' : 
           'Completed Assignments'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onClick={() => navigate(`/dashboard/assignment/${assignment.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}