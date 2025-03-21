import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const genreApi = createApi({
    reducerpath:"genreApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8080"}),
    tagTypes:["Genre"],
    endpoints:(builder)=>(
        {
            getGenres:builder.query({
                query:()=>"/genre",
                providesTags:["Genre"]
            }),
            getGenre:builder.query({
                query:(id)=>`/genre/${id}`,
                providesTags:["Genre"]
            }),
            addGenres:builder.mutation({
                query:(genres)=>({
                    url:"/genre",
                    method:"POST",
                    body:genres
                }),
                invalidatesTags:["Genre"]
            }),
            updateGenre:builder.mutation({
                query:(genres)=>({
                    url:`/genre/${genres.id}`,
                    method:"PUT",
                    body:genres
                }),
                invalidatesTags:["Genre"]
            })
        }
    )
})
export const {useGetGenresQuery,useGetGenreQuery,useAddGenresMutation,useUpdateGenreMutation} = genreApi