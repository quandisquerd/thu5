import { Button, Popconfirm, Skeleton, Table, message } from 'antd';
import React from 'react'
import { useGetProductQuery, useRemoveProductMutation } from '../api/product';
import { Link } from 'react-router-dom';

type Props = {}

const List = (props: Props) => {
    const { data, isLoading } = useGetProductQuery('')
    const [messageApi, contextHolder] = message.useMessage()
    const [removeProduct] = useRemoveProductMutation()
    const dataSource = data?.map((product: any) => ({
        key: product.id,
        name: product.name,
        price: product.price
    }))
    const remove = (id: any) => {
        removeProduct(id)
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã xóa thành công'
                })
            })
    }

    const columns = [
        {
            title: 'STt',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            render: (data: any) => {
                return (
                    <>
                        <Popconfirm
                            placement="topLeft"
                            title={'Xóa sản phẩm!'}
                            description={'Bạn có muốn xóa ?'}
                            onConfirm={() => remove(data.key)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>XOA</Button>
                        </Popconfirm>
                        <Button><Link to={`/admin/product/${data.key}/edit`}>SUA</Link></Button>
                    </>
                )
            }
        },
    ];
    return (
        <>
            {contextHolder}
            <h1>
                <Button><Link to={`/admin/product/add`}>ADD</Link></Button>
            </h1>
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} pagination={false} />}

        </>
    )
}

export default List