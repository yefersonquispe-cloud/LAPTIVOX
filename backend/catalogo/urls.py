from django.urls import path
from .views import listar_categorias, listar_productos

urlpatterns = [
    path('categorias/', listar_categorias, name='listar_categorias'),
    path('productos/', listar_productos, name='listar_productos'),
]