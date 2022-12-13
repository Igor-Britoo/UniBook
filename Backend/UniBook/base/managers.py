from django.contrib.auth.base_user import BaseUserManager

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
    def create_user(self, email, name, password, address):
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
