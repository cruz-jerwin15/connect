import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()


// Add Book
export async function addBook(body){
    const [result] = await pool.query(`
    INSERT INTO tbl_book
    (genre_id,book_name,quantity,book_image,status)
    VALUES (?,?,?,?,?)
    `,[body.genre_id,body.book_name,body.quantity,body.book_image,body.status])
    const id = result.insertId
    console.log(id);
    // return getGenre(id);
}
// get all books
export async function getBooks(){
    const [rows] = await pool.query(`SELECT 
        tbl_book.id,tbl_genre.genre_name,
        tbl_book.genre_id,tbl_book.book_name,
        tbl_book.status,tbl_book.quantity,
        tbl_book.book_image 
        from tbl_book
        INNER JOIN tbl_genre on tbl_genre.id=tbl_book.genre_id`);
    return rows   
}

//get single book record
export async function getGenre(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM tbl_book
    WHERE id = ?  
    `,[id]);
    return rows[0]   
}

// Update Book info
// Update Genre with image
export async function updateBook(body,id){
    const [result] = await pool.query(`
    UPDATE tbl_book
    SET genre_id = ?
    book_name = ?
    WHERE id = ?
    `,[body.genre_id,body.book_name,id]);
    return result  
}

// Update quantity
export async function updateBookQuantity(body,id){
    const [result] = await pool.query(`
    UPDATE tbl_book
    SET quantity = ?
    WHERE id = ?
    `,[body.quantity,id]);
    return result  
}

