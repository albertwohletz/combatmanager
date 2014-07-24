__author__ = 'albertlwohletz'
from django.shortcuts import render
from API import models
from django.http import HttpResponse

def add_char(request):
    name = request.GET['name']
    image = request.GET['image']
    hp = request.GET['hp']
    ac = request.GET['ac']

    new_char = models.Chars(name=name, image=image, hp=hp, ac=ac)
    new_char.save()
    return HttpResponse('Done')