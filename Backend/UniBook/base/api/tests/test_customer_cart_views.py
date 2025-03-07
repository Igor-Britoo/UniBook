import json
from rest_framework.test import APITestCase
from rest_framework import status

from ...models import *

class GetCustomerCart(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/cart/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        cart = Cart.objects.create(owner = self.customer)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })

        self.token = (json.loads(tokens.content))['access']
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '0123456789012', 
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

        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = cart)

    def test_get_cart_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "cart":{
                "owner":"customer@example.com",
                "price":50.0,
                "cart_items":[
                    {
                        "id":1,
                        "book":{
                        "ISBN":"0123456789012",
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
                        },
                        "quantity":1
                    }
                ]
            }
        }
        self.assertEqual(response_data, expected_data)

    def test_get_cart_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + "x")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {
            "detail":"Given token not valid for any token type",
            "code":"token_not_valid",
            "messages":[
                {
                    "token_class":"AccessToken",
                    "token_type":"access",
                    "message":"Token is invalid or expired"
                }
            ]
        }
        self.assertEqual(response_data, expected_data)

    def test_get_cart_without_token(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

class CreateCustomerCartItem(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/cart/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        cart = Cart.objects.create(owner = self.customer)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })

        self.token = (json.loads(tokens.content))['access']
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '0123456789012', 
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
                            ISBN= '1234567890123', 
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
        self.book_2.genres.add(self.genre_1)

        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = cart)

    def test_create_customer_cart_item_that_not_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {'book': '1234567890123'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item successfully created"}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_cart_item_that_not_exists_at_customer_cart_items_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + "x")
        response = self.client.post(self.url, {'book': '1234567890123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {
            "detail":"Given token not valid for any token type",
            "code":"token_not_valid",
            "messages":[
                {
                    "token_class":"AccessToken",
                    "token_type":"access",
                    "message":"Token is invalid or expired"
                }
            ]
        }
        self.assertEqual(response_data, expected_data)

    def test_create_customer_cart_item_that_not_exists_at_customer_cart_items_without_token(self):
        response = self.client.post(self.url, {'book': '1234567890123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_create_customer_cart_item_that_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {'book': '0123456789012'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item quantity successfully incremented"}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_cart_item_with_nonexistent_book_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {'book': '0000000000000'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Book not found"}
        self.assertEqual(response_data, expected_data)

class UpdateCustomerCartItem(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/cart/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        cart = Cart.objects.create(owner = self.customer)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })

        self.token = (json.loads(tokens.content))['access']
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '0123456789012', 
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

        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = cart)

    def test_update_customer_cart_item_that_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.patch(self.url + '1/', {'quantity': 3})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item quantity successfully updated"}
        self.assertEqual(response_data, expected_data)

    def test_update_customer_cart_item_that_exists_at_customer_cart_items_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.patch(self.url + '1/', {'quantity': 3})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {
            "detail":"Given token not valid for any token type",
            "code":"token_not_valid",
            "messages":[
                {
                    "token_class":"AccessToken",
                    "token_type":"access",
                    "message":"Token is invalid or expired"
                }
            ]
        }
        self.assertEqual(response_data, expected_data)
    
    def test_update_customer_cart_item_that_exists_at_customer_cart_items_without_token(self):
        response = self.client.patch(self.url + '1/', {'quantity': 3})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_update_customer_cart_item_that_not_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.patch(self.url + '2/', {'quantity': 3})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item not found"}
        self.assertEqual(response_data, expected_data)

class DeleteCustomerCartItem(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/cart/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        cart = Cart.objects.create(owner = self.customer)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })

        self.token = (json.loads(tokens.content))['access']
        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create(
                                    ISBN= '0123456789012', 
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

        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = cart)

    def test_delete_customer_cart_item_that_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.delete(self.url + '1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item successfully deleted"}
        self.assertEqual(response_data, expected_data)

    def test_delete_customer_cart_item_that_exists_at_customer_cart_items_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.delete(self.url + '1/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {
            "detail":"Given token not valid for any token type",
            "code":"token_not_valid",
            "messages":[
                {
                    "token_class":"AccessToken",
                    "token_type":"access",
                    "message":"Token is invalid or expired"
                }
            ]
        }
        self.assertEqual(response_data, expected_data)
    
    def test_delete_customer_cart_item_that_exists_at_customer_cart_items_without_token(self):
        response = self.client.delete(self.url + '1/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_delete_customer_cart_item_that_not_exists_at_customer_cart_items_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.delete(self.url + '2/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Cart item not found"}
        self.assertEqual(response_data, expected_data)
