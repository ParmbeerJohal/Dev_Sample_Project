from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, blank=True, default=None)
    phone = models.CharField(max_length=50, blank=True, default=None)

    def __str__(self):
        return self.name
