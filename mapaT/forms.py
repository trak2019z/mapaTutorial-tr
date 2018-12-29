from django import forms

from mapaT.models import Route, Address


class RouteForm(forms.ModelForm):
    class Meta:
        model = Route
        fields = '__all__'


class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = '__all__'