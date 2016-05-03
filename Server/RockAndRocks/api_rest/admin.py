from django.contrib import admin
from .models import Productos
# Register your models here.


@admin.register(Productos)
class AdminProducto(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'image', 'barcode')
