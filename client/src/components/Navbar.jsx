import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import CartIcon from './CartIcon';

const Navbar = () => {
  return (
    <div className="navbar max-w-[1200px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className="text-lg py-2">Home</Link></li>
            <li><Link to="/shop" className="text-lg py-2">Shop</Link></li>
            
          </ul>
        </div>
        <a href="/" className="btn btn-ghost hover:text-purple-600 hover:bg-base-300 text-3xl text-purple-700 ">DigiStore</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className="text-lg py-2 px-4">Home</Link></li>
          <li><Link to="/shop" className="text-lg py-2 px-4">Shop</Link></li>
          
        </ul>
      </div>
      <div className="navbar-end gap-12">
      <Link to="/admin" className="text-lg btn hover:text-black bg-base-100 hover:bg-gray-400 py-2 ">Admin</Link>
          <Link to="/cart"><CartIcon/></Link>
          <ThemeToggle/>
      </div>
    </div>
  );
}

export default Navbar;
