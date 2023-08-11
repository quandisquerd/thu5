import React from 'react'
import { useGetOneProductQuery } from '../api/product'
import { useParams } from 'react-router-dom'

type Props = {}

const ProductDetail = (props: Props) => {
    const { id } = useParams()
    const { data } = useGetOneProductQuery(id)
    return (
        <>
            <h4>{data?.name}</h4>
            <p>{data?.price}</p>

        </>
    )
}

export default ProductDetail