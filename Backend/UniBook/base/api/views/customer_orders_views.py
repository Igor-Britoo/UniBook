from rest_framework.response import Response
from rest_framework.decorators import api_view

from ...models import *
from ..serializers import *
from ..decorators import *
from ..utils import *

@api_view(['POST', 'GET'])
@access_token_required
def handle_orders(request):
    if request.method == 'POST':
        return create_customer_order(request)
    elif request.method == 'GET':
        return get_customer_orders(request)

def create_customer_order(request):
    """
        Create a new order for the customer logged-in
    """
    customer = Customer.objects.filter(email = request.user).first()
    address = request.data['address']
    
    if address and address['street_name'] and address['house_number'] != "" and address['city'] and address['state']:
        shipping_address = Address.objects.get_or_create( street_name = address['street_name'],
                                                        house_number = address['house_number'],
                                                        city = address['city'],
                                                        state = address['state'])[0]

        order = Order.objects.create_order(customer= customer, shipping_address= shipping_address)
        
    else:
        return Response({ "detail": "Cannot create an order without a shipping address" }, status=400)

    if request.data['create_from_cart_items']:
        cart_items = customer.shopping_cart.cart_items.all()

        if cart_items.exists():
            OrderItem.objects.create_order_items(order= order,
                                                    items= cart_items)
            Order.objects.update_order_price(code = order.code)
            cart_items.delete()

            return Response({ "detail": "Order successfully created" }, status=201)            
        
        else:
            return Response({ "detail": "Cannot create an order without items" }, status=400)
        
    elif len(request.data['items']) > 0:
        for item in request.data['items']:
            book = Book.objects.filter(ISBN = item['ISBN']).first()
            OrderItem.objects.create_order_item(book = book,
                                                quantity= item['quantity'],
                                                order= order)

        Order.objects.update_order_price(code = order.code)

        return Response({ "detail": "Order successfully created" }, status=201)            

    else:
        return Response({ "detail": "Cannot create an order without items" }, status=400)
    
def get_customer_orders(request):
    """
        Returns all orders from the logged in customer 
    """

    limit = request.GET.get('limit')
    offset = request.GET.get('offset')

    if not limit:
        limit = 20
    else:
        limit = int(limit)
    
    if not offset:
        offset= 0
    else:
        offset = int(offset)

    customer = Customer.objects.filter(email = request.user).first()
    orders = customer.orders.all()
    
    no_orders_yet = not orders.exists()
    if no_orders_yet:
        return Response({ "detail": "The customer logged in has no orders yet" }, status=200) 
    
    else:
        orders = orders.order_by('-date')
        number_of_pages = get_number_of_pages(orders, limit)

        page = (offset/limit) + 1
        page_exists =  page > 0 and page <= number_of_pages
        
        if page_exists:
            orders_page = get_page(offset, limit, orders)
            orders_serialized = OrderSerializer(orders_page, many=True)

            return Response({ 'number_of_pages' : number_of_pages,
                            'orders': orders_serialized.data }, status=200)
        else:
            return Response({ "detail": "Page not found" }, status=404) 

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

        order_items_serialized = []
        for order_item in order.order_items.all() :
            book_serialized = BookSerializer(order_item.book)
            order_item_serialized = OrderItemSerializer(order_item)
            order_item_serialized_with_book = {**order_item_serialized.data,
                                                'book': book_serialized.data}
            
            order_items_serialized.append(order_item_serialized_with_book)

        shipping_address_serialized = AddressSerializer(order.shipping_address)
        
        return Response({
            'order': {
                **order_serialized.data,
                'shipping_address': shipping_address_serialized.data,
                'order_items': order_items_serialized,
                'customer': customer.email,
            }
        }, status=200)

    else:
        return Response({ "detail": "Order not found" }, status=404)
