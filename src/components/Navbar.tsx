import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-sxl font-semibold">
                    <div className="space-x-6">
                        <Link to="/">E-Com</Link>
                        <Link to="/" className="text-white hover:text-gray-300">Product</Link>
                        <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
                        <Link to="/order" className="text-white hover:text-gray-300">Order</Link>
                    </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
