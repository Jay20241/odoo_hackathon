// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css'; // Ant Design styles
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// import ApprovalsPage from './pages/ApprovalsPage'; // You would create this page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/approvals" element={<ApprovalsPage />} /> */}
        {/* Default route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;