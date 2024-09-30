import React from 'react';
import { useState,useEffect } from 'react';
import { Layout, theme, Carousel, Table, Button, Modal } from 'antd'
import Admin_nav from '../Admin_comp/Admin_navbar'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
import axios from 'axios';
import url from '../api/api.js'
function Allstudent() {
    const [data,setData] = useState([])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // const dataSource = [
    //     {
    //         key: '1',
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'john.doe@example.com',
    //         token: 'ABC123',
    //         submittedAt: '2024-09-27',
    //         description: 'John submitted the assignment on time and did a good job.',
    //     },
    //     {
    //         key: '2',
    //         firstName: 'Jane',
    //         lastName: 'Smith',
    //         email: 'jane.smith@example.com',
    //         token: 'XYZ456',
    //         submittedAt: '2024-09-28',
    //         description: 'Jane submitted the assignment with some errors.',
    //     },
    // ];


    const dataSource = Array.isArray(data)
    ? data.map((quiz, index) => ({
        id : quiz._id,
        key: index + 1,
        firstName: quiz.firstName,
        lastName: quiz.lastName,
        email: quiz.email,
        description: quiz.description,
        token: quiz.token,
        createdAt: quiz.createdAt?.slice(0, 10),
    }))
    : [];

    let get_member = async() =>{
        let res = await axios.get(`${url}/admin/users`)
        console.log(res.data);
        setData(res.data)
      
    }
    let deleteUser = async(record) =>{
        console.log(record.id)
        let res = await  axios.delete(`${url}/admin/users/${record.id}`)
        if(res.data){
            get_member()
        }
    }
    useEffect(()=>{
     get_member()
    },[])
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
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'firstName',
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
            dataIndex: 'createdAt',
            key: 'submittedAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary"
                        icon={<EyeOutlined />} onClick={() => viewDetails(record)}>
                        View 
                    </Button>
                </>

            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <>
                    <DeleteOutlined style={{ color: 'red', marginLeft: 20 }}  onClick={()=>deleteUser(record)} />
                </>

            ),
        },

    ];
    return (
        <div>
            <Admin_nav />
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* Use Carousel for responsive slider */}
                    <Carousel dots responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                    >

                    </Carousel>
                    <>
                        <center>
                            <h1>All Career Request </h1>
                        </center>
                        {/* Table to display the data */}
                        <Table dataSource={dataSource} columns={columns} scroll={{ x: '100%' }} pagination={{ pageSize: 5 }} />
                        {/* Modal to display the details */}
                        <Modal
                            title="Description"
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
                                    {/* <p><strong>First Name:</strong> {currentRecord.firstName}</p>
                                    <p><strong>Last Name:</strong> {currentRecord.lastName}</p>
                                    <p><strong>Email:</strong> {currentRecord.email}</p>
                                    <p><strong>Token:</strong> {currentRecord.token}</p>
                                    <p><strong>Submitted At:</strong> {currentRecord.submittedAt}</p> */}
                                    <p><strong>Link</strong> {currentRecord.description}</p>
                                </div>
                            )}
                        </Modal>
                    </>
                </div>
            </Content>
        </div>
    );
}

export default Allstudent;