from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..decorators import *

@api_view(['POST'])
@access_token_required
def create_customer_order(request):
    """
        Create a new order for the customer logged-in with his cart items
    """

    customer = Customer.objects.filter(email = request.user).first()
    cart_items = customer.shopping_cart.cart_items.all()

    if cart_items.exists():
        for cart_item in cart_items:
            book = cart_item.book
            book.sellings = cart_item.quantity
            book.save()
            
        order = Order.objects.create_order(customer= customer)
        OrderItem.objects.create_order_items(order= order,
                                                cart_items= cart_items)
        Order.objects.update_order_price(code = order.code)
        cart_items.delete()

        return Response({ "detail": "Order successfully created" }, status=201)            
    
    else:
        return Response({ "detail": "Cannot create an order without cart items" }, status=400)
    
@api_view(['GET'])
@access_token_required
def get_customer_orders(request):
    """
        Returns all orders from the logged in customer
    """

    customer = Customer.objects.filter(email = request.user).first()
    orders = customer.orders.all()
    orders_serialized = OrderSerializer(orders, many=True)
    
    return Response({ 'orders': orders_serialized.data }, status=200)


@api_view(['GET'])
@access_token_required
def get_customer_order_info(request, code):
    """
        If exists an order with the specified code in the orders of the logged-in 
        customer, returns this order information.
    """

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
        return Response({ "detail": "Order not found" }, status=404)
