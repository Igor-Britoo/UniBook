from django.contrib import admin
from .models import *
from .models import User

# Register your models here.
admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Address)
admin.site.register(Genre)
admin.site.register(Book)