import React, { useEffect, useState } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import axios from 'axios'
import "./books.css";
import Header from './Header';
import Footer from './Footer';

export default function Book() {

    //use state for array
    const [books,setBooks] = useState([])

    //useEffect for fetch Book key with the URL 

    useEffect(() => {
        const fetchBooks = async () => {
          const res = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_BOOK_API_KEY}`
          )
          setBooks(res.data.results.books)
          console.log(res.data.results.books)
        }
    
        fetchBooks()
      }, [])


      return (
        <>
         
           <div><Header/></div>
          <br></br>
          <section className="grid grid-cols-5 gap-10 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => {
              const {
                author,
                book_image,
                buy_links,
                description,
                primary_isbn10,
                publisher,
                price,
                rank,
                title,
                book_uri

              } = book
    
              return (

              <article key={rank} className="bg-gray-300 py-5 px-10 rounded-lg sm:px-5">
              <div>
                <img
                  src={book_image}
                  alt={title}
                  className="block mx-auto w-1/2"
                />
              <hr></hr>
              </div>

              <div>
                <h3 className="font-bold my-2 text-2xl">{title}</h3>
                <p lassName="mb-4">{description}</p>
                <p>
                  <span className="font-bold">Author:</span> {author}
                </p>

              <hr></hr>
                
              </div>
              <ul className="mb-4">

                <li><span className="font-bold">Publisher:</span> {publisher}</li>
                <li><span className="font-bold">ISBN:</span> {primary_isbn10}</li>
                <li><span className="font-bold">Price:</span>Price : {price}</li>
                <a href={book_uri}>More info</a>
                


              </ul>

             {/* <ul>
                {buy_links.map((links)=>{
                  //De-structuring Links 
                  const {name,url} = links

                  return(
                    <div key={name}>

                      <li>{name}</li>
                      <a href={url}>Buy Now :</a>


                    </div>
                  )

                })}
              </ul>*/}
              <hr></hr> <br></br><br></br>
              <article>

    <ul>              
      <h2 className="font-bold text-xl"><center>Buy Now</center></h2>
      {/*<button href={buy_links[0].url}>{buy_links[0].name}</button> */}
      <a href={buy_links[0].url} type="button" class="buy_button" style={{width:"300px"}}>{buy_links[0].name}</a>
      </ul>

              </article>
              </article>
              
              )
            })}
          </section>
          <Footer/>
        </>
      )
    }
    

