import React,{useState,useEffect} from 'react'
import { useAddBooksMutation } from '@/rtk/bookApi';
import {useGetGenresQuery } from '@/rtk/genreApi';


export default function AddBook() {
  const [bookImage,setBookImage]  = useState('');
  const [genid,setGenId]  = useState(0);
  const [addBook] = useAddBooksMutation();
  const [bookname,setBookName]  = useState('');

  const {data:genras,isLoading,isError,isSuccess,error} = useGetGenresQuery()
  const setBookNameText =(event)=>{
    setBookName(event); 
}
  const openUploadWidget=()=>{
    if (window.cloudinary) {
      const cloudinaryWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "codestudio28", // Replace with your Cloudinary cloud name
          uploadPreset: "wmnayrn3", // Replace with your unsigned upload preset
          sources: ["local","url","unsplash"], // Allow different upload sources
          cropping: true, // Enable cropping (optional)
          multiple: false, // Allow only one file upload at a time
          maxFileSize: 2000000, // Limit file size to 2MB
          clientAllowedFormats: ["jpg", "png","webp"], // Restrict file types
          folder: "libraryupload", // Optional folder to store uploads
          styles: {
            palette: {
              window: "#FFFFFF", // Background color
              sourceBg: "#F4F4F4",
              windowBorder: "#90A0B3",
              tabIcon: "#000000",
              inactiveTabIcon: "#555a5f",
              menuIcons: "#555a5f",
              link: "#0000EE",
              action: "#339933",
              inProgress: "#0194c7",
              complete: "#339933",
              error: "#cc0000",
              textDark: "#000000",
              textLight: "#FFFFFF",
            },
            frame: {
              width: "500px", // Set width of widget
              height: "400px", // Set height of widget
            },
            fonts: {
              default: null,
              "'Source Sans Pro', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
                active: true,
              },
            },
          },
        },
        
        (error, result) => {
          if (!error && result.event === "success") {
            console.log("Upload Successful:", result.info);
            
            console.log(result.info.secure_url);
            setBookImage(result.info.secure_url)
          }
        }
      );
      cloudinaryWidget.open();
    }
  }
  const getSelectId=(event)=>{
    console.log(event.target.value)
    setGenId(event.target.value)
  } 
  const submitBook=async()=>{
    const book = {
      genre_id:genid,
      book_image:bookImage,
      book_name:bookname,
      quantity:0,
      status:'ACTIVE'
    }
    console.log(book)
    await addBook(book);
  } 
  useEffect(() => {
      // Load Cloudinary widget script
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      document.body.appendChild(script);

  }, []);

  return (
    <div className='genre-form'>
        <input 
            type='text'
            value={bookname}
            onChange={(e)=>setBookNameText(e.target.value)}
            placeholder='Enter book name here'   
        />
        {isLoading && <h3>Loading...</h3>}
        {isError && <h3>Something went wrong</h3>}
        {isSuccess &&
          <select onChange={getSelectId}>
            {
            genras.filter((value)=>value.status!="REMOVED").map((value,index)=>{
              return(
                <option key={value.id} value={value.id}>{value.genre_name}</option>
              )
            })
        
          }
        </select>
        }
        
        <button onClick={openUploadWidget}>Upload Image</button>
        <button style={{backgroundColor:"blue",color:"white"}} 
         onClick={()=>submitBook()}
        >Add</button>
           
    </div>
  )
}
