import React from 'react';
import { FileText, Clock, Award, Calendar } from 'lucide-react';
import { Assignment } from '../../../types/assignment';
import { format } from 'date-fns';
import AssignUserModal from './AssignUserModal';

interface AssignmentGridProps {
  assignments: Assignment[];
}

export default function AssignmentGrid({ assignments }: AssignmentGridProps) {
  const [selectedAssignment, setSelectedAssignment] = React.useState<Assignment | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {assignment.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    ID: {assignment.assignment_id}
                  </p>
                </div>
                <FileText className="text-blue-500" size={24} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Award className="text-purple-500 mr-2" size={16} />
                  <span>Points: {assignment.points}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="text-green-500 mr-2" size={16} />
                  <span>Deadline: {format(new Date(assignment.deadline), 'PPp')}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="text-orange-500 mr-2" size={16} />
                  <span>Duration: {assignment.duration_hours} hours</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <a
                  href={assignment.pdf_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View PDF
                </a>
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Assign Users
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <AssignUserModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </>
  );
}