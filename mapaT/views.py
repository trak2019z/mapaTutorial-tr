from django.contrib import messages
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render, redirect

from mapaT.forms import AddressForm, RouteForm
from mapaT.models import Route


def index(request):
    context = {}
    if request.method == 'GET':
       context['a'] = AddressForm()
       context['r'] = RouteForm()
    return render(request, 'index.html', context)

def addAddress(request):
    messages.add_message(request, messages.INFO, 'Dodawanie adresu!')
    if request.method == 'POST':
        addrform = AddressForm(request.POST)
        if addrform.is_valid():
            addrform.save()
            messages.add_message(request, messages.INFO, 'Adres zapisano!')
        else:
            messages.add_message(request, messages.INFO, 'Adres niepoprawny!')
    return redirect("../../")

def addRoute(request):
    messages.add_message(request, messages.INFO, 'Dodawanie drogi!')
    if request.method == 'POST':
        routeForm = RouteForm(request.POST)
        if routeForm.is_valid():
            routeForm.save()
            messages.add_message(request, messages.INFO, 'Droga zapisana!')
        else:
            messages.add_message(request, messages.INFO, 'Droga nie została zapisana!')
    return redirect("../../")

def getRoutesJson(request):
    allRoutes = Route.objects.all()
    data = serializers.serialize('json', allRoutes, use_natural_foreign_keys=True,
                                 use_natural_primary_keys=True)
    return HttpResponse(data, content_type="application/json")

