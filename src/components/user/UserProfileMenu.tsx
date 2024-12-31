import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

interface UserProfileMenuProps {
  onClose: () => void;
  onSignOut: () => void;
}

export default function UserProfileMenu({ onClose, onSignOut }: UserProfileMenuProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <Link
          to="/dashboard/profile"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={onClose}
        >
          <User className="mr-3 h-4 w-4" />
          Your Profile
        </Link>
        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}