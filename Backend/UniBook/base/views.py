from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from .serializers import *

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
            return Response(status=409)

        else:
            customer = Customer.objects.create_customer(email=email,name=name, password=password, address = None)
            Cart.objects.create(owner = customer)

            return Response(status=201)

    return Response(status=400)

@api_view(['GET'])
def customer_logged(request):
    """
        Returns the customer logged in
    """

    if request.method == 'GET':
        if(request.auth == None):
            return Response(status=401)
        
        else:
            customer = Customer.objects.filter(email = request.user).first()
            customer_serializer = CustomerSerializer(customer)
            address_serializer = AddressSerializer(customer.address)

            return Response({
                'customer': {
                    **customer_serializer.data,
                    'address': address_serializer.data 
                }
            }, status=200)

    return Response(status=400)
