'use client';

import { apiSlice } from '../apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query<any, string>({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<any, { orderId: string, details: any }>({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getMyOrders: builder.query<any, void>({
      query: () => ({
        url: '/orders/mine',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<any, void>({
      query: () => ({
        url: '/orders',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order'],
    }),
    deliverOrder: builder.mutation<any, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<any, { id: string, isPaid?: boolean, isDelivered?: boolean }>({
      query: ({ id, isPaid, isDelivered }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: { isPaid, isDelivered },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApiSlice;
