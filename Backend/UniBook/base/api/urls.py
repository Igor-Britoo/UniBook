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
        path('', customer_views.manage_logged_customer, name='manage_logged_customer'),

        path('orders/', include([
            path('', customer_orders_views.handle_orders, name='handle_orders'),
            path('<uuid:code>/', customer_orders_views.get_customer_order_info, name='get_customer_order_info'),
        ])),

        path('cart/', include([
            path('', customer_cart_views.handle_cart, name='handle_cart'),
            path('<int:item_id>/', customer_cart_views.modify_or_remove_cart_item, name='modify_or_remove_cart_item'),
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