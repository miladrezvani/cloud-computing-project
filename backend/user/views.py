from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User, Session, Friends
from django.http import HttpResponseRedirect, HttpResponse
from datetime import datetime   
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination



class StandardFriendList(PageNumberPagination):
    page_size = 7
    page_size_query_param = 'page_size'
    max_page_size = 100

class SignUp(APIView):
    response = HttpResponse(status=200)

    def post(self, request, *args, **kwargs):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not User.objects.filter(Q(username=username) | Q(email=email)):
            tmp = User.objects.create(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
            user = User.objects.get(username=request.data.get('username'))
            tmp = Session.objects.create(user_id=user.id)
            self.response.set_cookie("user_token", tmp.cookie, max_age=3600 )
            # if request.COOKIES.get("user_token"):
            #     time = Session.objects.get(cookie=request.COOKIES.get("user_token"))
            #     time.created_at = time.created_at.replace(tzinfo=None)
            #     if (datetime.now() - time.created_at).seconds > 3600:
            #         user = User.objects.get(username=request.data.get('username'))
            #         tmp = Session.objects.create(user_id=user.id)
            #         self.response.set_cookie("user_token", tmp.cookie )
            # else:
            #     if User.objects.filter(username=request.data.get('username')):
            #         user = User.objects.get(username=request.data.get('username'))
            #         tmp = Session.objects.create(user_id=user.id)
            #         self.response.set_cookie("user_token", tmp.cookie )
            #     else:
            #         return HttpResponse(status=403)
            return self.response

        else:
            return HttpResponse(status=403)

class Login(APIView):
    response = HttpResponse(status=200)

    def post(self, request, *args, **kwargs):
        usernameORemail = request.data.get('usernameORemail')
        password = request.data.get('password')
        
        if User.objects.filter(Q(username=usernameORemail) | Q(email=usernameORemail)):
            user = User.objects.get(Q(username=usernameORemail) | Q(email=usernameORemail))
            if check_password(request.data.get('password'), user.password):
                tmp = Session.objects.create(user_id=user.id)

                self.response.set_cookie("user_token", tmp.cookie, max_age=3600)
                # if request.COOKIES.get("user_token"):
                #     time = Session.objects.get(cookie=request.COOKIES.get("user_token"))
                #     time.created_at = time.created_at.replace(tzinfo=None)
                #     if (datetime.now() - time.created_at).seconds > 3600:
                #         user = User.objects.get(Q(username=usernameORemail) | Q(email=usernameORemail))
                #         Session.objects.filter(user_id=user.id).delete()
                #         tmp = Session.objects.create(user_id=user.id)
                #         self.response.set_cookie("user_token", tmp.cookie )
                # else:
                #     if User.objects.filter(Q(username=usernameORemail) | Q(email=usernameORemail)):
                #         user = User.objects.get(Q(username=usernameORemail) | Q(email=usernameORemail))
                #         Session.objects.filter(user_id=user.id).delete()
                #         tmp = Session.objects.create(user_id=user.id)
                #         self.response.set_cookie("user_token", tmp.cookie )
                #     else:
                #         return HttpResponse(status=403)
                return self.response
            else:
                return HttpResponse(status=401)
        else:
            return HttpResponse(status=403)

class Logout(APIView):
    response = HttpResponse(status=200)

    def post(self, request, *args, **kwargs):
        tmp = Session.objects.get(cookie=request.COOKIES.get("user_token")).delete()
        self.response.delete_cookie("user_token")
        return self.response



class getUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        obj = get_object_or_404(User, id=self.kwargs['pk'])
        return User.objects.filter(id=obj.id)

class AddFriend(APIView):

    def post(self, request, *args, **kwargs):
        obj = get_object_or_404(User, id=kwargs['pk'])
        tmp = request.COOKIES.get("user_token")
        user_id = Session.objects.get(cookie=tmp)
        Friends.objects.create(user_id=user_id.user_id, friend_id=obj.id)
        return HttpResponse(status=200)

class getFriends(generics.ListAPIView):
    serializer_class = UserSerializer
    pagination_class = StandardFriendList
    def get_queryset(self):
        obj = Friends.objects.filter(user_id=self.kwargs['pk']).values_list("friend_id", flat=True)
        data = User.objects.filter(id__in=obj)
        return data

class getUserID(APIView):
    def post(self, request, *args, **kwargs):
        tmp = request.COOKIES.get("user_token")
        user = Session.objects.get(cookie=tmp)
        return Response(user.user_id)

class UsernameSearch(generics.ListAPIView):
    serializer_class = UserSerializer
    pagination_class = StandardFriendList

    def post(self, request, *args, **kwargs):
        search = request.data.get('search')
        tmp = User.objects.filter(username__icontains=search)
        page = self.paginate_queryset(tmp)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(tmp, many=True)
        return Response(serializer.data)

# class cookie_set(APIView):
#     response = HttpResponse("Cookie set")
#     def post(self, request):
#         if request.COOKIES.get("user_token"):
#             time = Session.objects.get(cookie=request.COOKIES.get("user_token"))
#             time.created_at = time.created_at.replace(tzinfo=None)
#             if (datetime.now() - time.created_at).seconds > 3600:
#                 user = User.objects.get(username=request.data.get('username'))
#                 tmp = Session.objects.create(user_id=user.id)
#                 self.response.set_cookie("user_token", tmp.cookie )
#         else:
#             if User.objects.filter(username=request.data.get('username')):
#                 user = User.objects.get(username=request.data.get('username'))
#                 tmp = Session.objects.create(user_id=user.id)
#                 self.response.set_cookie("user_token", tmp.cookie )
#             else:
#                 return HttpResponse("can not set Cookie")
#         return self.response

# class cookie_get(APIView):
#     def get(self, request):
#         message = "cookie is :" + str(request.COOKIES["user_token"])
#         return HttpResponse(message)
