import React,{ useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { Button, H2, H3, H4, Main, Span } from "../styles/styles";
import { Sections, BooksSection, Books, FiltersSection, FilterSection, Options, Content } from "../styles/ListBook";
import { Checkbox } from "../components/Checkbox";
import { Card } from "../components/Card";

import { api } from '../lib/axios'
  
export const ListBook = () => {
  const location = useLocation()

  const [books, setBooks] = useState({ books: [] })
  const [isBooksLoaded, setIsBooksLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams] = useSearchParams()
  const [price, setPrice] = useState({min: 0, max: 1000})
  const [publicationYear, setPublicationYear] = useState({min: 0, max: 2023})

  const fetchData = async(page=1) => {
    let url = ''

    switch(location.pathname){
      case '/books/' : url = `books/?limit=20&offset=${page-1}`
                    break;

      case '/books-best-sellers/' : url = `books/best-sellers?limit=20&offset=${page-1}`
                    break;

      case '/books-most-viewed/' : url = `books/most-viewed?limit=20&offset=${page-1}`
                    break;

      case '/books-on-sale/' : url = `books/on-sale?limit=20&offset=${page-1}`
                    break;

      case '/books/search' : url = `books/search?limit=20&offset=${page-1}`
                    break;

      case '/books/filter' : url = `books/filter?limit=20&offset=${page-1}`
                    break;
      default : url = ''
                    break;    
    }

    const search = searchParams.get('q')
    const priceInterval = searchParams.get('price-interval')
    const publicationYearInterval = searchParams.get('publication-year-interval')
    const languages = searchParams.getAll('language')
    const genres = searchParams.getAll('genre')

    if (search && location.pathname === '/books/search'){
      url += `&q=${search}`
    }

    if (priceInterval){
      url += `&price-interval=${priceInterval}`
    }

    if (publicationYearInterval){
      url += `&publication-year-interval=${publicationYearInterval}`
    }

    if (languages.length > 0){
      languages.forEach((language) => {
        url += `&language=${language}`
      })
    }

    if (genres.length > 0){
      genres.forEach((genre) => {
        url += `&genre=${encodeURIComponent(genre)}`
      })
    }

    const data = await api.get(url).then(response => response.data).catch(error => {})
    if (data){
      setBooks({
        ...data,
        books: books.books.concat(data.books),
      }) 
    }

    setIsBooksLoaded(true)

    console.log(data)
    //console.log(url)
  }

  const handleLoadMore = () => {
    if (books.number_of_pages > currentPage){
      fetchData(currentPage+1)
      setCurrentPage(currentPage+1)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return(
    <Main>
      <Content>
        {
          books.books.length > 0 && 
          <H2 fontSize='xxxxl' fontWeight="500">Books</H2>
        }
        
        <Sections>
        {
          books.books.length === 0 && location.pathname === '/books/search' && 
          <Span fontSize='xxxl' fontWeight="500">No results found for "{searchParams.get('q')}".</Span>
        }
        {
          books.books.length === 0 && location.pathname !== '/books/search' && 
          <Span fontSize='xxxl' fontWeight="500">No results found.</Span>
        }
        {
          books.books.length > 0 &&
          <>
          <FiltersSection>
            <H3 fontSize='xxxl' fontWeight="500">Filter by</H3>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Genre</H4>

                <Options>
                  
                  {isBooksLoaded && books.filters.genres.map((genre, index) => 
                    <Checkbox name={`${genre.genre} (${genre.count})`} key={index} value={genre.genre} category ="genre" />
                  )}
                  
                </Options>
              </FilterSection>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Language</H4>

                <Options>
                
                  {isBooksLoaded && books.filters.languages.map((language, index) => 
                    <Checkbox name={`${language.language} (${language.count})`} key={index} value={language.language} category ="language"/>
                  )}
                
                </Options>
              </FilterSection> 

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Publication Year</H4>

                <Options>
                  <RangeSlider min={0} max={2023} defaultValue={[0, 2023]} value={[publicationYear.min, publicationYear.max]} onInput={(event) => setPublicationYear({min: event[0], max: event[1]})}/>
                  <br/>
                  <input type="text" value={publicationYear.min} onChange={(event) => setPublicationYear({min: event.target.value, max: publicationYear.max})}/>
                  <input type="text" value={publicationYear.max} onChange={(event) => setPublicationYear({min: publicationYear.min, max: event.target.value})}/>
                </Options>
              </FilterSection>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Price</H4>

                <Options>
                  <RangeSlider min={0} max={1000} defaultValue={[0, 1000]} value={[price.min, price.max]} onInput={(event) => setPrice({min: event[0], max: event[1]})}/>
                  <br/>
                  <input type="text" value={price.min} onChange={(event) => setPrice({min: event.target.value, max: price.max})}/>
                  <input type="text" value={price.max} onChange={(event) => setPrice({min: price.min, max: event.target.value})}/>
                </Options>
              </FilterSection>
          </FiltersSection>
          
          <BooksSection>
              <Books numberOfBooks={books.books.length}>
                { books.books.map((book, index) => 
                  <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
                )}
              </Books>
              
              { books.number_of_pages === currentPage || books.books.length === 0 ?
                <></>
                :
                <Button fontSize='sm' height="24px" className="btn-load-more" onClick={handleLoadMore}>Load More Products</Button>
              }
          </BooksSection>
          </>
        }
        </Sections>
      </Content>
    </Main>
  );
}