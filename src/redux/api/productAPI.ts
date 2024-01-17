import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, LatestProductsResponse, MessageResponse, NewProductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types";


export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        latestProducts: builder.query<LatestProductsResponse, string>({
            query: () => "latest",
            providesTags: ["products"],
        }),
        allProducts: builder.query<AllProductsResponse, string>({
            query: (id) => `admin-products?id=${id}`,
            providesTags: ["products"],

        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => `categories`,
            providesTags: ["products"],

        }),
        searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ price, search, sort, category, page }) => {
                let base = `all?search=${search}&page=${page}`

                if (price) base += `&price=${price}`
                if (sort) base += `&sort=${sort}`
                if (category) base += `&category=${category}`

                return base
            },
            providesTags: ["products"],

        }),
        newProduct: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({ formData, id }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),
        productDetails: builder.query<ProductResponse, string>({
            query: (id) => id,
            providesTags: ["products"],
        }),
        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({ formData, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["products"]
        }),
        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",

            }),
            invalidatesTags: ["products"]
        }),

    })
});


export const { useLatestProductsQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductMutation,
    useProductDetailsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productAPI