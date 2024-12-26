import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface ProductItem {
    product: string;
    qty: number;
}
// export interface ProductRequest {
//     // address: string,
//     cartitem: ProductItem[]
// }
export interface Product {
    _id: string
    address: string,
    user: string,
    products: ProductItem[]

}
export interface Product {
    _id: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    images: string;
    active: boolean;
}

export interface ProductRequest {
    cartitem: {
        pid: string;   // Product ID
        qty: number;       // Quantity
    };
}



export interface OrderItem {
    hero: string,
    name: string,
    qty: number,
    price: number

}
export interface Pitem {
    _id: string,
    product: OrderItem,
    qty: number

}
export interface Order {
    _id: string,
    user: string,
    status: string,
    productId: Pitem[],
    totalAmount: number,
    returnReason: null
    returnStatus: string

}



export const orderApi = createApi({
    reducerPath: "orderApi",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/order", credentials: "include" }),
    baseQuery: fetchBaseQuery({ baseUrl: "https://order-server-six.vercel.app/api/order", credentials: "include" }),
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            placeOrder: builder.mutation<ProductRequest, any>({
                query: productData => {
                    return {
                        url: `/place-order`,
                        method: "POST",
                        body: productData

                    }
                },
                invalidatesTags: ["order"]
            }),
            updateOrderStatus: builder.mutation<string, { id: string, statusData: { status: string, returnStatus: string } }>({
                query: ({ id, statusData }) => {
                    return {
                        url: `/update-status/${id}`,
                        method: "PUT",
                        body: statusData
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["order"]
            }),

            cancelOrder: builder.mutation<string, string>({
                query: (id) => {
                    return {
                        url: `/cancel-order/${id}`,
                        method: "PUT",
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["order"]
            }),

            returnOrderRequested: builder.mutation<string, { id: string, returnReason: string }>({
                query: ({ id, returnReason }) => {
                    return {
                        url: `/return-order/${id}`,
                        method: "PUT",
                        body: { returnReason }
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["order"]
            }),
            getAllOrders: builder.query<{ message: string, result: Order[] }, void>({
                query: () => {
                    return {
                        url: `/order`,
                        method: "GET",
                    }
                },
                transformResponse: (data: { message: string, result: Order[] }) => {
                    return data
                },

            })

        }
    }
})

export const { usePlaceOrderMutation, useUpdateOrderStatusMutation, useCancelOrderMutation, useReturnOrderRequestedMutation, useGetAllOrdersQuery } = orderApi
