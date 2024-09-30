import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, List, message, DatePicker, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Admin_nav from "../Admin_comp/Admin_navbar";

const { Option } = Select;

const AddJobForm = () => {
  const [form] = Form.useForm();
  const [requirements, setRequirements] = useState([]);
  const [requirement, setRequirement] = useState("");

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirements([...requirements, requirement]);
      setRequirement("");
      message.success("Requirement added!");
    } else {
      message.error("Please enter a valid requirement!");
    }
  };

  const handleDeleteRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    message.success("Requirement deleted!");
  };

  const onFinish = (values) => {
    const jobData = {
      ...values,
      requirements
    };
    console.log("Job data submitted: ", jobData);
    message.success("Job submitted successfully!");
    form.resetFields();
    setRequirements([]);
  };

  return (
    <>
      <Admin_nav />
      <Row justify="center" style={{ padding: "20px" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card title="Add Job" bordered={false}>
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
                    <Button type="primary" onClick={handleAddRequirement} icon={<PlusOutlined />} block>
                      
                    </Button>
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
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddJobForm;
