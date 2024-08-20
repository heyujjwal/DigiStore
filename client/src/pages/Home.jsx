import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios
            .get(`https://digi-store-eo1b.onrender.com/product`)
            .then((response) => {
                setProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
const latestproduct=product.slice(0,3)

  return (
    <div className="p-4 max-w-[1300px] mx-auto my-5">
      <div className="hero-content text-center mb-24">
        <div className="max-w-[1000px]">
          <h1 className="text-7xl font-bold">
            Welcome to <span className="text-purple-900 ">DigiStore</span>
          </h1>
          <p className="py-6 text-2xl">
          We have top-quality digital courses and templates to help you learn new skills and reach your goals. Our templates are easy to use and customizable.

          </p>
          <Link to="/shop" className="btn mt-4 bg-purple-700 border-1 border-purple-500 hover:bg-purple-400 hover:border-1 border-purple-700 text-xl text-white">
              Shop
          </Link>
        </div>
      </div>
      
    <ProductCard product={latestproduct} />

    <h1 className="text-xl mt-5 text-center">
            To explore more store products.. go on to <Link to="/shop" className='text-xl font-bold text-purple-900 underline'>Shop</Link>
          </h1>


    </div>
  )
}

export default Home
