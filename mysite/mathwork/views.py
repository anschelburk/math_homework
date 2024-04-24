from django.http import HttpResponse
from django.shortcuts import render, redirect
from . import forms, models

def index(request):
    return HttpResponse("Welcome to Math Homework - math work made easy!")

def assignment_view(request):
    if request.method == 'POST':
        form = forms.MathAssignmentForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("Your assignment was submitted successfully.")
    else:
        form = forms.MathAssignmentForm()
    return render(request, 'assignment_form.html', {'form': form})

def image_list(request):
    images = models.ImageModel.objects.all()
    return render(request, "image_list.html", {"images": images})


def image_upload(request):
    if request.method == 'POST':
        form = forms.ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  # Save the uploaded image to the database
            return redirect("image_list")  # Redirect to a view that displays the list of images
    else:
        form = forms.ImageUploadForm()
    return render(request, "upload_image.html", {"form": form})

def drawing_view(request):
    return render(request, 'drawing.html')

def math_keyboard(request):
    return render(request, 'math_keyboard.html')
