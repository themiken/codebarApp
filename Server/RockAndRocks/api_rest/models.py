from __future__ import unicode_literals

from django.db import models
from decimal import Decimal

# Create your models here.


class Productos(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    # category = models.CharField(max_length=255)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, default=Decimal('0.00'))
    priceIVA = models.DecimalField(
        max_digits=7, decimal_places=2, default=Decimal('0.00'))
    priceWithoutIVA = models.DecimalField(
        max_digits=7, decimal_places=2, default=Decimal('0.00'))
    image = models.ImageField(blank=True)
    barcode = models.CharField(max_length=255)
