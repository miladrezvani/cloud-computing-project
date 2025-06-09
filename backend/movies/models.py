from django.db import models
import pgtrigger
from user.models import User

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


# Create your models here.
class Cast(models.Model):
    realName = models.CharField(max_length=100)
    age = models.IntegerField()
    biography = models.CharField(max_length=5000)
    profileIMG = models.ImageField(upload_to='cast/')

    def __str__(self):
        return str(self.realName)

class Genres(models.Model):
    genres = models.CharField(max_length=30)

    def __str__(self):
        return str(self.genres)


class Movies(models.Model):
    title = models.CharField(max_length=50)
    synopsis = models.CharField(max_length=200)
    poster = models.ImageField(upload_to ='posters/') 
    score = models.FloatField( null=True, blank=True)
    genres = models.ManyToManyField(Genres)
    year = models.CharField(max_length=4)
    cast = models.ManyToManyField(Cast)
    

    def __str__(self):
        return self.title


class Character(models.Model):
    character = models.CharField(max_length=100)
    cast = models.ForeignKey(Cast, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE)


    def __str__(self):
        return str(self.character)


class Scores(models.Model):
    star = models.IntegerField()
    movie = models.ForeignKey(Movies ,on_delete=models.CASCADE,)
    user = models.ForeignKey(User ,on_delete=models.CASCADE,)

    def __str__(self):
        return str(self.movie)


# class CastMovie(models.Model):
#     cast = models.ForeignKey(Cast, on_delete=models.CASCADE)
#     movie = models.ForeignKey(Movies, on_delete=models.CASCADE)

#     def __str__(self):
#         return str(self.cast) + " " +str(self.movie)


@receiver(post_save, sender=Scores)
def update_movie_score_on_save(sender, instance, **kwargs):
    update_movie_score(instance.movie)

@receiver(post_delete, sender=Scores)
def update_movie_score_on_delete(sender, instance, **kwargs):
    update_movie_score(instance.movie)

def update_movie_score(movie):
    average_score = Scores.objects.filter(movie=movie).aggregate(models.Avg('star'))['star__avg']
    movie.score = average_score
    movie.save()