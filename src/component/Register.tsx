import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Skeleton, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { pause } from '../util/pause';
import { useSigninMutation, useSignupMutation } from '../api/auth';



type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Register: React.FC = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const [signup] = useSignupMutation()
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        signup({ name: values.name, email: values.email, password: values.password, role: "member" })
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã dăng ký thành công!'
                }),
                    await pause(3000)
                navigate('/login')
            })
            .catch(error => {
                messageApi.open({
                    type: 'error',
                    content: error.data
                })
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const checkSpace = (_: any, value: any) => {
        if (value.trim() === '') {
            return Promise.reject('không được nhập full space!')
        } else {
            return Promise.resolve()
        }
    }
    const checkPrice = (_: any, value: any) => {
        if (value <= 0) {
            return Promise.reject('không được nhập số âm!')
        } else {
            return Promise.resolve()
        }
    }
    return (<>
        {contextHolder}
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }, { validator: checkSpace }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { validator: checkSpace }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }, { validator: checkSpace }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="ConfirmPassword"
                name="confirmpass"
                rules={[{ required: true, message: 'Please input your confirmpassword!' }, { validator: checkSpace },
                ({ getFieldValue }) => ({
                    validator(_: any, value: any) {
                        if (!value || getFieldValue("password") == value) {
                            return Promise.resolve(0)
                        } else {
                            return Promise.reject('Pass khong khop!')
                        }
                    }
                })

                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >

    </>
    );
}

export default Register;