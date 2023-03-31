import React,{ useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { Button, H2, H3, H4, Main, Span } from "../styles/styles";
import { Sections, BooksSection, Books, FiltersSection, FilterSection, Options, Content, RangeInputContainer, InputsContainer } from "../styles/ListBook";
import { Checkbox } from "../components/Checkbox";
import { Card } from "../components/Card";

import { api } from '../lib/axios'
  
export const ListBook = () => {
  const location = useLocation()

  const [books, setBooks] = useState({ books: [] })
  const [isBooksLoaded, setIsBooksLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceInterval, setPriceInterval] = useState({ min:0, max:0 })
  const [publicationYearInterval, setPublicationYearInterval] = useState({ min:0, max:0 })

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
    const priceSlug = searchParams.get('price-interval')
    const publicationYearSlug = searchParams.get('publication-year-interval')
    const languages = searchParams.getAll('language')
    const genres = searchParams.getAll('genre')

    if (search && location.pathname === '/books/search'){
      url += `&q=${search}`
    }
    if (priceSlug){
      url += `&price-interval=${priceSlug}`
    }
    if (publicationYearSlug){
      url += `&publication-year-interval=${publicationYearSlug}`
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

    let data = await api.get(url).then(response => response.data).catch(error => {})
    if (data){
      setBooks({
        ...data,
        books: books.books.concat(data.books),
      }) 
    }

    data = await api.get('books/').then(response => response.data).catch(error => {})
    if (data){
      setBooks(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          publication_year: data.filters.publication_year,
          price: data.filters.price,
        }
      })) 
    }

    setPriceAndPublicationYearBasedOnUrl(data)
    setIsBooksLoaded(true)
  }

  const setPriceAndPublicationYearBasedOnUrl = (data) => {
    const priceSlug = searchParams.get('price-interval')
    const publicationYearSlug = searchParams.get('publication-year-interval')

    if (priceSlug){
      let values = priceSlug.split('-')
      let areNumbers = (/^\d+$/.test(values[0])) && (/^\d+$/.test(values[1]))
      
      if( areNumbers ) {
        let min = parseInt(values[0])
        let max = parseInt(values[1])

        if (min < data.filters.price.min) min = data.filters.price.min
        if (max > data.filters.price.max) max = data.filters.price.max
        
        setPriceInterval({ min, max })
      }
    }
    else {
      setPriceInterval({min: data.filters.price.min, max: data.filters.price.max})
    }

    if (publicationYearSlug){
      let values = publicationYearSlug.split('-')
      let areNumbers = (/^\d+$/.test(values[0])) && (/^\d+$/.test(values[1]))
      
      if( areNumbers ) {
        let min = parseInt(values[0])
        let max = parseInt(values[1])

        if (min < data.filters.publication_year.min) min = data.filters.publication_year.min
        if (max > data.filters.publication_year.max) max = data.filters.publication_year.max
        
        setPublicationYearInterval({ min, max })
      }
    }
    else {
      setPublicationYearInterval({min: data.filters.publication_year.min, max: data.filters.publication_year.max})
    }
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

                <RangeInputContainer>
                  <RangeSlider 
                    min={books.filters.publication_year.min} max={books.filters.publication_year.max} 
                    value={[publicationYearInterval.min, publicationYearInterval.max]} 
                    rangeSlideDisabled
                    onInput={(event) => setPublicationYearInterval({min: event[0], max: event[1]})}
                  />

                  <InputsContainer>
                    <input type="number" 
                      value={publicationYearInterval.min} 
                      onChange={(event)=> setPublicationYearInterval({min: event.target.value, max: publicationYearInterval.max})} 
                      onBlur={(event)=> {
                        if (event.target.value < books.filters.publication_year.min){
                          setPublicationYearInterval({min: books.filters.publication_year.min, max: publicationYearInterval.max})
                        } 
                      }
                      }
                    />
                    <div></div>
                    <input type="number"
                      value={publicationYearInterval.max} 
                      onChange={(event)=> setPublicationYearInterval({min: publicationYearInterval.min, max: event.target.value})} 
                      onBlur={(event)=> {
                        if (event.target.value > books.filters.publication_year.max){
                          setPublicationYearInterval({min: publicationYearInterval.min , max: books.filters.publication_year.max})
                        }
                      }
                      }
                    />
                  </InputsContainer>
                </RangeInputContainer>
              </FilterSection>
              
              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Price</H4>

                <RangeInputContainer>
                  <RangeSlider 
                    min={books.filters.price.min} max={books.filters.price.max} 
                    value={[priceInterval.min, priceInterval.max]} 
                    rangeSlideDisabled
                    onInput={(event) => setPriceInterval({min: event[0], max: event[1]})}
                  />

                  <InputsContainer>
                    <input type="number" 
                      value={priceInterval.min} 
                      onChange={(event)=> setPriceInterval({min: event.target.value, max: priceInterval.max})} 
                      onBlur={(event)=> {
                        if (event.target.value < books.filters.price.min){
                          setPriceInterval({min: books.filters.price.min, max: priceInterval.max})
                        }
                        searchParams.append('price-interval', `${books.filters.price.min}-${priceInterval.max}`)
                        setSearchParams(searchParams)
                      }
                      }
                    />
                    <div></div>
                    <input type="number"
                      value={priceInterval.max} 
                      onChange={(event)=> setPriceInterval({min: priceInterval.min, max: event.target.value})} 
                      onBlur={(event)=> {
                        if (event.target.value > books.filters.price.max){
                          setPriceInterval({min: priceInterval.min , max: books.filters.price.max})
                        }
                        searchParams.append('price-interval', `${priceInterval.min}-${books.filters.price.max}`)
                        setSearchParams(searchParams)
                      }
                      }
                    />
                  </InputsContainer>

                </RangeInputContainer>
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