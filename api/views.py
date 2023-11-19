from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TestSerializer, MapPointSerializer
from .models import Test, MapPoint

# Create your views here.


@api_view(['GET', 'POST'])
def tests(request):
    if request.method == 'GET':
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response({"data": serializer.data})
    elif request.method == 'POST':
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def map_points(request):
    if request.method == "GET":
        map_points = MapPoint.objects.all()
        serializer = MapPointSerializer(map_points, many=True)
        return Response({"results": serializer.data})
    elif request.method == "POST":
        serializer = MapPointSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
