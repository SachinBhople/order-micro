import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../redux/orderApi';
import { useEmptyCartMutation, useGetcartProductQuery } from '../redux/cartApi';

const Checkout = () => {
    const [placeorder, { isSuccess }] = usePlaceOrderMutation();
    const { data } = useGetcartProductQuery();
    const navigate = useNavigate()
    const [Emptycart] = useEmptyCartMutation()

    const cartItems = data?.result.map(item => ({
        pid: item.productId.pId,
        qty: item.qty,
    })) || [];

    useEffect(() => {
        if (isSuccess) {
            navigate("/order/success")
            Emptycart()

        }
    }, [isSuccess])

    return (
        <>
            <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">Order Summary</h2>

                {data && data.result.map(item => (
                    <div key={item.productId._id} className="space-y-4">
                        <div>
                            <h5 className="text-lg font-medium mb-4">Order Details</h5>
                            <ul className="space-y-3">
                                <li className="flex justify-between text-sm">
                                    <span>Product Name: {item.productId.name}</span>
                                    <span>Price: {item.productId.price}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}


                <button
                    onClick={() =>
                        placeorder({ cartitem: cartItems })}
                    className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Place Order
                </button>

            </div>
        </>
    );
};

export default Checkout;
