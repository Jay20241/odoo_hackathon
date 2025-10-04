// src/components/ExpenseTable.jsx
import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

// This is mock data. You will fetch this from your API.
const mockData = [
  {
    key: '1',
    date: '2025-10-03',
    category: 'Travel',
    description: 'Client Meeting in Mumbai',
    amount: '₹ 15,000',
    status: 'pending',
  },
  {
    key: '2',
    date: '2025-10-02',
    category: 'Food',
    description: 'Team Lunch',
    amount: '₹ 4,500',
    status: 'approved',
  },
  {
    key: '3',
    date: '2025-09-28',
    category: 'Office Supplies',
    description: 'New stationery',
    amount: '₹ 2,100',
    status: 'rejected',
  },
];

const statusColors = {
  approved: 'green',
  pending: 'gold',
  rejected: 'red',
};

// Define columns for the table
const columns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color={statusColors[status]}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
       // Conditionally render buttons for manager's view
      <Space size="middle">
        <Button type="primary" size="small">Approve</Button>
        <Button type="primary" danger size="small">Reject</Button>
      </Space>
    ),
  },
];

const ExpenseTable = ({ data, loading }) => {
  // Use 'data' prop when connected to API, using mockData for now
  return <Table columns={columns} dataSource={mockData} loading={loading} />;
};

export default ExpenseTable;