from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import SignUp, Login, getUser, AddFriend, getFriends, Logout, getUserID, UsernameSearch
from . import views


urlpatterns = [
    # path('gettoken/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('gettoken/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',SignUp.as_view()),
    path('login/',Login.as_view()),
    path('logout/', Logout.as_view()),
    path('<int:pk>/', getUser.as_view()),
    path('getuserid/', getUserID.as_view()),
    path('search/', UsernameSearch.as_view()),
    path('<int:pk>/addfriend/', AddFriend.as_view()),
    path('<int:pk>/getfriends/', getFriends.as_view()),
    # path('set/',cookie_set.as_view()),
    # path('get/',cookie_get.as_view()),

]