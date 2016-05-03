from .models import Productos
from .serializers import ProductosSerializers
from rest_framework import viewsets


class ProductosViewSets(viewsets.ModelViewSet):
    serializer_class = ProductosSerializers
    queryset = Productos.objects.all()
