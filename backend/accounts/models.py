from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user 

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True) # this is to overwrite the default django behavior of using username as login parameters
    first_name = models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    is_active =  models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email' # Email for unique authentication instead of username 
    REQUIRED_FIELDS = ['first_name', 'last_name'] # this are fields that must be specified before the request is made

    objects = UserAccountManager() # veri important to add

    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

    def __str__(self) -> str:
        return f'Account {self.first_name}'