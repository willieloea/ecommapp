import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProduct from './pages/CreateProduct'
import DeleteProduct from './pages/DeleteProduct'
import EditProduct from './pages/EditProduct'
import Home from './pages/Home'
import ShowProduct from './pages/ShowProduct'
import SendMessage from './pages/SendMessage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/products/create' element={<CreateProduct />} ></Route>
        <Route path='/products/delete/:id' element={<DeleteProduct />} ></Route>
        <Route path='/products/details/:id' element={<ShowProduct />} ></Route>
        <Route path='/products/edit/:id' element={<EditProduct />} ></Route>
        <Route path='/send-message' element={<SendMessage />} ></Route>
      </Routes>
    </Router>
  )
}

export default App