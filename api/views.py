from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TestSerializer
from .models import Test

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
