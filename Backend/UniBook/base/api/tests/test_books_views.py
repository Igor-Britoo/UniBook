import json
from rest_framework.test import APITestCase
from rest_framework import status

from ...models import *

class ListBooks(APITestCase):
    def setUp(self):
        self.url= "/api/books/"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.genre_2 = Genre.objects.create(
            name="genre 2",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 78.00,
                                    cover= "",
                                )
        self.book_2 = Book.objects.create(
                                    ISBN= '12345678901234', 
                                    title= 'Book 2',
                                    author= 'Author 2',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 2',
                                    number_of_pages= 200,
                                    price= 70.00,
                                    cover= "",
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)

    def test_list_books_with_valid_page(self):
        response = self.client.get(self.url +'?limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "number_of_pages":2,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"78.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ],
            "filters":{
                "genres":[
                    {
                        "genre":"genre 1",
                        "count":1
                    },
                    {
                        "genre":"genre 2",
                        "count":1
                    }
                ],
                "languages":[
                    {
                        "language":"en-US",
                        "count":2
                    }
                ],
                "price":{
                    "min":70.0,
                    "max":78.0
                },
                "publication_year":{
                    "min":2000,
                    "max":2000
                }
            }
        }
        self.assertEqual(response_data, expected_data)
    
    def test_list_books_with_invalid_page(self):
        response = self.client.get(self.url + '?limit=1&offset=3')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Page not found'}
        self.assertEqual(response.data, expected_data)

