'use client';

import AddBook from '@/component/Book/AddBook/AddBook';
import UpdateBook from '@/component/Book/UpdateBook/UpdateBook';
import {useGetBooksQuery,useUpdateBookQuantityMutation } from '@/rtk/bookApi';
import React from 'react'
import { useState } from 'react'

export default function Book() {
    const [operation,setOperation]  = useState('add')
    const {data:books,isLoading,isError,isSuccess,error} = useGetBooksQuery()
    const [updateQuantity]=useUpdateBookQuantityMutation();

    const getBookId=(id,q)=>{
        console.log(id)
        var quantity = prompt("Please enter quantity", "0");

        quantity = parseInt(quantity)+parseInt(q);

        if (quantity != null) {
            submitQuantity(quantity,id)
        }
    }
    const getBookBorrowId=(id,q)=>{
        console.log(id)
        var isConfirm = confirm("Do you want to borrow this book!");

        if(isConfirm){
            var quantity = parseInt(q)-1;
            submitQuantity(quantity,id)
        }

       
    }
    const submitQuantity = async(quantity,id)=>{
        const book ={
            quantity:quantity,
            id:id
        }
        await updateQuantity(book);
    }
 
  return (
    <div className='genre-container'>
        {
            operation=='add' ?
            <AddBook/>
            :
            <UpdateBook/>
        }
    

        <div className='genre-data'>
        {isLoading && <h3>Loading...</h3>}
        {isError && <h3>Something went wrong</h3>}
        {isSuccess &&
        
            <table style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th style={{width:"5%",border:"1px solid red"}}>#</th>
                        <th style={{width:"10%",border:"1px solid red"}}>Image</th>
                        <th style={{width:"15%",border:"1px solid red"}}>Genre</th>
                        <th style={{width:"25%",border:"1px solid red"}}>Book</th>
                        <th style={{width:"10%",border:"1px solid red"}}>Quantity</th>
                        <th style={{width:"10%",border:"1px solid red"}}>Status</th>
                        <th style={{width:"25%",border:"1px solid red"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((value,index)=>{
                            return(
                            <tr key={value.id}>
                                <td style={{width:"5%",border:"1px solid red"}}>{index+1}</td>
                                <td style={{width:"10%",border:"1px solid red",textAlign:"center"}}>
                                    <img src={value.book_image} style={{width:"50px",height:"50px"}}/>
                                   
                                </td>
                                <td style={{width:"15%",border:"1px solid red"}}>{value.genre_name}</td>
                                <td style={{width:"25%",border:"1px solid red"}}>{value.book_name}</td>
                                <td style={{width:"10%",border:"1px solid red"}}>{value.quantity}</td>
                                <td style={{width:"10%",border:"1px solid red"}}>{value.status}</td>
                                <td style={{width:"25%",border:"1px solid red"}}>
                                    <button onClick={()=>getBookId(value.id,value.quantity)}>Add Quantity</button>
                                    <button onClick={()=>getBookBorrowId(value.id,value.quantity)}>Borrow</button>
                                </td>
                            </tr>
                            )
                        })
                    }
               
                       
                            
                        
                  
                   
                </tbody>
            </table>
    }
        </div>
    </div>
  )
}
