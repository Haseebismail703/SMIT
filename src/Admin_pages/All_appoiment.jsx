import React from "react";
import { Row, Col, Card, Form, Input, Button, DatePicker, Select, message } from "antd";
import Admin_nav from "../Admin_comp/Admin_navbar";
const { Option } = Select;

const UserInterviewDetails = () => {
  const [form] = Form.useForm();

  // List of time slots
  const timeSlots = [
    "1:00 AM to 1:30 AM", "1:30 AM to 2:00 AM",
    "2:00 AM to 2:30 AM", "2:30 AM to 3:00 AM",
    "3:00 AM to 3:30 AM", "3:30 AM to 4:00 AM",
  ];

  // Submit form
  const onFinish = (values) => {
    message.success("Interview details saved successfully!");
    console.log("Form values: ", values);
  };

  
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
    <Admin_nav/>

    <center>
        <h1>Add Appoiment</h1>
    </center>
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        {/* Right side with user details */}
        <Col xs={24} sm={12}>
          <Card title="User Details" bordered>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            {/* Add more user details as needed */}
          </Card>
        </Col>
        {/* Left side with interview form */}
        <Col xs={24} sm={12}>
          <Card title="Interview Details" bordered>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              {/* Interview Location */}
              <Form.Item
                label="Interview Location"
                name="location"
                rules={[{ required: true, message: "Please enter the interview location!" }]}
              >
                <Input placeholder="Enter interview location" />
              </Form.Item>

              {/* Interview Date */}
              <Form.Item
                label="Interview Date"
                name="interviewDate"
                rules={[{ required: true, message: "Please select the interview date!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              {/* Interview Time */}
              <Form.Item
                label="Interview Time"
                name="interviewTime"
                rules={[{ required: true, message: "Please select the interview time!" }]}
              >
                <Select placeholder="Select interview time">
                  {timeSlots.map((time, index) => (
                    <Option key={index} value={time}>
                      {time}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Buttons */}
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                  Submit
                </Button>
                <Button onClick={onReset}>Reset</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
    </>
    
  );
};

export default UserInterviewDetails;
