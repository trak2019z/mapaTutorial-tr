from django.contrib import admin
from django.urls import path

from mapaT import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('address/add/', views.addAddress),
    path('route/add/', views.addRoute),
    path('route/all/json/', views.getRoutesJson),
]
