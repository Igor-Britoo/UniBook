import uuid

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import *

class Address(models.Model):
    class State(models.TextChoices):
        AC = 'AC', _('Acre')
        AL = 'AL', _('Alagoas')
        AP = 'AP', _('Amapá')
        AM = 'AM', _('Amazonas')
        BA = 'BA', _('Bahia')
        CE = 'CE', _('Ceará')
        DF = 'DF', _('Distrito Federal')
        ES = 'ES', _('Espírito Santo')
        GO = 'GO', _('Goiás')
        MA = 'MA', _('Maranhão')
        MT = 'MT', _('Mato Grosso')
        MS = 'MS', _('Mato Grosso do Sul')
        MG = 'MG', _('Minas Gerais')
        PA = 'PA', _('Pará')
        PB = 'PB', _('Paraíba')
        PR = 'PR', _('Paraná')
        PE = 'PE', _('Pernambuco')
        PI = 'PI', _('Piauí')
        RJ = 'RJ', _('Rio de Janeiro')
        RN = 'RN', _('Rio Grande do Norte')
        RS = 'RS', _('Rio Grande do Sul')
        RO = 'RO', _('Rondônia')
        RR = 'RR', _('Roraima')
        SC = 'SC', _('Santa Catarina')
        SP = 'SP', _('São Paulo')
        SE = 'SE', _('Sergipe')
        TO = 'TO', _('Tocantins')

    street_name = models.CharField(max_length=255)
    house_number = models.IntegerField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2, choices=State.choices)

    def __str__(self):
        return self.street_name + ", " + str(self.house_number) + ", " + self.city

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields = ['street_name', 'house_number', 'city', 'state'], 
                name = 'unique_address'
            )
        ]
        verbose_name_plural = "Addresses"

class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
	    return self.email

class Customer(User):
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
    
    objects = CustomerManager()

    def __str__(self):
	    return self.email

class Genre(models.Model):
    name = models.CharField(max_length=255, primary_key=True, default="")
    description = models.TextField()

    def __str__(self):
	    return self.name
    
class Book(models.Model):
    class Language(models.TextChoices):
        PT_BR = 'pt-BR', _('Portuguese (Brazil)')
        EN_US = 'en-US', _('English (United States)')
        ES_ES = 'es-ES', _('Spanish (Spain)')
    
    ISBN = models.CharField(max_length=13, primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_year = models.IntegerField()
    language = models.CharField(max_length=5, choices=Language.choices)
    publisher = models.CharField(max_length=255)
    genres = models.ManyToManyField(Genre) 
    number_of_pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover = models.ImageField(null=True, blank=True)
    discount = models.DecimalField(max_digits=3, decimal_places=2, default = 0)
    views = models.BigIntegerField(default = 0)
    sellings = models.BigIntegerField(default = 0)

    @property
    def cover_url(self):
        try:
            url = self.cover.url
        except:
            url = '/images/default_book_cover.jpg'

        return url

    def __str__(self):
	    return self.title + ", " + self.author + ", " + str(self.publication_year) + ", " + self.ISBN


class BookInventory(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE, primary_key=True, related_name='inventory')
    quantity = models.IntegerField()
    
    def __str__(self):
        return self.book.title + ", " + str(self.quantity)

    class Meta:
        verbose_name_plural = "Book inventories"

class Order(models.Model):
    class Status(models.TextChoices):
        P = 'P', _('Pending')
        OC = 'OC', _('Order confirmed')
        PA = 'PA', _('Payment approved')
        S = 'S', _('Shipped')
        T = 'T', _('In transit')
        D = 'D', _('Delivered')
        C = 'C', _('Cancelled')

    code = models.UUIDField(primary_key=True, default = uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    shipping_address = models.ForeignKey(Address, on_delete=models.CASCADE)
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.P)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    
    objects = OrderManager()

    def __str__(self):
        return str(self.code) + ", " + self.status + ", " + self.customer.email + ", " + self.customer.name

class Cart(models.Model):
    owner = models.OneToOneField(Customer, on_delete=models.CASCADE, primary_key=True, related_name='shopping_cart')

    @property
    def price(self):
        result = 0
        for item in self.cart_items.all():
            result += item.price * item.quantity
        
        return result
    
    def __str__(self):
        return self.owner.email + ", " + self.owner.name


class Item(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return self.book.title + ", " + str(self.quantity)

class OrderItem(Item):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    price = models.DecimalField(max_digits=10, decimal_places=2)

    objects = OrderItemManager()

    def __str__(self):
        return self.book.title + ", " + str(self.quantity) + ", " + str(self.price)

class CartItem(Item):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')

    @property
    def price(self):
        return self.book.price

    def __str__(self):
        return self.book.title + ", " + str(self.quantity)