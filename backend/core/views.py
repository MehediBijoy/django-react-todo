from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from .models import Todo
from .serializers import TodoSerializer

@api_view(['get'])
def index(request):
    queryset = Todo.objects.all()
    serializers = TodoSerializer(queryset, many=True)
    return Response(serializers.data)


@api_view(['post'])
def createTodo(request):
    serializer = TodoSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['put'])
def updateTodo(request, id):
    try:
        object = Todo.objects.get(id=id)
        serializer = TodoSerializer(object, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['delete'])
def deleteTodo(request, id):
    try:
        object = Todo.objects.get(id=id)
        object.delete()
        return Response('succeed')
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
