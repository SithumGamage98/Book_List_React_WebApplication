import React, { useEffect, useState } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import axios from 'axios'

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
          <h1 className="font-bold text-black text-center text-4xl py-5 lg:text-6xl">
            Bestsellers
          </h1>
          <section className="grid grid-cols-1 gap-10 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => {
              const {
                author,
                age_group,
                book_image,
                buy_links,
                description,
                primary_isbn10,
                publisher,
                price,
                rank,
                title,
              } = book
    
              return (

              <article key={rank} className="bg-gray-100 py-5 px-10 rounded-lg sm:px-5">
              <div>
                <img
                  src={book_image}
                  alt={title}
                  className="block mx-auto w-1/2"
                />

              </div>

              <div>
                <h3 className="font-bold my-2 text-2xl">{title}</h3>
                <p lassName="mb-4">{description}</p>
                <p>
                  <span className="font-bold">Author:</span> {author}
                </p>
                
              </div>
              <ul className="mb-4">

                <li><span className="font-bold">Publisher:</span> {publisher}</li>
                <li><span className="font-bold">ISBN:</span> {primary_isbn10}</li>
                <li>Age Group : {age_group}</li>
                <li><span className="font-bold">Price:</span>Price : {price}</li>


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

              <ul>

                <h2 className="font-bold text-xl">Buy Now : </h2>
                <a href={buy_links[0].url}>{buy_links[0].name}</a>

              </ul>
              </article>
              )
            })}
          </section>
        </>
      )
    }
    

