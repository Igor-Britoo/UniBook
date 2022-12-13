import json
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *

# Create your views here.
@api_view(['POST'])
def create_customer(request):
    if request.method == 'POST':

        email = request.data['email']
        name = request.data['name']
        password = request.data['password']

        customer_exists = Customer.objects.filter(email=email).exists()

        if customer_exists: 
            return Response(status=409)

        else:
            customer = Customer.objects.create(email=email,name=name, password=password)
            customer.set_password(password)
            customer.save()
            return Response(status=201)

    return Response(status=400)
