from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *


@api_view(['POST'])
def create_customer(request):
    """
        Create a new customer
    """
    if request.method == 'POST':
        email = request.data['email']
        name = request.data['name']
        password = request.data['password']

        user_exists = User.objects.filter(email=email).exists()

        if user_exists: 
            return Response({ "detail": "User already exists" }, status=409)

        else:
            customer = Customer.objects.create_customer(email = email,
                                                        name = name,
                                                        password = password, 
                                                        address = None)
            Cart.objects.create(owner = customer)

            return Response({ "detail": "User created with success" }, status=201)

    return Response(status=400)

@api_view(['GET'])
def get_customer_logged(request):
    """
        Returns the customer logged in
    """
    if request.method == 'GET':
        if(request.auth is None):
            return Response({ "detail": "Unauthorized access" }, status=401)
        
        else:
            customer = Customer.objects.filter(email = request.user).first()
            customer_serialized = CustomerSerializer(customer)
            address_serialized = AddressSerializer(customer.address)

            return Response({
                'customer': {
                    **customer_serialized.data,
                    'address': address_serialized.data 
                }
            }, status=200)

    return Response(status=400)

@api_view(['PUT'])
def update_customer_logged(request):
    """
        Updates the data of the logged in customer
    """
    if request.method == 'PUT':
        if(request.auth is None):
            return Response({ "detail": "Unauthorized access" }, status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            customer.name = request.data['name']

            if request.data['email'] != customer.email:
                user_exists = User.objects.filter(email=request.data['email']).exists()

                if user_exists: 
                    return Response({ "detail": "User already exists" }, status=409)

                else:
                    customer.email = request.data['email']
            
            if request.data['password']:
                customer.set_password(request.data['password'])
                
            if request.data['address']:
                new_address = Address.objects.get_or_create( street_name = request.data['address']['street_name'],
                                                        house_number = request.data['address']['house_number'],
                                                        city = request.data['address']['city'],
                                                        state = request.data['address']['state'])
                customer.address = new_address[0]
            
            customer.save()
            
            return Response({ "detail": "User data successfully updated" }, status=200)

    return Response(status=400)