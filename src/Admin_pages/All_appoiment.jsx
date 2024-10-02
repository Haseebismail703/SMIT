import React, { useState } from "react";
import { Table, Input, Button, DatePicker, Row, Col, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Admin_nav from "../Admin_comp/Admin_navbar";

const { RangePicker } = DatePicker;

const AppointmentTable = () => {
    const initialAppointments = [
        {
            key: "1",
            name: "John Doe",
            location: "New York",
            date: "2024-10-01",
            time: "10:00 AM",
        },
        {
            key: "2",
            name: "Jane Smith",
            location: "Los Angeles",
            date: "2024-10-03",
            time: "2:00 PM",
        },
        {
            key: "3",
            name: "Samuel Green",
            location: "San Francisco",
            date: "2024-10-05",
            time: "11:00 AM",
        },
    ];

    const [appointments, setAppointments] = useState(initialAppointments);
    const [searchName, setSearchName] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState(appointments);
    const [dateRange, setDateRange] = useState(null);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search by name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            sorter: (a, b) => a.location.localeCompare(b.location),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
    ];

    // Filter by name
    const handleNameSearch = (value) => {
        const filteredData = appointments.filter((appointment) =>
            appointment.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAppointments(filteredData);
    };

    // Filter by date 
    const handleDateChange = (dates, dateStrings) => {
        if (!dates) {
            setFilteredAppointments(appointments);
            setDateRange(null);
            return;
        }

        const filteredData = appointments.filter((appointment) => {
            const appointmentDate = moment(appointment.date);
            return appointmentDate.isBetween(dates[0], dates[1], "days", "[]");
        });
        setFilteredAppointments(filteredData);
        setDateRange(dates);
    };

    return (

        <>
            <Admin_nav />
            <center>
                <h1>All appoiment</h1>
            </center>
            <Card  bordered={false} style={{ margin: "20px" }}>
                <Row gutter={[16, 16]}>
                    
                    {/* Search by name */}
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={(e) => {
                                setSearchName(e.target.value);
                                handleNameSearch(e.target.value);
                            }}
                            prefix={<SearchOutlined />}
                            allowClear
                        />
                    </Col>

                    {/* Filter by date range */}
                    <Col xs={24} sm={12} md={8}>
                        <RangePicker
                            onChange={handleDateChange}
                            value={dateRange}
                            allowClear
                            style={{ width: "100%" }}
                        />
                    </Col>
                </Row>

                {/* Appointments Table */}
                <Table
                    columns={columns}
                    dataSource={filteredAppointments}
                    pagination={{ pageSize: 5 }}
                    style={{ marginTop: 20 }}
                    scroll={{x : '100%'}}
                />
            </Card>
        </>

    );
};

export default AppointmentTable;

