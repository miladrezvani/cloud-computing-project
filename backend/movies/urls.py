from django.urls import path
from .views import AllMovies, Hero, Recent, Alphabetic, SetScore, Highscore, NewMovies, AlphabeticMovies,MoviesDetail, MoviesCast, getCast, getMoviesByGenres, WatchedMovies, Search, CastMoviesPlayed
# from .views import Home, SignUp, Login

urlpatterns = [
    # path('signup/',SignUp.as_view()),
    path('',AllMovies.as_view()),
    path('hero/',Hero.as_view()),
    path('new/',Recent.as_view()),
    path('alphabetic/',Alphabetic.as_view()),
    path('setscore/',SetScore.as_view()),
    path('highscore/',Highscore.as_view()),
    path('newmovies/',NewMovies.as_view()),
    path('alphabeticorder/',AlphabeticMovies.as_view()),
    path('search/', Search.as_view()),
    path('<int:pk>/', MoviesDetail.as_view()),
    path('<int:pk>/moviecast/', MoviesCast.as_view()),
    path('<int:pk>/cast/', getCast.as_view()),
    path('<int:pk>/castmoviesplayed/', CastMoviesPlayed.as_view()),
    path('<str:pk>/', getMoviesByGenres.as_view()),
    path('<int:pk>/watched/', WatchedMovies.as_view()),
]
