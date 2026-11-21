from django.contrib import admin
from .models import Categoria, Producto

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "precio", "cantidad_disponible", "categoria")
    search_fields = ("nombre",)
    list_filter = ("categoria",)
    list_editable = ("cantidad_disponible",)