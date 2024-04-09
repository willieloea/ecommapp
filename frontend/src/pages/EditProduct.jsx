import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [manufacturer,setManufacturer] = useState('');
  const [images, setImages] = useState(null); // New state for image
  const [price,setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
    .then((response) => {
      setName(response.data.name);
      setManufacturer(response.data.manufacturer);
      setPrice(response.data.price);
      setImages(response.data.images);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please Check console');
      console.log(error);
    });
  }, [id])

  const handleEditProduct = () => {
    const data = {
      name,
      manufacturer,
      price,
      images,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/products/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Product</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Manufacturer</label>
          <input
            type='text'
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Images</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setImages(e.target.files[0])}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m8' onClick={handleEditProduct}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProduct