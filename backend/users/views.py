from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import User

# Create your views here.
def index(request):
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)
