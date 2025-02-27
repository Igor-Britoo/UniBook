from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..decorators import *

@api_view(['GET', 'POST'])
def handle_cart(request):
    if request.method == 'GET':
        return get_customer_cart(request)
    elif request.method == 'POST':
        return create_customer_cart_item(request)

@api_view(['PATCH', 'DELETE'])
@access_token_required
def modify_or_remove_cart_item(request, item_id):
    if request.method == 'PATCH':
        return update_customer_cart_item(request, item_id)
    elif request.method == 'DELETE':
        return delete_customer_cart_item(request, item_id)

def get_customer_cart(request):
    """
        Returns the cart of the logged in customer
    """
    
    customer = Customer.objects.filter(email = request.user).first()
    cart = customer.shopping_cart
    cart_items = cart.cart_items.all()

    cart_serialized = CartSerializer(cart)

    cart_items_serialized = []
    for cart_item in cart_items:
        book_serialized = BookSerializer(cart_item.book)
        cart_item_serialized = CartItemSerializer(cart_item)
        cart_item_serialized_with_book = {**cart_item_serialized.data,
                                            'book': book_serialized.data}
        
        cart_items_serialized.append(cart_item_serialized_with_book)

    return Response({
        'cart': {
            **cart_serialized.data,
            'cart_items': cart_items_serialized,
            'owner': customer.email,
        }
    }, status=200)

def create_customer_cart_item(request):
    """
        If there is already a cart item in the logged-in customer's cart for the book
        submitted, increment its quantity by one. Otherwise, create a new cart item
    """
    
    customer = Customer.objects.filter(email = request.user).first()
    book = Book.objects.filter(ISBN = request.data['book'])

    if book.exists():
        book = book.first()
        cart_item = customer.shopping_cart.cart_items.filter(book = book)

        if cart_item.exists():
            cart_item = cart_item.first()
            cart_item.quantity += 1
            cart_item.save()

            return Response({ "detail": "Cart item quantity successfully incremented" }, status=200)

        else:
            cart = customer.shopping_cart
            CartItem.objects.create(book= book, 
                                    quantity = 1,
                                    cart = cart)

            return Response({ "detail": "Cart item successfully created" }, status=201)

    else:
        return Response({ "detail": "Book not found" }, status=404)

def update_customer_cart_item(request, item_id):
    """
        If there is an item with the specified id, at logged-in customer cart,
        update the quantity of this item
    """
           
    customer = Customer.objects.filter(email = request.user).first()
    cart_item = customer.shopping_cart.cart_items.filter(id = item_id)

    if cart_item.exists():
        cart_item = cart_item.first()
        cart_item.quantity = request.data['quantity']
        cart_item.save()

        return Response({ "detail": "Cart item quantity successfully updated" }, status=200)

    else:
        return Response({ "detail": "Cart item not found" }, status=404)

def delete_customer_cart_item(request, item_id):
    """
        If there is an item with the specified id, at logged-in customer cart,
        delete it
    """
        
    customer = Customer.objects.filter(email = request.user).first()
    cart_item = customer.shopping_cart.cart_items.filter(id = item_id)

    if cart_item.exists():
        cart_item.first().delete()
        return Response({ "detail": "Cart item successfully deleted" }, status=200)

    else:
        return Response({ "detail": "Cart item not found" }, status=404)
