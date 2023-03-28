import React,{ useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { Button, H2, H3, H4, Main, Span } from "../styles/styles";
import { Sections, BooksSection, Books, FiltersSection, FilterSection, Options, Content } from "../styles/ListBook";
import { Checkbox } from "../components/Checkbox";
import { Card } from "../components/Card";

import { api } from '../lib/axios'
  
export const ListBook = () => {
  const location = useLocation()

  const [books, setBooks] = useState({ books: [] })
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchData = async(page=1) => {
    let url = ''

    switch(location.pathname){
      case '/books' : url = `books/?limit=20&offset=${page-1}`
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
      // Falta regex para saber se esta formatado corretamente
      url += `&price-interval=${priceInterval}`
    }

    if (publicationYearInterval){
      // Falta regex para saber se esta formatado corretamente
      url += `&publication-year-interval=${publicationYearInterval}`
    }

    if (languages.length > 0){
      // Falta a parte da url encode
      languages.forEach((language) => {
        url += `&language=${language}`
      })
    }

    if (genres.length > 0){
      // Falta a parte da url encode
      genres.forEach((genre) => {
        url += `&genre=${genre}`
      })
    }

    const data = await api.get(url).then(response => response.data).catch(error => {})

    setBooks({
      ...data,
      books: books.books.concat(data.books),
    })
    
    //console.log(data)
    //console.log(url)
  }

  const handleLoadMore = () => {
    if (books.number_of_pages > currentPage){
      fetchData(currentPage+1)
      setCurrentPage(currentPage+1)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return(
    <Main>
      <Content>
        <H2 fontSize='xxxxl' fontWeight="500">Books</H2>
        
        <Sections>

          <FiltersSection>
            <H3 fontSize='xxxl' fontWeight="500">Filter by</H3>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Category</H4>

                <Options>
                  <Checkbox name="Arts & Music"/>
                  <Checkbox name="Biographies"/>
                  <Checkbox name="Fiction"/>
                  <Checkbox name="Nonfiction"/>
                  <Checkbox name="Computers & Tech"/>
                  <Checkbox name="Kids"/>
                </Options>
              </FilterSection>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Language</H4>

                <Options>
                  <Checkbox name="English"/>
                  <Checkbox name="Portuguese"/>
                  <Checkbox name="Spanish"/>
                </Options>
              </FilterSection>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Publication Year</H4>

                <Options>
                  <Checkbox name="1960 - 1970"/>
                  <Checkbox name="1970 - 1980"/>
                  <Checkbox name="1980 - 1990"/>
                  <Checkbox name="1990 - 2000"/>
                  <Checkbox name="2000 - 2010"/>
                  <Checkbox name="2010+"/>
                </Options>
              </FilterSection>

              <FilterSection>
                <H4 fontSize='xxl' fontWeight="500" >Price</H4>

                <Options>
                  <Checkbox name="$0 - $50"/>
                  <Checkbox name="$50 - $100"/>
                  <Checkbox name="$100 - $150"/>
                  <Checkbox name="$150+"/>
                </Options>
              </FilterSection>
          </FiltersSection>
          
          <BooksSection>
              <Books numberOfBooks={books.books.length}>
                { books.books.map((book, index) => 
                  <Card ISBN={book.ISBN} coverUrl={book.cover_url} title={book.title} author={book.author} price={book.price} key={index} />
                )}
                {
                  books.books.length === 0 && location.pathname === '/books/search' && 
                  <Span fontSize='xxxl' fontWeight="500">No results found for "{searchParams.get('q')}".</Span>
                }
              </Books>
              
              { books.number_of_pages === currentPage || books.books.length === 0 ?
                <></>
                :
                <Button fontSize='sm' height="24px" className="btn-load-more" onClick={handleLoadMore}>Load More Products</Button>
              }
          </BooksSection>

        </Sections>
      </Content>
    </Main>
  );
}