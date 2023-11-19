from django.urls import path
from . import views

urlpatterns = [
    path("tests/", views.tests, name="test"),
    path("map-points/", views.map_points, name="map_points")
]