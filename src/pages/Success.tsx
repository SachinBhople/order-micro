import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.41-4.92a1 1 0 011.42 0l5.29-5.3a1 1 0 10-1.42-1.42L9 11.17l-2.29-2.3a1 1 0 00-1.42 1.42l3 3z"
                        clipRule="evenodd"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-4">Thank you for your order. You will receive a confirmation email shortly.</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                    Shop More
                </Link>
            </div>
        </div>
    );
};

export default Success;
