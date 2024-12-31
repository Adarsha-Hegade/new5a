import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSubmissionReview } from '../../../hooks/useSubmissionReview';
import PDFViewer from '../../shared/PDFViewer';
import QuillEditor from '../../shared/QuillEditor';

export default function SubmissionReviewModal({ submission, onClose }) {
  const [score, setScore] = useState(submission.score || '');
  const { submitReview, loading } = useSubmissionReview(submission.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitReview(parseInt(score));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Review Submission - {submission.assignment.name}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 p-4 min-h-0">
          <div className="flex flex-col h-full">
            <h4 className="font-medium mb-2">Assignment PDF</h4>
            <div className="flex-1 border rounded-lg overflow-hidden">
              <PDFViewer pdfUrl={submission.assignment.pdf_path} />
            </div>
          </div>

          <div className="flex flex-col h-full">
            <h4 className="font-medium mb-2">Student's Answer</h4>
            <div className="flex-1 border rounded-lg overflow-hidden">
              <QuillEditor
                value={submission.content}
                readOnly={true}
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Score (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}