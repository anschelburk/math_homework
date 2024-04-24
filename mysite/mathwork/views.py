from django.utils import timezone
from django.http import HttpResponse
from django.shortcuts import render

from .models import MathAssignment


def index(request):
    return HttpResponse("Welcome to Math Homework - math work made easy!")


def assignment_view(request):
    if request.method == 'POST':
        MathAssignment.objects.create(
            assignment_title=request.POST['assignment_title'],
            student_name=request.POST['student_name'],
            assignment_date=timezone.now(),
            teacher_name=request.POST['teacher_name'],
            class_name=request.POST['class_name'],
            problems=request.POST['math_input'],
        )
        # return HttpResponse("Your assignment was submitted successfully.")
    return render(request, 'assignment_form.html')


def math_keyboard(request):
    return render(request, 'math_keyboard.html')
