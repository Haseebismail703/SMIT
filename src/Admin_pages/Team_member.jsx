import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Layout } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import Admin_nav from '../Admin_comp/Admin_navbar';

const { Content } = Layout;

const NewMemberTable = () => {
    // State for the modal visibility, table data, and form reference
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();

    // Function to fetch members data
    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${url}/admin/teammember`);
            setDataSource(response.data);
            
        } catch (error) {
            message.error('Failed to fetch members');
        }
    };

    // Fetch members when the component mounts
    useEffect(() => {
        fetchMembers();
    }, []);

    // Function to show the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    // Function to handle form submission to add a new member
    const onFinish = async (values) => {
        console.log(values);
        try {
            const response = await axios.post(`${url}/admin/teammember`, values); // Replace with your API endpoint
            // setDataSource([...dataSource, { ...response.data, key: response.data.id }]);
            message.success('New member added successfully');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Failed to add member');
        }
    };

    // Function to handle member deletion
    const handleDelete = async (key) => {
        try {
            await axios.delete(`https://your-api-url.com/members/${key}`); // Replace with your API endpoint
            setDataSource(dataSource.filter((item) => item.key !== key));
            message.success('Member deleted successfully');
        } catch (error) {
            message.error('Failed to delete member');
        }
    };

    // Table columns
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
            <>
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
                        {/* Table to display the data */}
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            scroll={{ x: '100%' }}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </Content>

                {/* Modal for adding new member */}
                <Modal
                    title="Add New Member"
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
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
            </>
        </div>
    );
};

export default NewMemberTable;
