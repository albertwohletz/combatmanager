from django.shortcuts import render
from API import models

# Create your views here.
def initiative(request):
    chars = models.Chars.objects.all()
    context = {'chars': chars}
    return render(request, 'initiative.html', context)
