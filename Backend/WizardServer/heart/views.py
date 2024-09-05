from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, status, views
from .serializers import UserSerializers, UserModelSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserModel
# Create your views here.

  
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateUserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user_model = UserModel.objects.get(user=user)

        # Update user details
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

    def get_object(self):
        return self.request.user