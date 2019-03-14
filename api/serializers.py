from rest_framework import serializers

from .models import Post
from users.models import User


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        post = Post()
        post.company = data['company']
        post.title = data['title']
        post.abstract = data['abstract']
        post.description = data['description']
        post.email = data['email']
        post.phoneNumber = data['phoneNumber']

        post.save()

        return post
