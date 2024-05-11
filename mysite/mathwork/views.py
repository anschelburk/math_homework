import json

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.template import loader

from .forms import MathAssignmentForm
from .models import Drawing


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

def edit_assignment(request):
    return render(request, 'edit_assignment.html')

def get_widget(request):
    widget_type = request.GET.get('widget')
    if widget_type == "text_input":
        template = loader.get_template('text_input.html')
    elif widget_type == "math_keyboard":
        template = loader.get_template('math_keyboard.html')
    elif widget_type == "drawing_canvas":
        template = loader.get_template('drawing.html')
    else:
        return HttpResponse('')  # No widget selected or invalid option
    return HttpResponse(template.render({}, request))

def math_keyboard(request):
    return render(request, 'math_keyboard.html')


def save_drawing(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        drawing = Drawing.objects.create(
            name=data['name'],
            canvas_data=json.dumps(data['canvas_data'])
        )
        return JsonResponse({'status': 'success', 'id': drawing.id})
    return JsonResponse({'status': 'error'}, status=400)


def load_drawing(request, drawing_id):
    try:
        drawing = Drawing.objects.get(id=drawing_id)
        return JsonResponse({'canvas_data': drawing.canvas_data})
    except Drawing.DoesNotExist:
        return JsonResponse({'error': 'Drawing not found'}, status=404)


def list_drawings(request):
    drawings = Drawing.objects.all().values('id', 'name')
    return JsonResponse({'drawings': list(drawings)})
