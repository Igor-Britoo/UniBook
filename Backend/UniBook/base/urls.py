from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', views.create_customer, name='create_customer'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('customer-logged/', views.get_customer_logged, name='get_customer_logged'),
    path('customer-logged/update/', views.update_customer_logged, name='update_customer_logged'),
          
    path('customer-logged/orders/', views.get_customer_orders, name='get_customer_orders'),
    path('customer-logged/orders/<uuid:code>/', views.get_customer_order_info, name='get_customer_order_info'),
    path('customer-logged/orders/create/', views.create_customer_order, name='create_customer_order'),

    path('customer-logged/cart/', views.get_customer_cart, name='get_customer_cart'),
    path('customer-logged/cart/cart-items/create/', views.create_customer_cart_item, name='create_customer_cart_item'),
    path('customer-logged/cart/cart-items/<int:item_id>/update/', views.update_customer_cart_item, name='update_customer_cart_item'),
    path('customer-logged/cart/cart-items/<int:item_id>/delete/', views.delete_customer_cart_item, name='delete_customer_cart_item'),

    path('books/', views.list_books, name='list_books'),
    path('books/<str:ISBN>/', views.get_book, name='get_book'),
    path('books/filter', views.list_books_with_filters, name='list_books_with_filters'),
    path('books/search', views.search_books, name='search_books'),
] 