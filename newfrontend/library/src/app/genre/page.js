'use client';
import AddGenre from '@/component/Genre/AddGenre/AddGenre';
import React from 'react'
import { useState } from 'react'
import {useGetGenresQuery,useUpdateGenreStatusMutation } from '@/rtk/genreApi';
import UpdateGenre from '@/component/Genre/UpdateGenre/UpdateGenre';
export default function Genre() {
const [operation,setOperation] = useState('add');  
const [genreid,setGenreId] = useState(0);  
const {data:genras,isLoading,isError,isSuccess,error} = useGetGenresQuery()


 const [updateGenreStatus] = useUpdateGenreStatusMutation();
 const getGenreId =(id)=>{
    setOperation('edit')
    setGenreId(id)

    
 }
 const getGenreStatusId =(id)=>{
    setGenreId(id);

    var isOk = confirm("Do you want to remove this genre");
    if(isOk){
        submitStatus(id);
    }

 }
 const submitStatus =async(id)=>{
    const genrestatus={
        status:'REMOVED',
        id:id
    }
    console.log(genrestatus)
    await updateGenreStatus(genrestatus)
 }
 const backUpdateId =(opr)=>{
    setOperation(opr)
 }
  return (
    <div className='genre-container'>
        {
            operation=='add' ?
            <AddGenre/>
            :
            <UpdateGenre genreid={genreid} handleBack={backUpdateId}/>
        }
      
       

        <div className='genre-data'>
        {isLoading && <h3>Loading...</h3>}
        {isError && <h3>Something went wrong</h3>}
        {isSuccess &&
        
            <table style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th style={{width:"5%",border:"1px solid red"}}>#</th>
                        <th style={{width:"55%",border:"1px solid red"}}>Genre Name</th>
                        <th style={{width:"15%",border:"1px solid red"}}>Status</th>
                        <th style={{width:"25%",border:"1px solid red"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    genras.filter((value) => value.status == 'ACTIVE').map((value,index)=>{
                        return (
                            <tr key={value.id}>
                                <td style={{width:"5%",border:"1px solid red"}}>{index+1}</td>
                                
                                <td style={{width:"55%",border:"1px solid red"}}>{value.genre_name}</td>
                                <td style={{width:"15%",border:"1px solid red"}}>{value.status}</td>
                                <td style={{width:"25%",border:"1px solid red"}}>
                                    <button onClick={()=>getGenreId(value.id)}>Edit</button>
                                    <button onClick={()=>getGenreStatusId(value.id)}>Delete</button>
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
