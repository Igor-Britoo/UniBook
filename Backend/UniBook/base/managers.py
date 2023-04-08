from django.contrib.auth.base_user import BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, name, password):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            name = name,
        )

        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password):
        superuser = self.create_user(
            email = self.normalize_email(email),
            name = name,
            password= password
        )

        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        
        return superuser

class CustomerManager(BaseUserManager):
    def create_customer(self, email, name, password, address):
        if not email:
            raise ValueError('Customers must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            name = name,
            address = address
        )
        
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user

class OrderManager(models.Manager):
    def create_order(self, customer, shipping_address):
        order = self.model(
            customer = customer,
            shipping_address = shipping_address,
        )
        order.save(using=self._db)
        return order

    def update_order_price(self, code):
        order = self.get(code = code)
        result = 0
        
        for item in order.order_items.all():
            result += item.price * item.quantity
        
        order.price = result
        order.save(using=self._db)
        return order

class OrderItemManager(models.Manager):
    def create_order_item(self, book, quantity, order):
        order_item = self.model(
            book = book,
            quantity = quantity,
            order = order,
            price = book.price
        )
        order_item.save(using=self._db)

        book_inventory = book.inventory
        book_inventory.quantity -= quantity
        book_inventory.save(using=self._db)

        book.sellings += quantity
        book.save(using=self._db)

        return order_item
    
    def create_order_items(self, items, order):
        order_items = []
        for item in items:
            order_items.append( self.create_order_item(
                book = item.book,
                quantity = item.quantity,
                order = order,
            ) )
            
        return order_items
        
