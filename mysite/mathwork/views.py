from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return "Welcome to Math Homework - math work made easy!"

def math_editor(request):
    return render(request, 'mathapp/editor.html')