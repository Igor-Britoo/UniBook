import json
from rest_framework.test import APITestCase
from rest_framework import status

from ...models import *

class CreateCustomer(APITestCase):
    def setUp(self):
        self.url= "/api/signup/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
    def test_create_customer_without_registered_email(self):
        new_customer = {
            "email": "customer@gmail.com",
            "name": "customer",
            "password": "123456"
        }
        response = self.client.post(self.url, new_customer)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        response_data = json.loads(response.content)
        expected_data = {'detail': 'User created with success'}
        self.assertEqual(response_data, expected_data)

    def test_create_customer_with_registered_email(self):
        existing_customer = {
            "email": "customer@example.com",
            "name": "customer",
            "password": "123456"
        }
        response = self.client.post(self.url, existing_customer)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        
        response_data = json.loads(response.content)
        expected_data = { "detail": "User already exists" }
        self.assertEqual(response_data, expected_data)

class GetCustomerLogged(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        
        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['access']

    def test_get_customer_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = {
            "customer":{
                "email":"customer@example.com",
                "name":"customer name",
                "address":{
                    "street_name":"",
                    "house_number":None,
                    "city":"",
                    "state":None
                }
            }
        }
        self.assertEqual(response_data, expected_data)
    
    def test_get_customer_with_invalid_token(self):
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

    def test_get_customer_without_token(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)

class UpdateCustomerLogged(APITestCase):
    def setUp(self):
        self.url= "/api/customer-logged/update/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        
        self.customer = Customer.objects.create_customer(email = "customer0@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)
        
        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['access']

    def test_update_customer_without_registered_email_with_valid_token(self):
        customer_new_data = {
            "email":"customer0@gmail.com",
            "name":"customer0",
            "address":{
                "street_name":"street_name",
                "house_number":"108",
                "city":"city",
                "state":"AC"
            }
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.put(self.url, customer_new_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = { "detail":"User data successfully updated" }
        self.assertEqual(response_data, expected_data)

    def test_update_customer_with_registered_email_with_valid_token(self):
        customer_new_data = {
            "email":"customer0@example.com",
            "name":"customer0",
            "address":{
                "street_name":"street_name",
                "house_number":"108",
                "city":"city",
                "state":"AC"
            }
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.put(self.url, customer_new_data)
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

        response_data = json.loads(response.content)
        expected_data = { "detail": "User already exists" }
        self.assertEqual(response_data, expected_data)

    def test_update_customer_with_registered_email_but_the_email_registered_is_the_same_as_the_customer_logged_in_with_valid_token(self):
        customer_new_data = {
            "email":"customer@example.com",
            "name":"customer0",
            "address":{
                "street_name":"street_name",
                "house_number":"108",
                "city":"city",
                "state":"AC"
            }
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.put(self.url, customer_new_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        expected_data = { "detail":"User data successfully updated" }
        self.assertEqual(response_data, expected_data)

    def test_update_customer_with_invalid_token(self):
        customer_new_data = {
            "email":"customer0@gmail.com",
            "name":"customer0",
            "address":{
                "street_name":"street_name",
                "house_number":"108",
                "city":"city",
                "state":"AC"
            }
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token + 'x')
        response = self.client.put(self.url, customer_new_data)
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

    def test_update_customer_without_token(self):
        customer_new_data = {
            "email":"customer0@gmail.com",
            "name":"customer0",
            "address":{
                "street_name":"street_name",
                "house_number":"108",
                "city":"city",
                "state":"AC"
            }
        }
        response = self.client.put(self.url, customer_new_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = { "detail": "Unauthorized access" }
        self.assertEqual(response_data, expected_data)
