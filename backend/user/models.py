from django.db import models
from datetime import datetime  
from django.contrib.auth.hashers import make_password 
import uuid

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=30, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username + " " + self.email
    
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)


class Session(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,)
    cookie = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=datetime.now)


    def __str__(self):
        return str(self.cookie) + " " + str(self.created_at)


class Friends(models.Model):
    user_id = models.IntegerField()
    friend = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user_id + self.friend