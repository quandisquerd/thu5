import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Skeleton, message } from 'antd';
import { useAddProductMutation, useEditProductMutation, useGetOneProductQuery } from '../api/product';
import { useNavigate, useParams } from 'react-router-dom';
import { pause } from '../util/pause';



type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Add: React.FC = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const [addProduct] = useAddProductMutation()
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        addProduct(values)
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã add thành công!'
                }),
                    await pause(3000)
                navigate('/admin/product')
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
                rules={[{ required: true, message: 'Please input your username!' }, { validator: checkSpace }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your price!' }, { validator: checkPrice }]}
            >
                <Input />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    </>
    );
}

export default Add;