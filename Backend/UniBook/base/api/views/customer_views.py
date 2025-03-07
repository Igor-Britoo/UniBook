from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..decorators import *

@api_view(['GET', 'PUT'])
@access_token_required
def manage_logged_customer(request):
    if request.method == 'GET':
        return get_customer_logged(request)
    elif request.method == 'PUT':
        return update_customer_logged(request)

@api_view(['POST'])
def create_customer(request):
    """
        Create a new customer
    """
    
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

def get_customer_logged(request):
    """
        Returns the customer logged in
    """

    customer = Customer.objects.filter(email = request.user).first()
    customer_serialized = CustomerSerializer(customer)
    address_serialized = AddressSerializer(customer.address)

    return Response({
        'customer': {
            **customer_serialized.data,
            'address': address_serialized.data 
        }
    }, status=200)

def update_customer_logged(request):
    """
        Updates the data of the logged in customer
    """

    customer = Customer.objects.filter(email = request.user).first()
    customer.name = request.data['name']

    if request.data['email'] != customer.email:
        user_exists = User.objects.filter(email=request.data['email']).exists()

        if user_exists: 
            return Response({ "detail": "User already exists" }, status=409)

        else:
            customer.email = request.data['email']
    
    if request.data['address']:
        address = request.data['address']
        if address['street_name'] and address['house_number'] and address['city'] and address['state']:
            new_address = Address.objects.get_or_create( street_name = address['street_name'],
                                                    house_number = address['house_number'],
                                                    city = address['city'],
                                                    state = address['state'])
            customer.address = new_address[0]
        else:
            customer.address = None
    
    customer.save()
    
    return Response({ "detail": "User data successfully updated" }, status=200)
