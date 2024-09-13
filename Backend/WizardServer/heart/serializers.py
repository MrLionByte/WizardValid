from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserModel


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['profile_pic']

class UserSerializers(serializers.ModelSerializer):
    user_model = UserModelSerializer(source='usermodel', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username','password', 'email', 'is_superuser','is_active','user_model']

    # def create(self, validate_data):
    #     print("validate_data",validate_data)
    #     user = User.objects.create_user(**validate_data)
    #     UserModel.objects.create(user=user)
    #     return user
    def create(self, validated_data):
        print("validated_data", validated_data)
    
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
       
        UserModel.objects.create(user=user)
        return user

class ProfilePicUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["profile_pic"]
        extra_kwargs = {"profile_pic": {"required": False}}
