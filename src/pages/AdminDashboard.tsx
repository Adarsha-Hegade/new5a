import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import UserManagement from '../components/admin/UserManagement';
import AssignmentManagement from '../components/admin/AssignmentManagement';
import AdminOverview from '../components/admin/AdminOverview';
import SubmissionsList from '../components/admin/submissions/SubmissionsList';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/assignments" element={<AssignmentManagement />} />
        <Route path="/submissions" element={<SubmissionsList />} />
      </Routes>
    </AdminLayout>
  );
}