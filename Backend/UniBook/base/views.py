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

        user_exists = User.objects.filter(email=email).exists()

        if user_exists: 
            return Response(status=409)

        else:
            Customer.objects.create_user(email=email,name=name, password=password, address = None)
            return Response(status=201)

    return Response(status=400)
