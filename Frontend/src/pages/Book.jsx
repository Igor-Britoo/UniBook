import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';

import { Container, BackHome, ContainerBook, CardInfo, ContainerButtons, Detail, ContainerDetails } from '../styles/Book';
import { Main, H2, Label, Button, Paragraph, Span } from '../styles/styles';

export const Book = () => {
  const { ISBN } = useParams()
  const navigate = useNavigate();
  const [bookExists, setBookExists] = useState(false)
  const [book, setBook] = useState({})
  
  const fetchBook = () => {
    api.get(`books/${ISBN}/`)
    .then( response => {
      setBookExists(true)
      setBook(response.data.book)
    })
    .catch( error => {
      console.log(error)
    })
  }

  useEffect(() =>{
    fetchBook()
  }, [])

  return (
    <Main>
      {
        bookExists ?  

        <Container>
          <Link onClick={() => navigate(-1)}>
            <BackHome>
              <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.44264 9.38472L8.99661 0.462512C9.58784 -0.154171 10.5439 -0.154171 11.1288 0.462512L12.5503 1.94517C13.1415 2.56186 13.1415 3.55904 12.5503 4.16917L6.49332 10.5L12.5566 16.8243C13.1478 17.441 13.1478 18.4381 12.5566 19.0483L11.1351 20.5375C10.5439 21.1542 9.58784 21.1542 9.0029 20.5375L0.448929 11.6153C-0.148591 10.9986 -0.148591 10.0014 0.44264 9.38472Z" fill="#619885"/>
              </svg>
              <Span fontSize="xxl" fontWeight="600" color="green500">Back</Span>
            </BackHome>
          </Link>

          <H2 fontSize="xxxl" fontWeight="600">
            Genres : { book.genres.reduce((genreBefore, actualGenre)=>{
              return genreBefore + " / " + actualGenre
            })}
          </H2>

          <ContainerBook>
            <img className='book-cover' src={`http://localhost:8000${book.cover_url}`} alt='book'></img>
            
            <CardInfo>
              <div className='title-author'>
                <H2 fontWeight="600" fontSize="xxxl">{book.title}</H2>
                <Label fontSize="xl" fontWeight="400">{book.author}</Label>
              </div>
              
              <Span fontSize="xxxl" fontWeight="600">$ {book.price}</Span>

              <ContainerButtons>
                <Button>Add to Cart</Button>
                <Button color='white'>Buy</Button>
              </ContainerButtons>

              <div className='description'>
                <H2 fontWeight="600" fontSize="xxl" margin= "0px 0px 8px 0px" >Description</H2>

                <Paragraph fontSize="md" fontWeight="400" textAlign="justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Paragraph>
              </div>

              <ContainerDetails>
              <H2 fontWeight="600" fontSize="xxl" margin= "0px 0px 8px 0px">Product Details</H2>
              
                <Detail>
                  <Label fontSize="md" fontWeight="400">Publisher</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.publisher} </Paragraph>
                </Detail>

                <Detail>
                  <Label fontSize="md" fontWeight="400">Author</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.author} </Paragraph>
                </Detail>

                <Detail>
                  <Label fontSize="md" fontWeight="400">Year</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.publication_year} </Paragraph>
                </Detail>

                <Detail>
                  <Label fontSize="md" fontWeight="400">Language</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.language} </Paragraph>
                </Detail>

                <Detail>
                  <Label fontSize="md" fontWeight="400">Pages</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.number_of_pages} </Paragraph>
                </Detail>

                <Detail>
                  <Label fontSize="md" fontWeight="400">ISBN</Label>
                  <Paragraph fontSize="md" fontWeight="300" textAlign="justify"> {book.ISBN} </Paragraph>
                </Detail>
              </ContainerDetails>

            </CardInfo>
          </ContainerBook>

        </Container>

        : 

        <Container>
          <H2 fontSize='xxxxl' fontWeight="600" margin="100px 0px">Book not found</H2>
        </Container>
      }    
    </Main>
  )
}