from django.db import models
from users.models import User
from datetime import datetime


class Post(models.Model):
    title = models.CharField(max_length=50)
    abstract = models.CharField(max_length=255, default='')
    description = models.TextField(default='')
    studentNeeded = models.IntegerField(default=0)
    requirements = models.TextField(default='')
    deadline = models.DateField(default=datetime.today, blank=True)
    email = models.EmailField(default='')
    phoneNumber = models.CharField(max_length=11, default='')
    company = models.CharField(max_length=50)
    relevent_file = models.FileField(default=False)

    def __str__(self):
        return self.title
