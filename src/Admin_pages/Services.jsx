import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import Admin_nav from '../Admin_comp/Admin_navbar'
const { Meta } = Card;

const ServicesPage = () => {

  const initialServices = [
    {
      title: 'Cloud Hosting',
      description: 'Reliable cloud hosting services with 24/7 support.',
      image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    },
    {
      title: 'Custom Software Development',
      description: 'We provide custom software solutions to meet your business needs.',
      image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    },
    {
      title: 'AI Integration',
      description: 'Integrate AI-powered solutions for business automation.',
      image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    },
    {
      title: 'Cybersecurity',
      description: 'Top-tier security services to protect your digital assets.',
      image: 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',
    },
  ];


  const [services, setServices] = useState(initialServices);


  const [fileList, setFileList] = useState([]);


  const onFinish = (values) => {
    const newService = {
      title: values.title,
      description: values.description,
      image:
        fileList.length > 0
          ? URL.createObjectURL(fileList[0].originFileObj)
          : 'https://dcastalia.com/blog/wp-content/uploads/2023/03/Iinformation-technology.jpg',  
    };

    setServices([...services, newService]); 
    setFileList([]); 
    message.success('Service added successfully!');
  };

  //  image upload
  const handleImageUpload = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList); 

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Delete service 
  const deleteService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
    message.success('Service deleted successfully.');
  };

  return (
    <>
    <Admin_nav/>
    <div className="services-container">
      {/* Service Form */}
      <Row justify="center">
        <Col span={24} md={12}>
          <h2>Add New Service</h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="title"
              label="Service Title"
              rules={[{ required: true, message: 'Please input the service title!' }]}
            >
              <Input placeholder="Enter service title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Service Description"
              rules={[{ required: true, message: 'Please input the service description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Enter service description" />
            </Form.Item>

            <Form.Item name="image" label="Service Image">
              <Upload
                name="image"
                listType="picture"
                fileList={fileList} 
                onChange={handleImageUpload}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Service
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Display Services */}
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index} className="service-column">
            <Card
              hoverable
              cover={<img alt={service.title} src={service.image} />}
              className="service-card"
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={() => deleteService(index)}
                  style={{ color: 'red' }}
                />,
              ]}
            >
              <Meta title={service.title} description={service.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
};

export default ServicesPage;
