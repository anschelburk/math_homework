from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import MathAssignmentForm

def index(request):
    return HttpResponse("Welcome to Math Homework - math work made easy!")

def assignment_view(request):
    if request.method == 'POST':
        form = MathAssignmentForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("Your assignment was submitted successfully.")
    else:
        form = MathAssignmentForm()
    return render(request, 'assignment_form.html', {'form': form})

def drawing_view(request):
    return render(request, 'drawing.html')

def math_keyboard(request):
    return render(request, 'math_keyboard.html')