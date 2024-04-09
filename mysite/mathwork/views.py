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
            return redirect('success_view') # or return render(), or even set another variable and return at end of function, or messenging frameowrk to store a global message variable
    else:
        form = MathAssignmentForm()
    return render(request, 'assignment_form.html', {'form': form})

def math_editor(request):
    return render(request, 'mathapp/editor.html')