import React from 'react';
import { FileText, Calendar, Clock, Award } from 'lucide-react';
import { UserAssignment } from '../../../types/assignment';
import { getScoreColor } from '../../../utils/scoreUtils';
import { formatDate } from '../../../utils/dateUtils';

interface AssignmentCardProps {
  assignment: UserAssignment;
  onClick: () => void;
}

export default function AssignmentCard({ assignment, onClick }: AssignmentCardProps) {
  const isPending = assignment.status === 'pending';
  const formattedScore = assignment.score !== null 
    ? `${assignment.score}/${assignment.assignment.points}`
    : 'Not graded';

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {assignment.assignment.name}
            </h3>
            <p className="text-sm text-gray-500">
              ID: {assignment.assignment.assignment_id}
            </p>
          </div>
          <FileText className={isPending ? "text-blue-500" : "text-green-500"} size={24} />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Award className="text-purple-500 mr-2" size={16} />
            <span className="text-gray-500 mr-2">Points:</span>
            <span>{assignment.assignment.points}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="text-orange-500 mr-2" size={16} />
            <span className="text-gray-500 mr-2">Duration:</span>
            <span>{assignment.assignment.duration_hours}h</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="text-green-500 mr-2" size={16} />
            <span className="text-gray-500 mr-2">Deadline:</span>
            <span>{formatDate(assignment.assignment.deadline)}</span>
          </div>
          <div className="pt-2 flex items-center justify-between text-sm">
            <span className={`px-2 py-1 rounded-full ${
              isPending ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'
            }`}>
              {isPending ? 'Pending' : 'Completed'}
            </span>
            {!isPending && (
              <span className={`font-semibold ${getScoreColor(assignment.score || 0)}`}>
                {formattedScore}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}