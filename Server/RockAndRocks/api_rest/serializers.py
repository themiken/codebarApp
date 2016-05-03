from rest_framework import serializers
from .models import Productos


class ProductosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = ('id', 'name', 'description', 'price',
                  'priceIVA', 'priceWithoutIVA', 'image', 'barcode',)
