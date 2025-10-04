import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber, Select, message } from 'antd';
import apiClient from '../api/apiClient';

const { Option } = Select;

const CreateExpenseModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [approvalFlows, setApprovalFlows] = useState([]);

  // Fetch available approval flows when the modal becomes visible
  useEffect(() => {
    if (visible) {
      apiClient.get('/approval-flows')
        .then(response => {
          setApprovalFlows(response.data);
        })
        .catch(error => {
          console.error("Failed to fetch approval flows", error);
          message.error("Could not load approval flows.");
        });
    }
  }, [visible]);


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format date before sending
      const payload = {
        ...values,
        date: values.date.toISOString(),
      };

      await apiClient.post('/expenses', payload);
      message.success('Expense submitted successfully!');
      setLoading(false);
      form.resetFields();
      onSuccess(); // Callback to refresh the parent component's data
      onCancel(); // Close the modal
    } catch (error) {
      setLoading(false);
      console.error('Validation Failed:', errorInfo);
      message.error('Failed to submit expense. Please check the form fields.');
    }
  };

  return (
    <Modal
      title="Submit New Expense"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="expense_form">
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>
        <Form.Item name="currency" label="Currency (e.g., INR, USD)" initialValue="INR" rules={[{ required: true, message: 'Please input the currency!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select placeholder="Select a category">
                <Option value="Travel">Travel</Option>
                <Option value="Food">Food</Option>
                <Option value="Office Supplies">Office Supplies</Option>
                <Option value="Other">Other</Option>
            </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="date" label="Date of Expense" rules={[{ required: true, message: 'Please select the date!' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
         <Form.Item name="approvalFlowId" label="Approval Flow" rules={[{ required: true, message: 'Please select an approval flow!' }]}>
            <Select placeholder="Select the approval process">
                {approvalFlows.map(flow => (
                    <Option key={flow._id} value={flow._id}>{flow.name}</Option>
                ))}
            </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateExpenseModal;