class ListBooksWithFilters(APITestCase):
    def setUp(self):
        self.url= "/api/books/filter"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.genre_2 = Genre.objects.create(
            name="genre 2",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=1990,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 50.00,
                                    cover= "",
                                )
        self.book_2 = Book.objects.create(
                                    ISBN= '12345678901234', 
                                    title= 'Book 2',
                                    author= 'Author 2',
                                    publication_year=2010,
                                    language= Book.Language.PT_BR,
                                    publisher= 'Publisher 2',
                                    number_of_pages= 200,
                                    price= 100.00,
                                    cover= "",
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)

        self.response_page_not_found = {'detail': 'Page not found'}
        self.response_page_1 = {
            "number_of_pages":2,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":1990,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"50.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ],
            "filters":{
                "genres":[
                    {
                        "genre":"genre 1",
                        "count":1
                    },
                    {
                        "genre":"genre 2",
                        "count":1
                    }
                ],
                "languages":[
                    {
                        "language":"en-US",
                        "count":1
                    },
                    {
                        "language":"pt-BR",
                        "count":1
                    }
                ],
                "price":{
                    "min":50.0,
                    "max":100.0
                },
                "publication_year":{
                    "min":1990,
                    "max":2010
                }
            }
        }

    def test_list_books_with_all_filters_with_valid_page(self):
        response = self.client.get(self.url +'?price-interval=0-100&publication-year-interval=1980-2010&language=en-US&language=pt-BR&genre=genre%201&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "number_of_pages":1,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":1990,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"50.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ],
            "filters":{
                "genres":[
                    {
                        "genre":"genre 1",
                        "count":1
                    }
                ],
                "languages":[
                    {
                        "language":"en-US",
                        "count":1
                    },
                ],
                "price":{
                    "min":50.0,
                    "max":50.0
                },
                "publication_year":{
                    "min":1990,
                    "max":1990
                }
            }
        }
        self.assertEqual(response_data, expected_data)
    
    def test_list_books_with_all_filters_with_invalid_page(self):
        response = self.client.get(self.url +'?price-interval=0-100&publication-year-interval=1980-2010&language=en-US&language=pt-BR&genre=genre%201&limit=1&offset=3')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = self.response_page_not_found
        self.assertEqual(response.data, expected_data)
    
    def test_list_books_without_genres_with_valid_page(self):
        response = self.client.get(self.url +'?price-interval=0-100&publication-year-interval=1980-2010&language=en-US&language=pt-BR&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)
    
    def test_list_books_without_genres_and_languages_with_valid_page(self):
        response = self.client.get(self.url +'?price-interval=0-100&publication-year-interval=1980-2010&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_list_books_without_genres_languages_price_max_and_publication_year_max_with_valid_page(self):
        response = self.client.get(self.url +'?price-interval=0-&publication-year-interval=1980-&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_list_books_without_genres_languages_and_publication_year_interval_with_valid_page(self):
        response = self.client.get(self.url +'?price-interval=0-100&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_list_books_without_filters_with_valid_page(self):
        response = self.client.get(self.url +'?limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)
    
    def test_list_books_without_filters_with_invalid_page(self):
        response = self.client.get(self.url +'?limit=1&offset=3')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = self.response_page_not_found
        self.assertEqual(response.data, expected_data)

class SearchBooks(APITestCase):
    def setUp(self):
        self.url= "/api/books/search"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=1990,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 50.00,
                                    cover= "",
                                )
        self.book_1.genres.add(self.genre_1)

        self.response_page_not_found = {'detail': 'Page not found'}
        self.response_page_1 = {
            "number_of_pages":1,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":1990,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"50.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ]
        }

    def test_search_books_by_title_with_valid_page(self):
        response = self.client.get(self.url +'?q=Book%201&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_search_books_by_author_with_valid_page(self):
        response = self.client.get(self.url +'?q=Author%201&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_search_books_by_ISBN_with_valid_page(self):
        response = self.client.get(self.url +'?q=0123&limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = self.response_page_1
        self.assertEqual(response_data, expected_data)

    def test_search_books_by_ISBN_with_invalid_page(self):
        response = self.client.get(self.url +'?q=0123&limit=1&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = self.response_page_not_found
        self.assertEqual(response_data, expected_data)
    
    def test_search_books_by_ISBN_but_found_nothing(self):
        response = self.client.get(self.url +'?q=1234&limit=1&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Could not find anything for "1234"'}
        self.assertEqual(response_data, expected_data)

class MostViewedBooks(APITestCase):
    def setUp(self):
        self.url= "/api/books/most-viewed"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.genre_2 = Genre.objects.create(
            name="genre 2",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 78.00,
                                    cover= "",
                                    views=1,
                                )
        self.book_2 = Book.objects.create(
                                    ISBN= '12345678901234', 
                                    title= 'Book 2',
                                    author= 'Author 2',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 2',
                                    number_of_pages= 200,
                                    price= 70.00,
                                    cover= "",
                                    views=0,
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)

    def test_most_viewed_books_with_valid_page(self):
        response = self.client.get(self.url +'?limit=2&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "number_of_pages":1,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"78.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":1,
                    "sellings":0
                },
                {
                    "ISBN":"12345678901234",
                    "title":"Book 2",
                    "author":"Author 2",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 2",
                    "genres":[
                        "genre 2"
                    ],
                    "number_of_pages":200,
                    "price":"70.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ]
        }    
        self.assertEqual(response_data, expected_data)
    
    def test_most_viewed_books_invalid_page(self):
        response = self.client.get(self.url + '?limit=2&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Page not found'}
        self.assertEqual(response.data, expected_data)

class BestSellers(APITestCase):
    def setUp(self):
        self.url= "/api/books/best-sellers"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.genre_2 = Genre.objects.create(
            name="genre 2",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 78.00,
                                    cover= "",
                                    sellings=1,
                                )
        self.book_2 = Book.objects.create(
                                    ISBN= '12345678901234', 
                                    title= 'Book 2',
                                    author= 'Author 2',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 2',
                                    number_of_pages= 200,
                                    price= 70.00,
                                    cover= "",
                                    sellings=0,
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)

    def test_best_sellers_with_valid_page(self):
        response = self.client.get(self.url +'?limit=2&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "number_of_pages":1,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"78.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":1
                },
                {
                    "ISBN":"12345678901234",
                    "title":"Book 2",
                    "author":"Author 2",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 2",
                    "genres":[
                        "genre 2"
                    ],
                    "number_of_pages":200,
                    "price":"70.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ]
        }    
        self.assertEqual(response_data, expected_data)
    
    def test_best_sellers_invalid_page(self):
        response = self.client.get(self.url + '?limit=2&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Page not found'}
        self.assertEqual(response.data, expected_data)

class BooksOnSale(APITestCase):
    def setUp(self):
        self.url= "/api/books/on-sale"
        
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.genre_2 = Genre.objects.create(
            name="genre 2",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 78.00,
                                    cover= "",
                                    discount="0.25"
                                )
        self.book_2 = Book.objects.create(
                                    ISBN= '12345678901234', 
                                    title= 'Book 2',
                                    author= 'Author 2',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 2',
                                    number_of_pages= 200,
                                    price= 70.00,
                                    cover= "",
                                    discount="0.00"
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)

    def test_books_on_sale_with_valid_page(self):
        response = self.client.get(self.url +'?limit=2&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "number_of_pages":1,
            "books":[
                {
                    "ISBN":"01234567890123",
                    "title":"Book 1",
                    "author":"Author 1",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 1",
                    "genres":[
                        "genre 1"
                    ],
                    "number_of_pages":647,
                    "price":"78.00",
                    "discount":"0.25",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                },
                {
                    "ISBN":"12345678901234",
                    "title":"Book 2",
                    "author":"Author 2",
                    "publication_year":2000,
                    "language":"en-US",
                    "publisher":"Publisher 2",
                    "genres":[
                        "genre 2"
                    ],
                    "number_of_pages":200,
                    "price":"70.00",
                    "discount":"0.00",
                    "cover_url":"/images/default_book_cover.jpg",
                    "views":0,
                    "sellings":0
                }
            ]
        }
        self.assertEqual(response_data, expected_data)
    
    def test_books_on_sale_with_invalid_page(self):
        response = self.client.get(self.url + '?limit=2&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Page not found'}
        self.assertEqual(response.data, expected_data)

class GetBook(APITestCase):
    def setUp(self):
        self.url= "/api/books/"

        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '01234567890123', 
                                    title= 'Book 1',
                                    author= 'Author 1',
                                    publication_year=2000,
                                    language= Book.Language.EN_US,
                                    publisher= 'Publisher 1',
                                    number_of_pages= 647,
                                    price= 78.00,
                                    cover= "",
                                )
        self.book_1.genres.add(self.genre_1)


    def test_get_book_with_valid_ISBN(self):
        response = self.client.get(self.url + '01234567890123/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content)
        expected_data = {
            "book":{
                "ISBN":"01234567890123",
                "title":"Book 1",
                "author":"Author 1",
                "publication_year":2000,
                "language":"English (United States)",
                "publisher":"Publisher 1",
                "genres":[
                    "genre 1"
                ],
                "number_of_pages":647,
                "price":"78.00",
                "discount":"0.00",
                "cover_url":"/images/default_book_cover.jpg",
                "views":1,
                "sellings":0
            }
        }
        self.assertEqual(response_data, expected_data)
    
    def test_get_book_with_invalid_ISBN(self):
        response = self.client.get(self.url + '00000000000000/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Book not found'}
        self.assertEqual(response.data, expected_data)
    
    
    
    

