import React from 'react'
import { useGetProductQuery } from '../api/product'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

type Props = {}

const Products = (props: Props) => {
    const { data } = useGetProductQuery('')
    return (
        <>
            {data?.map((product: any) => {
                return (
                    <>
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                        <Button><Link to={`/product/${product.id}`}>chi tiet</Link></Button>
                    </>
                )
            })}
        </>
    )
}

export default Products