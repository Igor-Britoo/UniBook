from django.contrib import admin
from .models import *
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(BaseUserAdmin):
    ordering = ('name', )
    list_display = ('name', 'email', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields =  ('name', 'email')
    
    fieldsets = (
        (None, {'fields': ('name', 'email', 'password')}),

        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    
class AddressAdmin(admin.ModelAdmin):
    ordering = ('state', )
    list_display = ('street_name', 'house_number', 'city', 'state')
    list_filter = ('city', 'state')
    search_fields = ('street_name', )

class CustomerAdmin(admin.ModelAdmin):
    ordering = ('name', )
    list_display = ('name', 'email', 'is_active')
    list_filter = ('is_active', )
    search_fields = ('name', 'email')

    fieldsets = (
        (None, {'fields': ('name', 'email', 'password', 'address')}),

        ('Permissions', {'fields': ('is_active', )}),
    )    

class GenreAdmin(admin.ModelAdmin):
   ordering = ('name', )
   list_display = ('name', )
   search_fields =  ('name', )

class BookAdmin(admin.ModelAdmin):
    ordering = ('publication_year', )
    list_display = ('title', 'author', 'publication_year')
    list_filter = ('genres', )
    search_fields = ('ISBN', 'title', 'author', 'publisher')

class BookInventoryAdmin(admin.ModelAdmin):
    ordering = ('quantity', )
    list_display = ('book', 'quantity')

class OrderAdmin(admin.ModelAdmin):
    ordering = ('price', 'date')
    list_display = ('code', 'customer', 'status', 'date')
    list_filter = ('status', 'customer', 'date')
    search_fields = ('code', )

class CartAdmin(admin.ModelAdmin):
    list_display = ('owner', )

class OrderItemAdmin(admin.ModelAdmin):
    ordering = ('price', )
    list_display = ('order', 'book', 'quantity', 'price')
    list_filter = ('order', )

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'book', 'quantity')
    list_filter = ('cart', )

admin.site.register(User, UserAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(BookInventory, BookInventoryAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Item)

