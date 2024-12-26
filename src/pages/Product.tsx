import React from 'react';
import { useAddtoCartMutation, useGetallproductsQuery } from '../redux/cartApi';

export interface IProduct {
    name: string;
    desc: string;
    _id: string
    price: number;
    images: [string];
    pId: string;
}

const Product: React.FC = () => {
    const { data, isLoading, error } = useGetallproductsQuery();

    const [addtocart] = useAddtoCartMutation()

    if (isLoading) return <p className="text-center">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data && data?.result.map((product) => (
                    <div
                        key={product.pId}
                        className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
                    >
                        <img
                            src={product.hero}
                            alt={product.name}
                            className="h-40 w-full object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.desc}</p>
                        <p className="text-blue-600 font-bold mb-2">${product.price}</p>
                        <button onClick={() => {
                            addtocart({ productId: product.pId })
                            console.log(product.pId);
                        }} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
