import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const bookApi = createApi({
    reducerPath:"bookApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8080"}),
    tagTypes:["Book"],
    endpoints:(builder)=>(
        {
            getBooks:builder.query({
                query:()=>"/book",
                providesTags:["Book"]
            }),
            getBook:builder.query({
                query:(id)=>`/book/${id}`,
                providesTags:["Book"]
            }),
            addBooks:builder.mutation({
                query:(books)=>({
                    url:"/book",
                    method:"POST",
                    body:books
                }),
                invalidatesTags:["Book"]
            }),
            updateBook:builder.mutation({
                query:(books)=>({
                    url:`/book/${books.id}`,
                    method:"PUT",
                    body:books
                }),
                invalidatesTags:["Book"]
            }),
            updateBookStatus:builder.mutation({
                query:(books)=>({
                    url:`/book-status/${books.id}`,
                    method:"PUT",
                    body:books
                }),
                invalidatesTags:["Book"]
            }),
            updateBookQuantity:builder.mutation({
                query:(books)=>({
                    url:`/book-quantity/${books.id}`,
                    method:"PUT",
                    body:books
                }),
                invalidatesTags:["Book"]
            })
        }
    )
})
export const {useGetBooksQuery,useGetBookQuery,useUpdateBookMutation,useUpdateBookStatusMutation,useUpdateBookQuantityMutation,useAddBooksMutation} = bookApi