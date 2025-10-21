import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminServices from './AdminServices.jsx';
import AdminUsers from './AdminUsers.jsx';
import AdminInquiries from './AdminInquiries.jsx';
import AdminPayments from './AdminPayments.jsx';

const AdminNav = () => (
  <div className="flex flex-wrap gap-2">
    {[
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/services', label: 'Services' },
      { to: '/admin/users', label: 'Users' },
      { to: '/admin/inquiries', label: 'Inquiries' },
      { to: '/admin/payments', label: 'Payments' },
    ].map((i) => (
      <Link key={i.to} to={i.to} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 transition">
        {i.label}
      </Link>
    ))}
  </div>
);

export default function AdminApp(){
  const { user } = useAuth();
  if (!user) return <Navigate to="/login?admin=1" replace />;
  if (user.role !== 'admin') return <div className="card">You need admin access.</div>;
  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <h2 className="text-2xl font-extrabold text-slate-900">Admin</h2>
        <AdminNav />
      </div>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="payments" element={<AdminPayments />} />
      </Routes>
    </div>
  );
}
