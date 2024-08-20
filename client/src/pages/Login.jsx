
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [statusMessage, setStatusMessage] = useState('');

    const changeInputHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        if (statusMessage) setStatusMessage('');
    };

    const submitHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            setLoading(false)
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`, loginData);
            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            
            navigate('/admin');
        } catch (error) {
            setLoading(false)
            if (error.response) {
              setStatusMessage(error.response.data.msg);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-100'>
    {loading && <Spinner/>}
        <h2 className='text-4xl  mb-10 '>Login</h2>
        {statusMessage && <p className='text-red-500 text-xs italic mb-2'>{statusMessage}</p>}

        <form className='w-full max-w-xs' onSubmit={submitHandler}>
            <input type="email" placeholder='Email' name="email" value={loginData.email} onChange={changeInputHandler}
            className='shadow border-2 border-gray-900 rounded-md w-full py-2 px-3 text-gray-700'
            />

            <input type="password" placeholder='Password' name="password" value={loginData.password} onChange={changeInputHandler}
            className='shadow border-2  mt-1 border-gray-900 rounded-md w-full py-2 px-3 text-gray-700'
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-800  hover:text-white rounded-md py-2 mt-2 px-4 w-full text-xl '>Log In</button>

        </form>

        <p className='mt-4'>No account yet?</p>
        <Link to="/register" className='text-blue-500 hover:text-blue-800 text-xl'>Sign-up</Link>
    </div>
  )
}

export default Login