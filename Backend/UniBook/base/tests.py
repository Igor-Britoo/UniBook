from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import *
from .api.serializers import *
from .api.views.books_views import list_books


class ListBooks(TestCase):
    def setUp(self):
        self.client = APIClient()
        
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
                                    discount= 0.00,
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
                                    discount= 0.00,
                                )
        self.book_1.genres.add(self.genre_1)
        self.book_2.genres.add(self.genre_2)


    def test_list_books_with_valid_page(self):
        response = self.client.get('/api/books/?limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_list_books_with_invalid_page(self):
        response = self.client.get('/api/books/?limit=1&offset=3')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        expected_data = {'detail': 'Page not found'}

        self.assertEqual(response.data, expected_data)
    

