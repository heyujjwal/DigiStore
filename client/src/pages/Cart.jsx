import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from '../components/Spinner'



const stripePromise = loadStripe('pk_test_51PplKzJDQymAdaXaNDJh0q65Ei3qHiGKSOTkukLNkxeJhmEroWAHmXimP7pK9WrnjRAuuHeqaIpWuy65y6rynJ8600f2GTA5Uk');

const Cart = () => {
    const [loading, setLoading] = useState(false);

    const { cartItems, decreaseCartItemQuantity, addToCart } = useCart();

    if (cartItems.length === 0) {
        return <div className='text-black text-3xl text-center my-72'>Your cart is empty.</div>;
    }


    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    


const handleCheckout = async () => {
    const stripe = await stripePromise;
    setLoading(true)
    const transformedItems = cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
    }));

    try {
            const response = await axios.post(`https://digistore-server.onrender.com/stripe/create-checkout-session`, {
                products: transformedItems
            });
            setLoading(false);
            const { error } = await stripe.redirectToCheckout({

                sessionId: response.data.id
            });

            if (error) {
                setLoading(false);
                console.error('Error during Stripe checkout redirection: ', error);
            }
        } catch (error) {
            setLoading(false)
            console.error('Checkout process error:', error);
        }
    };


  return (
    <div className='p-4 mt-1 max-w-[1400px] mx-auto'>
    {loading && <Spinner />}
        <h2 className='text-3xl font-semibold text-center my-6'>Shopping Cart</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cartItems.map((item, index) => (
                <div key={index} className='bg-base-200 rounded-lg shadow-lg p-4 flex flex-col'>
                    <img src={item.image} alt={item.name} className='rounded-md mb-4 w-full h-64 object-cover' />
                    <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
                    <p className='text-md mb-1'>Price: Rs {(item.price).toFixed(2)}</p>
                    <div className='flex items-center justify-between text-md mb-3'>
                        <p>Quantity: {item.quantity}</p>
                        <div className='flex items-center'>
                            <button onClick={() => decreaseCartItemQuantity(item._id)}
                            className='  font-bold hover:underline'
                            >Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className='text-right mt-8'>
            <p className='text-2xl font-semibold mb-4'>Total Price: Rs {(totalPrice).toFixed(2)}</p>
            <button onClick={handleCheckout} className='btn bg-purple-600'>Proceed to Checkout</button>
        </div>  
    </div>
  )
}

export default Cart