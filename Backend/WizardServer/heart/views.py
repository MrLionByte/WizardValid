from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, status, views
from .serializers import UserSerializers, UserModelSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserModel
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]
    print("111111")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("1112222")
        if not serializer.is_valid():
            print("111333", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        user = serializer.save()
        print("NEW USER",user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response(serializer.data, status=status.HTTP_201_CREATED)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly = True,
            secure=True,
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True
        )
        return response

class LoginView(views.APIView):
    permission_classes = [AllowAny]
    print('Working')
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                'access_token': access_token,
                'refresh_token': refresh_token
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True
            )

            return response
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UpdateUserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        print("USER",user)
        if user.is_superuser:
            user_id = request.data.get('user_id', None)
            print(user_id, "user_id user_id")
            if user_id and user_id != request.user.id:
                user = get_object_or_404(User, id=user_id)
        user_model = get_object_or_404(UserModel, user=user)
        user_serializer = UserSerializers(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user_model_serializer = UserModelSerializer(user_model, data=request.data, partial=True)
        if user_model_serializer.is_valid():
            user_model_serializer.save()
        else:
            return Response(user_model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'status': 'Profile updated successfully'}, status=status.HTTP_200_OK)

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializers
    permission_classes = [IsAuthenticated]
    print("1115555")

    def get_object(self):
        return self.request.user
    
class AllUsersView(generics.ListAPIView):
        queryset = User.objects.all()
        serializer_class = UserSerializers
        permission_classes = [IsAuthenticated]
        print("1119999")

class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
