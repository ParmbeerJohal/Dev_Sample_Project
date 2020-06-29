from django.urls import path

from . import views

app_name = 'users'

urlpatterns = [
    path("", views.index, name="index"),
    #adding 'users/add/' url
    path("add/", views.add, name="add")
]
