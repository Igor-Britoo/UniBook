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
            customer = Customer.objects.create_customer(email = email,
                                                        name = name,
                                                        password = password, 
                                                        address = None)
            Cart.objects.create(owner = customer)

            return Response(status=201)

    return Response(status=400)

@api_view(['GET'])
def get_customer_logged(request):
    """
        Returns the customer logged in
    """
    if request.method == 'GET':
        if(request.auth == None):
            return Response(status=401)
        
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
        if(request.auth == None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            customer.name = request.data['name']

            if request.data['email'] != customer.email:
                user_exists = User.objects.filter(email=request.data['email']).exists()

                if user_exists: 
                    return Response(status=409)

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
            
            return Response(status=200)

    return Response(status=400)

@api_view(['GET'])
def get_customer_orders(request):
    """
        Returns all orders from the logged in customer
    """
    if request.method == 'GET':
        if(request.auth == None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            orders = customer.orders.all()
            orders_serialized = OrderSerializer(orders, many=True)
            
            return Response({'orders': orders_serialized.data}, status=200)

    return Response(status=400)

@api_view(['POST'])
def create_customer_order(request):
    """
        Create a new order for the customer logged-in with his cart items
    """
    if request.method == 'POST':
        if(request.auth == None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            cart_items = customer.shopping_cart.cart_items.all()

            if cart_items.exists():
                order = Order.objects.create_order(customer= customer)
                OrderItem.objects.create_order_items(order= order,
                                                     cart_items= cart_items)
                Order.objects.update_order_price(code = order.code)
                cart_items.delete()

                return Response(status=201)            

    return Response(status=400)

@api_view(['GET'])
def get_customer_order_info(request, code):
    """
        If it exists in the orders of the logged-in customer, returns the
        order with the specified code
    """
    if request.method == 'GET':
        if(request.auth == None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            order = customer.orders.filter(code = code)

            if order.exists():
                order = order.first()
                order_serialized = OrderSerializer(order)
                order_items_serialized = OrderItemSerializer(order.order_items.all(), many=True)
                shipping_address_serialized = AddressSerializer(order.shipping_address)
                
                return Response({
                    'order': {
                        **order_serialized.data,
                        'shipping_address': shipping_address_serialized.data,
                        'order_items': order_items_serialized.data,
                        'customer': customer.email,
                    }
                }, status=200)

            else:
                return Response(status=404)

    return Response(status=400)

@api_view(['GET'])
def get_customer_cart(request):
    """
        Returns the cart of the logged in customer
    """
    if request.method == 'GET':
        if(request.auth == None):
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
        if(request.auth == None):
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
        if(request.auth == None):
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
        if(request.auth == None):
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

@api_view(['GET'])
def list_books(request):
    """
        Returns all books
    """
    if request.method == 'GET':
        books = Book.objects.all()
        books_serialized = BookSerializer(books, many=True)

        return Response({'books': books_serialized.data}, status=200)

    return Response(status=400)

@api_view(['GET'])
def get_book(request, ISBN):
    """
        If it exists, returns the book with the specified ISBN
    """
    if request.method == 'GET':
        book = Book.objects.filter(ISBN = ISBN)

        if book.exists() :
            book = book.first()
            book_serialized = BookSerializer(book)
            return Response({'book': book_serialized.data}, status=200)

        else:
            return Response(status=404)

    return Response(status=400)
