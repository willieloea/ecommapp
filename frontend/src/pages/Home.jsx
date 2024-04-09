/**
 * All pages and models follow from this page. It displays
 * the products in the database as cards, and contains the
 * cart model.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineShoppingCart } from 'react-icons/md';
import ProductsCard from '../components/home/ProductsCard';
import CartModal from '../components/home/CartModal';

const Home = () => {
  const [products, setProducts] = useState([]);   // holds the list of products retrieved from the server
  const [loading, setLoading] = useState(false);  // indicates whether the data is still being loaded
  const [showCartModal, setShowCartModal] = useState(false); // manages the visibility of the cart modal
  const [cartItems, setCartItems] = useState([]); // represents the items in the cart

  // products are fetched from the server using the axios library in the useEffect hook
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
  
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart)
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const onAdjustQuantity = (product, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item._id === product._id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart.filter(item => item.quantity > 0));
  };

  const onRemoveFromCart = (product) => {
    const updatedCart = cartItems.map((item) =>
      item._id === product._id ? { ...item, quantity: 0 } : item
    );
    setCartItems(updatedCart.filter((item) => item.quantity > 0));
  };

  // const printCart = () => {
  //   cartItems.map((item) => console.log(item, item.images && item.images[0]))
  // }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Products List</h1>
        <Link to='/products/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        {/* <button onClick={printCart}>
          cartItems
        </button> */}
        <div>
          <MdOutlineShoppingCart
            className='text-sky-800 text-4xl' 
            onClick={() => setShowCartModal(true)}
          />
        </div>
      </div>

      <ProductsCard products={products} onAddToCart={addToCart} />

      {showCartModal && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onRemoveFromCart={onRemoveFromCart}
          onAdjustQuantity={onAdjustQuantity}
        />
      )}
    </div>
  );
}

export default Home