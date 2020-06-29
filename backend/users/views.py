from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import User

#documentation for csrf import below:
#https://docs.djangoproject.com/en/1.11/_modules/django/views/decorators/csrf/
from django.views.decorators.csrf import ensure_csrf_cookie

import json


# Create your views here.
def index(request):
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)

#Adding 'add' function
@ensure_csrf_cookie
def add(request):
    #try and except blocks implemented to avoid 'JSONDecodeError'
    try:
        #unstringify json from requst body
        body = json.loads(request.body)

        if body.get("name") is not None:
            name = body.get("name")
        else:
            HttpResponse("No name added, try again.")

        if body.get("email") is not None:
            email = body.get("email")
        else:
            email = ""

        if body.get("phone") is not None:
            phone = body.get("phone")
        else:
            phone = ""

        #create and add user to database
        usr = User.objects.create(name=name, email=email, phone=phone)

    except ValueError:
        print('Decoding JSON has failed')

    #usr.objects.

    return HttpResponse("Added User")
