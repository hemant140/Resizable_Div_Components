import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Tag, message, Table, Modal, Form, Row, Col, Input, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const roles = [
    {
        "id": 1,
        "name": "Super Admin"
    },
    {
        "id": 2,
        "name": "Admin"
    },
    {
        "id": 3,
        "name": "Developer"
    },
    {
        "id": 4,
        "name": "Sales"
    },
    {
        "id": 5,
        "name": "Marketing"
    }
]

const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
    },
    {
        title: 'ROLE',
        dataIndex: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role)
    },
    {
        title: 'CREATED DATE',
        dataIndex: 'created_date',
    },

    {
        title: 'STATUS',
        dataIndex: 'status',

    },
    {
        title: 'ACTIONS',
        dataIndex: 'action',
    },
];

function Secondtask() {
    const [UserForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [userData, setUserData] = useState(true);
    const [open, setOpen] = useState(false)
    const [fromTitle, setfromTitle] = useState('');
    const [editFlag, setEditFlag] = useState(false);
    const [formButton, setformButton] = useState('');
    const [userId, setUserId] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/data`);

            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.error(error);
            message.error('Internal Server Error');
        }
    };


    const handleEdit = (record) => {
        setEditFlag(true);
        setUserId(record._id)
        setfromTitle('UPDATE USER')
        setformButton('Update')
        UserForm.setFieldsValue({
            firstName: record.firstName,
            lastName: record.lastName,
            role: record.role,
            email: record.email,

        });
        setOpen(true)

    }

    const dataSource = userData && userData.length > 0 && userData.map((user, index) => {
        return {
            key: index + 1,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: <Tag color="cyan">
                {user.role}
            </Tag>,
            created_date: moment(new Date(user.createdAt)).format("MM/DD/YYYY"),
            status: <Tag color={"green"} className="draft">Active</Tag>,
            action: (<>
                <span>
                    <EditOutlined style={{ fontSize: "18px" }} onClick={() => handleEdit(user)} />
                </span>
            </>)
        }
    })

    const showModal = () => {
        setfromTitle('ADD USER')
        setformButton('Submit')
        setEditFlag(false)
        setOpen(true)
        UserForm.resetFields()

    };

    const handleCancel = () => {
        setOpen(false)
        UserForm.resetFields()

    };


    const handleSubmit = async (values) => {

        if (editFlag) {
            try {
                setButtonLoading(true)
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/update/${userId}`, { values });
                if (!response) {
                    message.error('Error in updating user');
                    return;
                }
                setButtonLoading(false)
                setOpen(false)
                message.success('User updated successfully!')
                fetchData();

            } catch (error) {
                setButtonLoading(false)
                console.error(error);
                message.error('Error in updating user');
            }
        } else {
            try {
                setButtonLoading(true)
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/add`, { values });
                if (!response) {
                    message.error('Error in adding new user');
                    return;
                }

                setButtonLoading(false)
                setOpen(false)

                message.success('User added successfully!')
                fetchData();

            } catch (error) {
                setButtonLoading(false)
                console.error(error);
                message.error('Error in adding new user');
            }
        }


    };





    return (
        <div className="secondMain">
            <div className="buttonTitle">
                <h1 >Users</h1>
                <Button style={{ backgroundColor: '#073763', borderColor: '#073763', color: 'white' }} size="large" onClick={showModal}>Add User</Button>
            </div>
            <div className='mt-3'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                />
            </div>

            <Modal
                title={fromTitle}
                open={open}
                onOk={handleSubmit}
                onCancel={handleCancel}
                width={700}
                maskClosable={false}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        CANCEL
                    </Button>,
                    <Button type="primary" key="submit" loading={buttonLoading} style={{ backgroundColor: '#073763', borderColor: '#073763', color: 'white' }} form="userForm" htmlType="submit">{formButton}</Button>
                ]}
            >
                <Form
                    id="userForm"
                    form={UserForm}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form
                        id="userForm"
                        form={UserForm}
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Row gutter={{ xs: 24, sm: 12, md: 24, lg: 24 }}>
                            <Col className='gutter-row ' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                                <Form.Item
                                    label="First Name"
                                    name="firstName"

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter user first name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter user first name' />

                                </Form.Item>
                            </Col>

                            <Col className='gutter-row ' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter user lastName!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter user last name' />

                                </Form.Item>
                            </Col>

                            <Col className='gutter-row ' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                                <Form.Item
                                    label="Roles"
                                    name="role"
                                    autoComplete="none"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select user role!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select user role"
                                        name="role"
                                        autoComplete="none"

                                    // optionFilterProp="children"
                                    // showSearch
                                    >
                                        {roles && roles.length > 0 && roles.filter(item => item.id !== 1).map(res => (
                                            <Select.Option value={res.name} key={res.name} >{res.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col className='gutter-row ' xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter user email!',
                                        },
                                        { type: 'email', message: 'Please input valid email id !' }
                                    ]}
                                >
                                    <Input disabled={editFlag} placeholder='Enter user email' />

                                </Form.Item>
                            </Col>

                        </Row>

                    </Form>
                </Form>
            </Modal>

        </div>
    )
}

export default Secondtask
