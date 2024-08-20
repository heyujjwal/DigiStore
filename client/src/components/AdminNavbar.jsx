import React from 'react'
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';

const AdminNavbar = () => {

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

  return (
        <div className="navbar max-w-[1200px] mx-auto">

        <div className="navbar-center flex">
            <button onClick={logout} className='btn text-xl bg-base-100 hover:text-black hover:bg-gray-400 mt-1 '>Logout</button>
        </div>

        <div className="navbar-end gap-12">
            <ThemeToggle/>
        </div>
  
</div>
  )
}

export default AdminNavbar