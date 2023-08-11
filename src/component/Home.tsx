import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Home = (props: Props) => {
    return (
        <div><Button><Link to='/product'>Products</Link></Button></div>
    )
}

export default Home