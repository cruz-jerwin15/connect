import React,{useState,useEffect} from 'react'
import { useUpdateGenreMutation,useGetGenreQuery } from '@/rtk/genreApi';
export default function UpdateGenre(props) {
    const [genrename,setGenreName]  = useState('');
    const setGenreNameText =(event)=>{
        setGenreName(event); 
    }
    const {data} = useGetGenreQuery(props.genreid);

    const [updateGenre] = useUpdateGenreMutation();

    const submitGenre=async()=>{
        
        const newGenre={
            id:data.id,
            genre_name:genrename,
            status:'ACTIVE'
        }
        await updateGenre(newGenre)
        props.handleBack('add');
      
    } 

    useEffect(()=>{
        if(data){
            console.log(data)
            setGenreName(data.genre_name)
        }
    },[data])

  return (
    <div className='genre-form'>
        <input 
            type='text'
            placeholder='Enter genre name here'
            value={genrename}
            onChange={(e)=>setGenreNameText(e.target.value)}
        />
    
        <button style={{backgroundColor:"yellow",color:"black"}} 
                onClick={()=>submitGenre()}
                >Update</button>
           
    </div>
  )
}
