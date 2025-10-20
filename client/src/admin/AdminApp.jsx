import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AdminServices from './AdminServices.jsx';
import AdminUsers from './AdminUsers.jsx';
import AdminInquiries from './AdminInquiries.jsx';
import AdminPayments from './AdminPayments.jsx';

const AdminNav = () => (
  <div className="row" style={{gap:10, flexWrap:'wrap'}}>
    <Link to="/admin">Dashboard</Link>
    <Link to="/admin/services">Services</Link>
    <Link to="/admin/users">Users</Link>
    <Link to="/admin/inquiries">Inquiries</Link>
    <Link to="/admin/payments">Payments</Link>
  </div>
);

export default function AdminApp(){
  const { user } = useAuth();
  if (!user) return <Navigate to="/login?admin=1" replace />;
  if (user.role !== 'admin') return <div className="card">You need admin access.</div>;
  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', margin:'10px 0'}}>
        <h2>Admin</h2>
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

