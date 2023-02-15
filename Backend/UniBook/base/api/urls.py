from django.urls import path, include
from .views import books_views, customer_cart_views, customer_orders_views, customer_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', include([
        path('', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ])),

    path('signup/', customer_views.create_customer, name='create_customer'),

    path('customer-logged/', include([
        path('', customer_views.get_customer_logged, name='get_customer_logged'),
        path('update/', customer_views.update_customer_logged, name='update_customer_logged'),

        path('orders/', include([
            path('', customer_orders_views.get_customer_orders, name='get_customer_orders'),
            path('create/', customer_orders_views.create_customer_order, name='create_customer_order'),
            path('<uuid:code>/', customer_orders_views.get_customer_order_info, name='get_customer_order_info'),
        ])),

        path('cart/', include([
            path('', customer_cart_views.get_customer_cart, name='get_customer_cart'),
            path('cart-items/create/', customer_cart_views.create_customer_cart_item, name='create_customer_cart_item'),
            path('cart-items/<int:item_id>/update/', customer_cart_views.update_customer_cart_item, name='update_customer_cart_item'),
            path('cart-items/<int:item_id>/delete/', customer_cart_views.delete_customer_cart_item, name='delete_customer_cart_item'),
        ]))
    ])),

    path('books/', include([
        path('', books_views.list_books, name='list_books'),
        path('filter', books_views.list_books_with_filters, name='list_books_with_filters'),
        path('search', books_views.search_books, name='search_books'),
        path('most-viewed', books_views.most_viewed_books, name='most_viewed_books'),
        path('best-sellers', books_views.best_sellers, name='best_sellers'),
        path('on-sale', books_views.books_on_sale, name='books_on_sale'),
        path('<str:ISBN>/', books_views.get_book, name='get_book'),
    ]))          
] 