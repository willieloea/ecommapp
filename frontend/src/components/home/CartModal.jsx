/**
 * This modal appears on the home screen, and allows the
 * user to 
 *  > See which products they have added to their cart
 *  > Change quantities of the items that are in the cart
 *  > Remove items from the cart
 *  > View total price per item as well as all items
 *  > Send message to business telling them which items they want
 */

import React, { useState } from 'react';
import axios from 'axios';
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { CiTrash } from "react-icons/ci";
import { Buffer } from "buffer";

const CartModal = ({ cartItems, onClose, onRemoveFromCart, onAdjustQuantity }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSendMessage = async () => {
    try {
      const detailsString = cartItems.map((item) => {
        return `\nManufacturer: ${item.manufacturer} \nName: ${item.name} \nPrice: ${item.price} \nQuantity: ${item.quantity} \nID: ${item._id}`;
      }).join('\n\n');

      console.log(detailsString);

      const orderNumber = 'XXXXXXXXXXX';
      const productName = 'XXXXXXXXXXX';
      const deliveryDate = 'XXXXXXXXXXX';

      const response = await axios.post('http://localhost:5000/send-message', {
        orderNumber,
        productName,
        deliveryDate,
        detailsString,
      });
      console.log('Message sent! SID:', response.data.sid);
    } catch (error) {
      console.error('Error sending message:', error.response.data.error);
    }
  };

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item._id} className='flex flex-col mb-2'>
        {/* border-2 border-solid border-red-500 */}
        <div className='flex items-center justify-between'>
          <div className='mx-2'>
            {/* Display the first image */}
            {item.images && item.images.length > 0 && (
              <img
                src={`data:${item.images[0].contentType};base64,${
                  Buffer
                    .from(item.images[0].data,'binary')
                    .toString('base64')
                }`}
                alt={item.name}
                className='w-16 h-16 object-cover rounded mr-4'
              />
            )}
          </div>
          <div className='mx-2 flex flex-col'>
            <span className='font-semibold' >{item.name}</span>
            <div className='flex items-center'>
              <button onClick={() => onAdjustQuantity(item, item.quantity - 1)}>
                <HiOutlineMinusCircle className="w-8 h-8" />
              </button>
              <span className='px-2'>{item.quantity}</span>
              <button onClick={() => onAdjustQuantity(item, item.quantity + 1)}>
                <IoAddCircleOutline className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div className='mx-2 flex flex-col items-end whitespace-nowrap'>
            <div className="flex items-center">N$ {(item.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => onRemoveFromCart(item)}>
              <CiTrash className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-start justify-end bg-black bg-opacity-70 p-5'>
      <div className='bg-white p-10 rounded-md w-120 md:max-w-800'>
        <span 
          onClick={onClose}
          className='text-gray-500 float-right text-5xl font-bold cursor-pointer'
        >&times;</span>
        <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>{renderCartItems()}</div>
        )}
        <div className='flex justify-between'>
          <p>Total: </p>
          <p className='font-bold'>N$ {calculateTotal()}</p>
        </div>

        <button 
          onClick={handleSendMessage}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Send Order
        </button>
      </div>
    </div>
  );
};

export default CartModal;