from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..models import *
from ..serializers import *

@api_view(['POST'])
def create_customer_order(request):
    """
        Create a new order for the customer logged-in with his cart items
    """
    if request.method == 'POST':
        if(request.auth is None):
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
def get_customer_orders(request):
    """
        Returns all orders from the logged in customer
    """
    if request.method == 'GET':
        if(request.auth is None):
            return Response(status=401)

        else:
            customer = Customer.objects.filter(email = request.user).first()
            orders = customer.orders.all()
            orders_serialized = OrderSerializer(orders, many=True)
            
            return Response({'orders': orders_serialized.data}, status=200)

    return Response(status=400)


@api_view(['GET'])
def get_customer_order_info(request, code):
    """
        If it exists in the orders of the logged-in customer, returns the
        order with the specified code
    """
    if request.method == 'GET':
        if(request.auth is None):
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