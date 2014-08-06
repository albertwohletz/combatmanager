__author__ = 'albertlwohletz'
from django.shortcuts import render
from API import models
from django.http import HttpResponse
import json

def add_char(request):
    name = request.GET['name']
    image = request.GET['image']
    hp = request.GET['hp']
    ac = request.GET['ac']
    count = int(request.GET['count'])

    for i in range(0, count):
        new_char = models.Chars(name=name + ' ' + str(i + 1), image=image, hp=hp, ac=ac)
        new_char.save()

    return HttpResponse(new_char.id + 1 - count)

def remove_char(request):
    id = request.GET['id']
    models.Chars.objects.filter(id=id).delete()
    return HttpResponse('Done')

def get_char(request):
    id = int(request.GET['id'])
    char = list(models.Chars.objects.filter(id=id))[0]

    result_data = {"hp": char.hp, "ac": char.ac, "img": char.image, "name": char.name}
    return HttpResponse(json.dumps(result_data), content_type="text/json")
