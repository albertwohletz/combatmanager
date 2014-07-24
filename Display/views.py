from django.shortcuts import render

# Create your views here.
def initiative(request):
    context = {}
    return render(request, 'initiative.html', context)
