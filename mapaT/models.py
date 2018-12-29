from django.db import models

class Address(models.Model):
    post_code = models.CharField(max_length=15)
    city = models.CharField(max_length=15)
    street = models.CharField(max_length=15)
    home_number = models.CharField(max_length=15, null=True)
    def natural_key(self):
        return self.post_code + ' ' + self.city + ' ' + self.street


class Route(models.Model):
    first_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='first_address')
    second_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='second_address')