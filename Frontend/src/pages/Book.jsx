import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/axios';

import { Container, ContainerBook, CardInfo, ContainerButtons, Detail, ContainerDetails } from '../styles/Book';
import { Main, H2, Label, Button, Paragraph, Span } from '../styles/styles';

import { BackButton } from '../components/BackButton';

export const Book = () => {
  const { ISBN } = useParams()
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
          <BackButton />

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