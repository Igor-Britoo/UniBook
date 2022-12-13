from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

class Address(models.Model):

    class State(models.TextChoices):
        AC = 'AC', ('Acre')
        AL = 'AL', ('Alagoas')
        AP = 'AP', ('Amapá')
        AM = 'AM', ('Amazonas')
        BA = 'BA', ('Bahia')
        CE = 'CE', ('Ceará')
        DF = 'DF', ('Distrito Federal')
        ES = 'ES', ('Espírito Santo')
        GO = 'GO', ('Goiás')
        MA = 'MA', ('Maranhão')
        MT = 'MT', ('Mato Grosso')
        MS = 'MS', ('Mato Grosso do Sul')
        MG = 'MG', ('Minas Gerais')
        PA = 'PA', ('Pará')
        PB = 'PB', ('Paraíba')
        PR = 'PR', ('Paraná')
        PE = 'PE', ('Pernambuco')
        PI = 'PI', ('Piauí')
        RJ = 'RJ', ('Rio de Janeiro')
        RN = 'RN', ('Rio Grande do Norte')
        RS = 'RS', ('Rio Grande do Sul')
        RO = 'RO', ('Rondônia')
        RR = 'RR', ('Roraima')
        SC = 'SC', ('Santa Catarina')
        SP = 'SP', ('São Paulo')
        SE = 'SE', ('Sergipe')
        TO = 'TO', ('Tocantins')

    house_number = models.IntegerField()
    street_name = models.CharField(max_length=254)
    city = models.CharField(max_length=254)
    state = models.CharField(max_length=2, choices=State.choices)

    def __str__(self):
	    return self.street_name + ", " + str(self.house_number) + ", " + self.city

class Customer(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, primary_key=True, default="")
    name = models.CharField(max_length=254)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
	    return self.email

class Genre(models.Model):
    name = models.CharField(max_length=254, primary_key=True, default="")
    description = models.TextField()

    def __str__(self):
	    return self.name
    
class Book(models.Model):
    ISBN = models.CharField(max_length=13, primary_key=True)
    name = models.CharField(max_length=254)
    publisher = models.CharField(max_length=254)
    genres = models.ManyToManyField(Genre) 
    author = models.CharField(max_length=254)
    number_of_pages = models.IntegerField()
    publication_year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
	    return self.name + ", " + self.author + ", " + str(self.publication_year)