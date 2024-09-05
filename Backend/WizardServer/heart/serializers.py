from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserModel


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['phone', 'profile_pic']

class UserSerializers(serializers.ModelSerializer):
    user_model = UserModelSerializer(source='usermodel', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_model']

    def create(self, validate_data):
        phone = validate_data.pop('phone')
        user = User.objects.create_user(**validate_data)
        UserModel.objects.create(user=user,phone=phone)
        return user

class ProfilePicUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["profile_pic"]
        extra_kwargs = {"profile_pic": {"required": False}}
