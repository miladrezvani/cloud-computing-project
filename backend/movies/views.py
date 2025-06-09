from django.shortcuts import render
from rest_framework import generics
from .models import Movies, Scores, Cast, Character, Genres
from rest_framework.response import Response
from user.models import Session, User
from .serializers import MoviesSerializer, ScoresSerializer, CastSerializer
from user.serializers import UserSerializer
from rest_framework.views import APIView
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.db.models import Q, Prefetch
from django.views.generic import ListView
from django.shortcuts import get_object_or_404


# Create your views here.

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

class StandardMovieBars(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 8

class StandardCastBars(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 20

class StandardCastMovieBars(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100

class StandardWatchedMovies(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AllMovies(generics.ListAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer
    pagination_class = StandardResultsSetPagination

class Hero(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('-score')[:4]
    serializer_class = MoviesSerializer

class Recent(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('-year')[:8]
    serializer_class = MoviesSerializer
    pagination_class = StandardMovieBars

class Alphabetic(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('title')[:8]
    serializer_class = MoviesSerializer
    pagination_class = StandardMovieBars

class Highscore(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('-score')
    serializer_class = MoviesSerializer
    pagination_class = StandardResultsSetPagination

class NewMovies(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('-year')
    serializer_class = MoviesSerializer
    pagination_class = StandardResultsSetPagination

class AlphabeticMovies(generics.ListAPIView):
    queryset = Movies.objects.all().order_by('title')
    serializer_class = MoviesSerializer
    pagination_class = StandardResultsSetPagination

class MoviesDetail(generics.RetrieveAPIView):
    serializer_class = MoviesSerializer
    def get_queryset(self):
        obj = get_object_or_404(Movies, id=self.kwargs['pk'])
        return Movies.objects.filter(id=obj.id)

class MoviesCast(generics.ListAPIView):
    serializer_class = CastSerializer
    pagination_class = StandardCastBars
    def get_queryset(self):
        obj = get_object_or_404(Movies, id=self.kwargs['pk'])
        return obj.cast.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['movie_id'] = self.kwargs['pk']
        return context

class getCast(generics.RetrieveAPIView):
    serializer_class = CastSerializer
    def get_queryset(self):
        obj = get_object_or_404(Cast, id=self.kwargs['pk'])
        return Cast.objects.filter(id=obj.id)

class getMoviesByGenres(generics.ListAPIView):
    serializer_class = MoviesSerializer
    pagination_class = StandardMovieBars
    def get_queryset(self):
        return Movies.objects.filter(genres__genres__iexact=self.kwargs['pk'])

class WatchedMovies(generics.ListAPIView):
    serializer_class = MoviesSerializer
    pagination_class = StandardWatchedMovies
    def get_queryset(self):
        user_id = self.kwargs['pk']
        return Movies.objects.filter(
            scores__user_id=user_id
        ).prefetch_related(
            Prefetch('scores_set', queryset=Scores.objects.filter(user_id=user_id), to_attr='user_scores')
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user_id'] = self.kwargs['pk']
        return context

class CastMoviesPlayed(generics.ListAPIView):
    serializer_class = MoviesSerializer
    pagination_class = StandardCastMovieBars

    def get_queryset(self):
        characters = Character.objects.filter(cast_id=self.kwargs['pk']).values_list("movie_id", flat=True)
        return Movies.objects.filter(id__in=characters).distinct()

# class MoviesCast(APIView):
#     serializer_class = CastSerializer
#     def get_queryset(self):
#         obj = CastMovie.objects.filter(movie_id=self.kwargs['pk'])
#         print("ckasncjnascjknascjascnabc buaicnjbha hjicknab huoicbah hoijkn",obj)
#         return Cast.objects.filter(id=obj)




class SetScore(APIView):
    def post(self, request, *args, **kwargs):
        movie_id = request.data.get('movie_id')
        # user_id = request.data.get('user_id')
        score = request.data.get('score')
        user = Session.objects.get(cookie=request.COOKIES.get("user_token"))
        # print("User: nkajcnjasncjnajkcnknasncabsbck", user.user_id)
        # user_id = user.user_id


        if Scores.objects.filter(Q(user_id=user.user_id) & Q(movie_id=movie_id)).delete():
            Scores.objects.create(user_id=user.user_id,movie_id=movie_id, star=score)
            return HttpResponse("update it")
        else:
            Scores.objects.create(user_id=user.user_id,movie_id=movie_id, star=score)
            return HttpResponse("create it")


class Search(generics.ListAPIView):
    serializer_class = MoviesSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        search = self.request.query_params.get('search', 'default')
        return Movies.objects.filter(title__icontains=search)
        
