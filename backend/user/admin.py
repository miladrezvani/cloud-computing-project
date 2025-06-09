from django.contrib import admin
from pickle import STRING
from .models import User, Session, Friends

# Register your models here.

admin.site.register(User)
admin.site.register(Session)
admin.site.register(Friends)
