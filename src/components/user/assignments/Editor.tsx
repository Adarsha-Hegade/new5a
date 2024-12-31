import React from 'react';
import QuillEditor from '../../shared/QuillEditor';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

export default function Editor({ content, onChange, readOnly = false }: EditorProps) {
  return (
    <div className="h-full">
      <QuillEditor
        value={content}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}