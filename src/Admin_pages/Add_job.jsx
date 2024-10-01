import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  List,
  message,
  DatePicker,
  Select,
  Table,
  Modal,
  Popconfirm
} from "antd";
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Admin_nav from "../Admin_comp/Admin_navbar";

const { Option } = Select;

const AddJobForm = () => {
  const [form] = Form.useForm();
  const [requirements, setRequirements] = useState([]);
  const [requirement, setRequirement] = useState("");
  const [jobs, setJobs] = useState([]); // State to store job submissions
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Show modal to add job
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setRequirements([]);
  };

  // Add job requirement
  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirements([...requirements, requirement]);
      setRequirement("");
      message.success("Requirement added!");
    } else {
      message.error("Please enter a valid requirement!");
    }
  };

  // Delete job requirement
  const handleDeleteRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    message.success("Requirement deleted!");
  };

  // Submit job form
  const onFinish = (values) => {
    const jobData = {
      ...values,
      requirements,
      deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null
    };
    setJobs([...jobs, jobData]); // Add the new job to the job list
    message.success("Job submitted successfully!");
    form.resetFields();
    setRequirements([]);
    setIsModalVisible(false); // Close the modal after submission
  };

  // Delete job from table
  const handleDeleteJob = (title) => {
    const updatedJobs = jobs.filter((job) => job.title !== title);
    setJobs(updatedJobs);
    message.success("Job deleted successfully!");
  };

  // Table columns for displaying job details
  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Job Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType"
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline"
    },
    {
      title: "Requirements",
      dataIndex: "requirements",
      key: "requirements",
      render: (requirements) => (
        <ul>
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this job?"
          onConfirm={() => handleDeleteJob(record.title)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      )
    }
  ];

  return (
    <>
      <Admin_nav />
      <Row justify="center" style={{ padding: "20px" }}>
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          {/* Button to open modal */}
          <Button type="primary" onClick={showModal} style={{ marginBottom: "20px" }}>
            Add New Job
          </Button>

          {/* Job submission form in modal */}
          <Modal
            title="Add Job"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} onFinish={onFinish} layout="vertical">
              {/* Job Title */}
              <Form.Item
                name="title"
                label="Job Title"
                rules={[{ required: true, message: "Please input the job title!" }]}
              >
                <Input placeholder="Enter job title" />
              </Form.Item>

              {/* Job Description */}
              <Form.Item
                name="description"
                label="Job Description"
                rules={[{ required: true, message: "Please input the job description!" }]}
              >
                <Input.TextArea rows={4} placeholder="Enter job description" />
              </Form.Item>

              {/* Job Type Dropdown */}
              <Form.Item
                name="jobType"
                label="Job Type"
                rules={[{ required: true, message: "Please select the job type!" }]}
              >
                <Select placeholder="Select job type">
                  <Option value="full-time">Full-time</Option>
                  <Option value="part-time">Part-time</Option>
                  <Option value="freelance">Freelance</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>

              {/* Job Deadline (Date Picker) */}
              <Form.Item
                name="deadline"
                label="Job Deadline"
                rules={[{ required: true, message: "Please select the job deadline!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              {/* Job Requirement Input */}
              <Form.Item label="Job Requirement">
                <Row gutter={16}>
                  <Col xs={16} sm={18}>
                    <Input
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      placeholder="Enter a job requirement"
                    />
                  </Col>
                  <Col xs={8} sm={6}>
                    <Button
                      type="primary"
                      onClick={handleAddRequirement}
                      icon={<PlusOutlined />}
                      block
                    />
                  </Col>
                </Row>
              </Form.Item>

              {/* Display Job Requirements */}
              {requirements.length > 0 && (
                <List
                  size="small"
                  header={<div>Job Requirements</div>}
                  bordered
                  dataSource={requirements}
                  renderItem={(item, index) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          icon={<MinusCircleOutlined />}
                          onClick={() => handleDeleteRequirement(index)}
                        >
                          Delete
                        </Button>
                      ]}
                    >
                      {item}
                    </List.Item>
                  )}
                />
              )}

              {/* Submit Button */}
              <br />
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Submit Job
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Display submitted jobs in a table */}
          <Card title="Submitted Jobs" bordered={false}>
            <Table
              dataSource={jobs}
              columns={columns}
              rowKey={(record) => record.title} // Use job title as unique key
              pagination={{ pageSize: 5 }}
              scroll={{ x: '100%' }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddJobForm;
