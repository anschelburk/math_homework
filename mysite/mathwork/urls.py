from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("assignment/", views.assignment_view, name="math_assignmment"),
    path("mathkeyboard/", views.math_keyboard, name="math_keyboard"),
    path("drawing/", views.drawing_view, name="drawing"),
    path("editassignment/", views.edit_assignment, name="edit_assignment"),
    path("get-widget/", views.get_widget, name="get_widget"),
    path('save-drawing/', views.save_drawing, name='save_drawing'),
    path('load-drawing/<int:drawing_id>/', views.load_drawing, name='load_drawing'),
    path('list-drawings/', views.list_drawings, name='list_drawings'),
]
