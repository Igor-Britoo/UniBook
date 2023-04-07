import json
from rest_framework.test import APITestCase
from rest_framework import status

from ...models import *
class CreateCustomerOrder(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/orders/create/"

        self.shipping_address = Address.objects.create( street_name = "test street",
                                                    house_number = 0,
                                                    city = "test city",
                                                    state = Address.State.PE)      
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                        name = "customer name",
                                                        password = "password", 
                                                        address = None)
        self.cart = Cart.objects.create(owner = self.customer)

        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create( ISBN= '0123456789012', 
                                            title= 'Book 1',
                                            author= 'Author 1',
                                            publication_year=1990,
                                            language= Book.Language.EN_US,
                                            publisher= 'Publisher 1',
                                            number_of_pages= 647,
                                            price= 50.00,
                                            cover= "")
        self.book_1.genres.add(self.genre_1)
        BookInventory.objects.create( book = self.book_1, quantity = 100)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['access']

    def test_create_customer_order_from_cart_items_with_items_on_cart_with_shipping_address_with_valid_token(self):
        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = self.cart)
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {
            "create_from_cart_items" : True,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            }
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Order successfully created'}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_order_from_cart_items_with_items_on_cart_with_shipping_address_with_invalid_token(self):
        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = self.cart)
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.post(self.url, {
            "create_from_cart_items" : True,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            }
        })
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

    def test_create_customer_order_from_cart_items_with_items_on_cart_with_shipping_address_without_token(self):
        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = self.cart)
        
        response = self.client.post(self.url, {
            "create_from_cart_items" : True,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            }
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_create_customer_order_from_cart_items_without_items_on_cart_with_shipping_address_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {
            "create_from_cart_items" : True,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            }
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Cannot create an order without items'}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_order_from_cart_items_with_items_on_cart_without_shipping_address_with_valid_token(self):
        CartItem.objects.create(book= self.book_1, 
                                quantity = 1,
                                cart = self.cart)
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {
            "create_from_cart_items" : True,
            "address":{}
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Cannot create an order without a shipping address'}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_order_with_items_with_shipping_address_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {
            "create_from_cart_items" : False,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            },
            "items": [
                {
                    "ISBN": self.book_1.ISBN,
                    "quantity": 2,
                }
            ]
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Order successfully created'}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_order_without_items_with_shipping_address_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.post(self.url, {
            "create_from_cart_items" : False,
            "address":{
                "street_name": self.shipping_address.street_name,
                "house_number": self.shipping_address.house_number,
                "city": self.shipping_address.city,
                "state": self.shipping_address.state
            },
            "items": []
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response_data = json.loads(response.content)
        expected_data = {'detail': 'Cannot create an order without items'}
        self.assertEqual(response_data, expected_data)

class GetCustomerOrders(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/orders/"

        customer_address = Address.objects.create( street_name = "test street",
                                                    house_number = 0,
                                                    city = "test city",
                                                    state = Address.State.PE)      
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                        name = "customer name",
                                                        password = "password", 
                                                        address = customer_address)
        self.cart = Cart.objects.create(owner = self.customer)

        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create( ISBN= '0123456789012', 
                                            title= 'Book 1',
                                            author= 'Author 1',
                                            publication_year=1990,
                                            language= Book.Language.EN_US,
                                            publisher= 'Publisher 1',
                                            number_of_pages= 647,
                                            price= 50.00,
                                            cover= "")
        self.book_1.genres.add(self.genre_1)
        BookInventory.objects.create( book = self.book_1, quantity = 100 )

        CartItem.objects.create( book= self.book_1, 
                                quantity = 1,
                                cart = self.cart )

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['access']

    def test_get_customer_orders_where_customer_has_orders_with_valid_page_with_valid_token(self):
        order = Order.objects.create_order(customer= self.customer, shipping_address= self.customer.address)
        OrderItem.objects.create_order_items(order= order,
                                            items= self.customer.shopping_cart.cart_items.all())
        Order.objects.update_order_price(code = order.code)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url + '?limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        not_expected_data = { "detail": "The customer logged in has no orders yet" }
        self.assertNotEqual(response_data, not_expected_data)

    def test_get_customer_orders_where_customer_has_orders_with_invalid_page_with_valid_token(self):
        order = Order.objects.create_order(customer= self.customer, shipping_address= self.customer.address)
        OrderItem.objects.create_order_items(order= order,
                                            items= self.customer.shopping_cart.cart_items.all())
        Order.objects.update_order_price(code = order.code)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url + '?limit=1&offset=1')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        not_expected_data = { "detail": "Page not found" }
        self.assertEqual(response_data, not_expected_data)

    def test_get_customer_orders_where_customer_has_orders_with_valid_page_with_invalid_token(self):
        order = Order.objects.create_order(customer= self.customer, shipping_address= self.customer.address)
        OrderItem.objects.create_order_items(order= order,
                                            items= self.customer.shopping_cart.cart_items.all())
        Order.objects.update_order_price(code = order.code)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.get(self.url + '?limit=1&offset=0')
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

    def test_get_customer_orders_where_customer_has_orders_with_valid_page_without_token(self):
        order = Order.objects.create_order(customer= self.customer, shipping_address= self.customer.address)
        OrderItem.objects.create_order_items(order= order,
                                            items= self.customer.shopping_cart.cart_items.all())
        Order.objects.update_order_price(code = order.code)

        response = self.client.get(self.url + '?limit=1&offset=0')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_get_customer_orders_where_customer_has_no_orders_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        not_expected_data = { "detail": "The customer logged in has no orders yet" }
        self.assertEqual(response_data, not_expected_data)

class GetCustomerOrderInfo(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/orders/"

        customer_address = Address.objects.create( street_name = "test street",
                                                    house_number = 0,
                                                    city = "test city",
                                                    state = Address.State.PE)      
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                        name = "customer name",
                                                        password = "password", 
                                                        address = customer_address)
        self.cart = Cart.objects.create(owner = self.customer)

        self.genre_1 = Genre.objects.create(
            name="genre 1",
            description="Lorem",
        )
        self.book_1 = Book.objects.create( ISBN= '0123456789012', 
                                            title= 'Book 1',
                                            author= 'Author 1',
                                            publication_year=1990,
                                            language= Book.Language.EN_US,
                                            publisher= 'Publisher 1',
                                            number_of_pages= 647,
                                            price= 50.00,
                                            cover= "")
        self.book_1.genres.add(self.genre_1)
        BookInventory.objects.create( book = self.book_1, quantity = 100 )

        CartItem.objects.create( book= self.book_1, 
                                quantity = 1,
                                cart = self.cart )
        
        self.order = Order.objects.create_order(customer= self.customer, shipping_address= self.customer.address)
        OrderItem.objects.create_order_items(order= self.order,
                                            items= self.customer.shopping_cart.cart_items.all())
        Order.objects.update_order_price(code = self.order.code)

        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['access']

    def test_get_customer_order_info_with_valid_code_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url + str(self.order.code) + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_customer_order_info_with_valid_code_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.get(self.url + str(self.order.code) + '/')
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
    
    def test_get_customer_order_info_with_valid_code_without_token(self):
        response = self.client.get(self.url + str(self.order.code) + '/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

    def test_get_customer_order_info_with_invalid_code_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url + "0a0a0a0a-0a0a-0a0a-0a0a-0a0a0a0a0a0a/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Order not found" }
        self.assertEqual(response_data, expected_data)
