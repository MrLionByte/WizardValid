from django.urls import path,include
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    
    path("user/register/", views.CreateUserView.as_view(), name="register"),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),

    path("update-profile-pic/", views.UpdateUserProfileView.as_view(), name='update_profile_pic'),
    path("user-profile/", views.UserDetailView.as_view(), name='user_profile'),
    
]
