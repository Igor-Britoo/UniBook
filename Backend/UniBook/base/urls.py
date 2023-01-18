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
    
    path('books/', views.list_books, name='list_books'),
    path('books/<str:ISBN>/', views.get_book, name='get_book'),
] 