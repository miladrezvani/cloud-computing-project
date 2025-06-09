from django.contrib import admin
from pickle import STRING
from .models import Movies, Scores, Cast, Genres, Character

# Register your models here.

admin.site.register(Movies)
admin.site.register(Scores)
admin.site.register(Cast)
admin.site.register(Genres)
admin.site.register(Character)