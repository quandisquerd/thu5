import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import AdminLayout from './layout/AdminLayout'
import Products from './component/Products'
import ProductDetail from './component/ProductDetail'
import List from './component/List'
import Edit from './component/Edit'
import Add from './component/Add'
import Home from './component/Home'
import Login from './component/Login'
import Register from './component/Register'

function App() {
  const [count, setCount] = useState(0)
  const check = () => {
    const user = JSON.parse(localStorage.getItem('user')!)
    if (user?.user?.role === 'admin') {
      return <AdminLayout />
    } else {
      return <Navigate to='/login' />
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={check()}>
            <Route index element={<Dashboard />} />
            <Route path='product' >
              <Route index element={<List />} />
              <Route path=':id/edit' element={<Edit />} />
              <Route path='add' element={<Add />} />
            </Route>
          </Route>


          <Route path="/" >
            <Route index element={<Home />} />
            <Route path='product' >
              <Route index element={<Products />} />
              <Route path=':id' element={<ProductDetail />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
