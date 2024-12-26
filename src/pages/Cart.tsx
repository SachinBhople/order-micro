import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteItemFromCartMutation, useEmptyCartMutation, useGetcartProductQuery } from '../redux/cartApi'

const Cart = () => {
    const [Emptycart] = useEmptyCartMutation()
    const { data } = useGetcartProductQuery()
    const [deleteitem] = useDeleteItemFromCartMutation()
    console.log(data);
    console.log(data && data.result.length);

    return (
        <div className="max-w-4xl mx-auto my-5">
            {data && data.result.length >= 1 ? <>
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Shopping Cart</h2>
                        <button onClick={() => Emptycart()} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm">
                            Empty Cart
                        </button>
                    </div>s

                    {/* Cart Items */}
                    {data && data.result.map(item => <div className="space-y-4">
                        <div className="flex items-center space-x-4 border-b pb-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                <img className="w-full h-full object-cover" src={item.productId.hero} alt="Product" />
                            </div>
                            <div className="flex-1">
                                <h5 className="text-lg font-semibold">Product Name:{item.productId.name}</h5>
                                <p className="text-sm text-gray-500">Price: {item.productId.price}</p>
                                <div className="flex items-center space-x-3 mt-2">
                                    <input type="number" id="quantity" className="w-16 py-1 px-2 border border-gray-300 rounded-md" value="1" min="1" />
                                    <button onClick={() => deleteitem(item._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-xs">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>)}

                    {/* Order Summary */}
                    <div className="mt-6 bg-white p-4 border rounded-lg">
                        <h5 className="text-lg font-semibold mb-4">Order Summary</h5>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-700">Subtotal</span>
                            <span className="text-sm text-gray-900">$</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-semibold text-gray-900">$</span>
                        </div>
                        <Link to="/order/checkout" className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 text-center">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </> : <>
                <div className="mt-10 text-center">
                    <h3 className="text-xl font-semibold">Your cart is empty!</h3>
                    <Link to="/product">
                        <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Shop Now</button>
                    </Link>
                </div>
            </>}

        </div>
    )
}

export default Cart
