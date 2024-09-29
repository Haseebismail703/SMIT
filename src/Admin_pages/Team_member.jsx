import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Layout } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Admin_nav from '../Admin_comp/Admin_navbar';

const { Content } = Layout;

const NewMemberTable = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${url}/admin/teammember`);
            setDataSource(response.data);
        } catch {
            message.error('Failed to fetch members');
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${url}/admin/teammember`, values);
            message.success('New member added successfully');
            setIsModalVisible(false);
            form.resetFields();
        } catch {
            message.error('Failed to add member');
        }
    };

    const handleDelete = async (key) => {
        try {
            await axios.delete(`${url}/members/${key}`);
            setDataSource(dataSource.filter((item) => item._id !== key));
            message.success('Member deleted successfully');
        } catch {
            message.error('Failed to delete member');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Expertise',
            dataIndex: 'expertise',
            key: 'expertise',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <DeleteOutlined
                    style={{ color: 'red', marginLeft: 20 }}
                    onClick={() => handleDelete(record._id)}
                />
            ),
        },
    ];

    return (
        <div>
            <Admin_nav />
            <center>
                <h1>All Members</h1>
            </center>
            <Button
                type="primary"
                onClick={showModal}
                style={{ marginBottom: '16px', marginLeft: 75 }}
            >
                Add New Member
            </Button>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        scroll={{ x: '100%' }}
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </Content>

            <Modal
                title="Add New Member"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input the address!' }]}
                    >
                        <Input placeholder="Enter address" />
                    </Form.Item>

                    <Form.Item
                        label="Expertise"
                        name="expertise"
                        rules={[{ required: true, message: 'Please input the expertise!' }]}
                    >
                        <Input placeholder="Enter expertise" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Add Member
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NewMemberTable;
