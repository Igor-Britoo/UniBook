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
    list_display = ('name', 'author', 'publication_year')
    list_filter = ('genres', )
    search_fields = ('ISBN', 'name', 'author', 'publisher')

admin.site.register(User, UserAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Book, BookAdmin)