from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import *
from ..serializers import *

@api_view(['GET'])
def get_customer_cart(request):
    """
        Returns the cart of the logged in customer
    """
    if request.method == 'GET':
        if(request.auth is None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            cart = customer.shopping_cart
            cart_items = cart.cart_items.all()

            cart_serialized = CartSerializer(cart)
            cart_items_serialized = CartItemSerializer(cart_items, many = True)

            return Response({
                'cart': {
                    **cart_serialized.data,
                    'cart_items': cart_items_serialized.data,
                    'owner': customer.email,
                }
            }, status=200)

    return Response(status=400)

@api_view(['POST'])
def create_customer_cart_item(request):
    """
        If there is already a cart item in the logged-in customer's cart for the book
        submitted, increment its quantity by one. Otherwise, create a new cart item
    """
    if request.method == 'POST':
        if(request.auth is None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            book = Book.objects.filter(ISBN = request.data['book'])

            if book.exists():
                book = book.first()
                cart_item = customer.shopping_cart.cart_items.filter(book = book)

                if cart_item.exists():
                    cart_item = cart_item.first()
                    cart_item.quantity += 1
                    cart_item.save()

                    return Response(status=200)

                else:
                    cart = customer.shopping_cart
                    CartItem.objects.create(book= book, 
                                            quantity = 1,
                                            cart = cart)

                    return Response(status=201)

            else:
                return Response(status=404)

    return Response(status=400)

@api_view(['PATCH'])
def update_customer_cart_item(request, item_id):
    """
        If there is an item with the specified id, at logged-in customer cart,
        update the quantity of this item
    """
    if request.method == 'PATCH':
        if(request.auth is None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            cart_item = customer.shopping_cart.cart_items.filter(id = item_id)

            if cart_item.exists():
                cart_item = cart_item.first()
                cart_item.quantity = request.data['quantity']
                cart_item.save()

                return Response(status=200)

            else:
                return Response(status=404)

    return Response(status=400)

@api_view(['DELETE'])
def delete_customer_cart_item(request, item_id):
    """
        If there is an item with the specified id, at logged-in customer cart,
        delete it
    """
    if request.method == 'DELETE':
        if(request.auth is None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            cart_item = customer.shopping_cart.cart_items.filter(id = item_id)

            if cart_item.exists():
                cart_item.first().delete()
                return Response(status=200)

            else:
                return Response(status=404)

    return Response(status=400)