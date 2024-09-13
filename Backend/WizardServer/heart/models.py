from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    profile_pic = models.ImageField(upload_to='profile/', blank=True)

    def __str__(self):
        return self.user.username

# class Notes(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

#     def __str__(self) -> str:
#         return f"{self.title}  : of  : {self.author.username}"
    