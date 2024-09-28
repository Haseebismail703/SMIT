import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
const DataTable = () => {
    // Sample data
    const dataSource = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            token: 'ABC123',
            submittedAt: '2024-09-27',
            description: 'John submitted the assignment on time and did a good job.',
        },
        {
            key: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            token: 'XYZ456',
            submittedAt: '2024-09-28',
            description: 'Jane submitted the assignment with some errors.',
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    // Function to handle view button click
    const viewDetails = (record) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
    };

    // Function to handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentRecord(null);
    };

    // Table columns
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
        },
        {
            title: 'Submitted At',
            dataIndex: 'submittedAt',
            key: 'submittedAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary"
                    icon={<EyeOutlined/>} onClick={() => viewDetails(record)}>
                        View Description
                    </Button>
                </>

            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <>
                    <DeleteOutlined style={{ color: 'red' ,marginLeft : 20 }} />
                </>

            ),
        },

    ];

    return (
        <>
        
            {/* Table to display the data */}
            <center>
                <h1>All requested</h1>
            </center>
            <Table dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={{ pageSize: 5 }} />
            {/* Modal to display the details */}
            <Modal
                title="Submission Details"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                {/* Display the details inside the modal */}
                {currentRecord && (
                    <div>
                        <p><strong>First Name:</strong> {currentRecord.firstName}</p>
                        <p><strong>Last Name:</strong> {currentRecord.lastName}</p>
                        <p><strong>Email:</strong> {currentRecord.email}</p>
                        <p><strong>Token:</strong> {currentRecord.token}</p>
                        <p><strong>Submitted At:</strong> {currentRecord.submittedAt}</p>
                        <p><strong>Description:</strong> {currentRecord.description}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DataTable;
