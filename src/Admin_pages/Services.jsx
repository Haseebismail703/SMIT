import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload, Table, message, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Admin_nav from '../Admin_comp/Admin_navbar';

const Services = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [fileList, setFileList] = useState([]); // State to handle file list
  const [form] = Form.useForm();

  const columns = [
    {
      title: '#',
      dataIndex: 'KEY',
      key: 'key',
    },
    {
      title: 'Service Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Service Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="service" style={{ width: 50 }} />,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]); // Clear the file list when closing the modal
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList); // Update fileList state when file is uploaded
  };

  const handleFinish = (values) => {
    if (fileList.length === 0) {
      message.error('Please upload an image!');
      return;
    }

    const newService = {
      ...values,
      image: URL.createObjectURL(fileList[0].originFileObj), // Use the first file uploaded
    };

    setServices([...services, newService]);
    setIsModalVisible(false);
    message.success('Service added successfully!');
    form.resetFields();
    setFileList([]); // Clear the file list after submission
  };

  return (

    <>
    
   <Admin_nav/>
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={8}>
          <Button type="primary" onClick={showModal}>
            Add Service
          </Button>
        </Col>
      </Row>

      {/* Modal to add new service */}
      <Modal
        title="Add Service"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="title"
            label="Service Title"
            rules={[{ required: true, message: 'Please enter the service title!' }]}
          >
            <Input placeholder="Enter service title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Service Description"
            rules={[{ required: true, message: 'Please enter the service description!' }]}
          >
            <Input.TextArea placeholder="Enter service description" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              beforeUpload={() => false} // Prevent automatic upload
              fileList={fileList} // Use fileList to manage the uploaded files
              onChange={handleFileChange}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Display services inside a Card */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Services List" style={{ marginTop: '20px' }}>
            <Table
              columns={columns}
              dataSource={services}
              rowKey={(record) => record.title}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
 </>

  );
};

export default Services;
