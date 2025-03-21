import React,{useState} from 'react'
import { useAddGenresMutation } from '@/rtk/genreApi';
export default function AddGenre() {
    const [genrename,setGenreName]  = useState('');

    const [addGenre] = useAddGenresMutation();

    const setGenreNameText =(event)=>{
        setGenreName(event); 
    }

    const submitGenre=async()=>{
      const genre = {
        genre_name:genrename,
        status:'ACTIVE'
      }
      console.log(genre)
      await addGenre(genre);
    } 
  return (
    <div className='genre-form'>
        <input 
            type='text'
            placeholder='Enter genre name here'
            value={genrename}
            onChange={(e)=>setGenreNameText(e.target.value)}
        />

        <button style={{backgroundColor:"blue",color:"white"}} 
                onClick={()=>submitGenre()}
                >Add</button>
           
    </div>
  )
}
