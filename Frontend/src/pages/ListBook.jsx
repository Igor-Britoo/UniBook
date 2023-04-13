import React,{ useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdClose } from 'react-icons/md'

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { Button, H3, H4, Main, Span } from "../styles/styles";
import { Sections, BooksSection, Books, FiltersSection, FilterSection, Options, RangeInputContainer, InputsContainer, ButtonOpenFilters, ButtonCloseFilters } from "../styles/ListBook";
import { Checkbox } from "../components/Checkbox";
import { Card } from "../components/Card";

import { api } from '../lib/axios';

import { FaFilter } from 'react-icons/fa';
  
export const ListBook = () => {
  const location = useLocation()
  
  const [books, setBooks] = useState({ books: [] })
  const [isBooksLoaded, setIsBooksLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceInterval, setPriceInterval] = useState({ min:0, max:0 })
  const [publicationYearInterval, setPublicationYearInterval] = useState({ min:0, max:0 })
  const [filterActive, setFilterMode] = useState(false);

  const openFilter = event => {
    setFilterMode(current => !current);
  }
  
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

  const handleIntervalInput = async (event, categorySlug, type) =>{
    let min, max, interval, category
    let targetValue = parseInt(event.target.value)

    if (categorySlug === 'price-interval'){
      interval = priceInterval
      category = 'price'
    }else{
      interval = publicationYearInterval
      category = 'publication_year'
    }

    if (type === 'min'){
      if (targetValue < books.filters[category].min){
        min = books.filters[category].min
        max = interval.max
      }
      else if (targetValue > books.filters[category].max){
        min = interval.max
        max = books.filters[category].max
      }
      else if (targetValue > interval.max){
        min = interval.max
        max = targetValue
      }
      else{
        min = targetValue
        max = interval.max
      }
    }
    else{
      if (targetValue > books.filters[category].max){
        min= interval.min
        max= books.filters[category].max
      }
      else if (targetValue < books.filters[category].min){
        min= books.filters[category].min
        max= interval.min
      }
      else if (targetValue < interval.min) {
        min= targetValue
        max= interval.min
      }
      else{
        min= interval.min
        max= targetValue
      }
    }

    if (categorySlug === 'price-interval'){
      setPriceInterval({min, max})
    }else{
      setPublicationYearInterval({min, max})
    }

    updateIntervalSearchParams(categorySlug, min, max)
  }

  const updateIntervalSearchParams = (categorySlug, min, max) => {
    let category

    if (categorySlug === 'price-interval'){
      category = 'price'
    }else{
      category = 'publication_year'
    }

    if (searchParams.has(categorySlug)){
      let intervalSlug = searchParams.get(categorySlug)
      let values = intervalSlug.split('-')
      values[0] = parseInt(values[0])
      values[1] = parseInt(values[1])   

      if (min !== values[0] || max !== values[1]){
        let searchParamsAfterReplace = searchParams.toString().replace(`${categorySlug}=${intervalSlug}`, `${categorySlug}=${min}-${max}`)
        setSearchParams(searchParamsAfterReplace)
        window.location.reload(true)
        window.scrollTo(0, 0)
      }
    }
    else if (min !== books.filters[category].min || max !== books.filters[category].max){
      searchParams.append(categorySlug, `${min}-${max}`)
      setSearchParams(searchParams)
      window.location.reload(true)
      window.scrollTo(0, 0)
    }
  }

  const updateOnEnter = (event) => {
    if (event.keyCode === 13) {
      document.getElementById(event.target.id).blur();
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  },[])

  return(
    <Main>
      {/*
        books.books.length > 0 && 
        <H2 fontSize='xxxxl' fontWeight="500">Books</H2>
      */}

      <Sections>
      {
        books.books.length === 0 && location.pathname === '/books/search' && 
        <Span fontSize='xxxl' fontWeight="500">No results found for "{searchParams.get('q')}".</Span>
      }
      {
        books.books.length === 0 && location.pathname !== '/books/search' && 
        <Span fontSize='xxxl' fontWeight="500">No results found.</Span>
      }

        <ButtonOpenFilters onClick={openFilter}>
          <FaFilter color="#1C3333" fontSize="2.1em"/>
          <H4 fontSize='xxxxl' fontWeight="500" >Filter</H4>
        </ButtonOpenFilters>
      
      {
        books.books.length > 0 &&
        <>        
        <FiltersSection active={filterActive}>
          <H3 fontSize='xxxl' fontWeight="500">Filter by</H3>

          {
          filterActive && 
          <ButtonCloseFilters>
            <MdClose color="#1C3333" fontSize="2.8em" onClick={() => setFilterMode(false)}/>
          </ButtonCloseFilters>
          }

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
                  onThumbDragEnd = {() => updateIntervalSearchParams('publication-year-interval', publicationYearInterval.min, publicationYearInterval.max)}
                />

                <InputsContainer>
                  <input type="number" id="publication-year-interval-min"
                    value={publicationYearInterval.min} 
                    onChange={(event)=> setPublicationYearInterval({min: event.target.value, max: publicationYearInterval.max})} 
                    onBlur={(event) => handleIntervalInput(event, 'publication-year-interval', 'min')}
                    onKeyDown={(event) => updateOnEnter(event)}
                  />

                  <div></div>

                  <input type="number" id="publication-year-interval-max"
                    value={publicationYearInterval.max} 
                    onChange={(event)=> setPublicationYearInterval({min: publicationYearInterval.min, max: event.target.value})} 
                    onBlur={(event) => handleIntervalInput(event, 'publication-year-interval', 'max')}
                    onKeyDown={(event) => updateOnEnter(event)}
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
                  onThumbDragEnd= {() => updateIntervalSearchParams('price-interval', priceInterval.min, priceInterval.max)}
                />

                <InputsContainer>
                  <input type="number" id="price-interval-min"
                    value={priceInterval.min} 
                    onChange={(event)=> setPriceInterval({min: event.target.value, max: priceInterval.max})}
                    onBlur={(event) => handleIntervalInput(event, 'price-interval', 'min')}
                    onKeyDown={(event) => updateOnEnter(event)}
                  />

                  <div></div>

                  <input type="number" id="price-interval-max"
                    value={priceInterval.max} 
                    onChange={(event)=> setPriceInterval({min: priceInterval.min, max: event.target.value})} 
                    onBlur={(event) => handleIntervalInput(event, 'price-interval', 'max')}
                    onKeyDown={(event) => updateOnEnter(event)}
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
    </Main>
  );
}