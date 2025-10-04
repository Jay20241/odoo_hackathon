import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ApprovalsTable from '../components/ApprovalsTable';
import apiClient from '../api/apiClient';
import { message } from 'antd';

const ApprovalsPage = () => {
    const [loading, setLoading] = useState(false);
    const [pendingExpenses, setPendingExpenses] = useState([]);

    const fetchPendingExpenses = () => {
        setLoading(true);
        apiClient.get('/expenses/pending')
            .then(res => setPendingExpenses(res.data))
            .catch(err => {
                console.error(err);
                message.error("Failed to load pending approvals.");
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPendingExpenses();
    }, []);

    return (
        <DashboardLayout pageTitle="Pending Approvals">
            <ApprovalsTable 
                data={pendingExpenses} 
                loading={loading} 
                onActionSuccess={fetchPendingExpenses} // Refresh data after action
            />
        </DashboardLayout>
    );
};

export default ApprovalsPage;
