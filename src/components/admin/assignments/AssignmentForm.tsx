import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from '../../../hooks/useForm';
import { useAssignmentUpload } from '../../../hooks/useAssignmentUpload';
import { validateAssignment } from '../../../utils/validators';
import FormField from './form/FormField';
import PDFSelector from './form/PDFSelector';

interface AssignmentFormProps {
  onClose: () => void;
}

export default function AssignmentForm({ onClose }: AssignmentFormProps) {
  const { createAssignment, loading: creating } = useAssignmentUpload();
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      assignment_id: '',
      name: '',
      points: 100,
      deadline: '',
      duration_hours: 24,
    },
    validate: validateAssignment,
    onSubmit: async (values) => {
      if (!selectedFile) {
        setFileError('Please enter a PDF URL');
        return;
      }
      setFileError('');
      
      await createAssignment({
        ...values,
        pdf_path: selectedFile,
      });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create Assignment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Assignment ID" error={errors.assignment_id}>
            <input
              type="text"
              name="assignment_id"
              value={values.assignment_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </FormField>

          <FormField label="Assignment Name" error={errors.name}>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </FormField>

          <FormField label="Points" error={errors.points}>
            <input
              type="number"
              name="points"
              min="0"
              max="100"
              value={values.points}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </FormField>

          <FormField label="Deadline" error={errors.deadline}>
            <input
              type="datetime-local"
              name="deadline"
              value={values.deadline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </FormField>

          <FormField label="Duration (hours)" error={errors.duration_hours}>
            <input
              type="number"
              name="duration_hours"
              min="1"
              value={values.duration_hours}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </FormField>

          <PDFSelector
            value={selectedFile}
            onChange={setSelectedFile}
            error={fileError}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || creating}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
            >
              {isSubmitting || creating ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}