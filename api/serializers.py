from rest_framework import serializers
from .models import Test, MapPoint


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"


class MapPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapPoint
        fields = "__all__"
