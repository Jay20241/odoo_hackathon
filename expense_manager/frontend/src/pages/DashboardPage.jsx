// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ExpenseTable from '../components/ExpenseTable';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import CreateExpenseModal from '../components/CreateExpenseModal'; // You would create this component

const DashboardPage = () => {
    // const [isModalVisible, setIsModalVisible] = useState(false);
    
    // API loading state
    const [loading, setLoading] = useState(false);
    // Data from API
    const [expenses, setExpenses] = useState([]);

    // useEffect(() => {
    //   setLoading(true);
    //   apiClient.get('/expenses/my')
    //     .then(res => setExpenses(res.data))
    //     .catch(err => console.error(err))
    //     .finally(() => setLoading(false));
    // }, []);

    return (
        <DashboardLayout pageTitle="My Expenses">
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button type="primary" icon={<PlusOutlined />} /*onClick={() => setIsModalVisible(true)}*/>
                    Submit New Expense
                </Button>
            </div>
            <ExpenseTable data={expenses} loading={loading} />
            {/* <CreateExpenseModal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} /> */}
        </DashboardLayout>
    );
};

export default DashboardPage;