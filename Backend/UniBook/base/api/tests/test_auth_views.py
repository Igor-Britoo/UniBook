import json
from rest_framework.test import APITestCase
from rest_framework import status

from ...models import *

class GetTokens(APITestCase):
    def setUp(self):
        self.url= "/api/token/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)  

    def test_get_tokens_with_existing_user(self):
        response = self.client.post(self.url, {
            "email": "customer@example.com",
            "password": "password"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_tokens_with_existing_user_but_wrong_password(self):
        response = self.client.post(self.url, {
            "email": "customer@example.com",
            "password": "passwordd"
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {"detail":"No active account found with the given credentials"}
        self.assertEqual(response_data, expected_data)
    
    def test_get_tokens_with_nonexistent_user(self):
        response = self.client.post(self.url, {
            "email": "customer0@example.com",
            "password": "password"
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {"detail":"No active account found with the given credentials"}
        self.assertEqual(response_data, expected_data)

class RefreshTokens(APITestCase):
    def setUp(self):
        self.url= "/api/token/refresh/"
        
        self.customer = Customer.objects.create_customer(email = "customer@example.com",
                                                    name = "customer name",
                                                    password = "password", 
                                                    address = None)  
        
        tokens = self.client.post("/api/token/", {
            "email": "customer@example.com",
            "password": "password"
        })
        self.token = (json.loads(tokens.content))['refresh']

    def test_refresh_tokens_with_valid_token(self):
        response = self.client.post(self.url, {'refresh' : self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_refresh_tokens_with_invalid_token(self):
        response = self.client.post(self.url, {'refresh' : self.token + 'x'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response_data = json.loads(response.content)
        expected_data = {"detail":"Token is invalid or expired","code":"token_not_valid"}
        self.assertEqual(response_data, expected_data)

    def test_refresh_tokens_with_blacklisted_token(self):
        # the first request is made so it can blacklist self.token
        # the second is made to confirm the blacklisted token
        response = self.client.post(self.url, {'refresh' : self.token})
        response = self.client.post(self.url, {'refresh' : self.token})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response_data = json.loads(response.content)
        expected_data = {"detail":"Token is blacklisted","code":"token_not_valid"} 
        self.assertEqual(response_data, expected_data)       